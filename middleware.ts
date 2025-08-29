import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory token bucket per IP. Suitable for single-instance dev only.
// For production behind multiple instances, replace with a shared store like Redis or Upstash.

type Bucket = {
	// tokens remaining in the current window
	tokens: number;
	// unix ms timestamp when the bucket resets
	resetAtMs: number;
};

// Configuration
const WINDOW_MS = 60_000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 60; // allow 60 requests per minute per IP

// In-memory store
const ipToBucket: Map<string, Bucket> = new Map();

function getClientIp(request: NextRequest): string {
	// Honor common reverse proxy headers if present; fall back to request.ip
	const xff = request.headers.get('x-forwarded-for');
	if (xff) {
		// x-forwarded-for can be a comma-separated list; the left-most is the original client
		const ip = xff.split(',')[0]?.trim();
		if (ip) return ip;
	}
	const realIp = request.headers.get('x-real-ip');
	if (realIp) return realIp;
	const cfIp = request.headers.get('cf-connecting-ip');
	if (cfIp) return cfIp;
	const flyIp = request.headers.get('fly-client-ip');
	if (flyIp) return flyIp;
	const trueClientIp = request.headers.get('true-client-ip');
	if (trueClientIp) return trueClientIp;
	return 'unknown';
}

function takeTokenNow(ip: string): { allowed: boolean; remaining: number; resetAtMs: number } {
	const now = Date.now();
	const bucket = ipToBucket.get(ip);
	if (!bucket || now >= bucket.resetAtMs) {
		// initialize/reset bucket
		const newBucket: Bucket = { tokens: MAX_REQUESTS_PER_WINDOW - 1, resetAtMs: now + WINDOW_MS };
		ipToBucket.set(ip, newBucket);
		return { allowed: true, remaining: newBucket.tokens, resetAtMs: newBucket.resetAtMs };
	}
	if (bucket.tokens > 0) {
		bucket.tokens -= 1;
		return { allowed: true, remaining: bucket.tokens, resetAtMs: bucket.resetAtMs };
	}
	return { allowed: false, remaining: 0, resetAtMs: bucket.resetAtMs };
}

export function middleware(request: NextRequest) {
	// Exclude static assets and Next internals
	const pathname = request.nextUrl.pathname;
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/favicon.ico') ||
		/\.(?:js|css|png|jpg|jpeg|gif|svg|ico|webp|avif|txt|xml|woff|woff2|ttf|otf)$/.test(pathname)
	) {
		return NextResponse.next();
	}

	const ip = getClientIp(request);
	const { allowed, remaining, resetAtMs } = takeTokenNow(ip);

	if (!allowed) {
		const retryAfterSeconds = Math.max(1, Math.ceil((resetAtMs - Date.now()) / 1000));
		return new NextResponse('Too Many Requests', {
			status: 429,
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'X-RateLimit-Limit': String(MAX_REQUESTS_PER_WINDOW),
				'X-RateLimit-Remaining': String(remaining),
				'X-RateLimit-Reset': String(Math.floor(resetAtMs / 1000)),
				'Retry-After': String(retryAfterSeconds),
			},
		});
	}

	const response = NextResponse.next();
	response.headers.set('X-RateLimit-Limit', String(MAX_REQUESTS_PER_WINDOW));
	response.headers.set('X-RateLimit-Remaining', String(remaining));
	response.headers.set('X-RateLimit-Reset', String(Math.floor(resetAtMs / 1000)));
	return response;
}

// Exclude static files, _next internals, images, icons, and public assets. Apply to all other routes.
export const config = {
	matcher: '/:path*',
};

