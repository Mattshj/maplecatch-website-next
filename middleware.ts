import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory token bucket per IP. Suitable for single-instance dev only.
// For production behind multiple instances, replace with a shared store like Redis or Upstash.

type Bucket = {
	// tokens remaining in the current window
	tokens: number;
	// unix ms timestamp when the bucket resets
	resetAtMs: number;
	// track suspicious activity
	suspiciousCount: number;
};

// Configuration
const WINDOW_MS = 60_000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 60; // allow 60 requests per minute per IP
const SUSPICIOUS_THRESHOLD = 100; // mark as suspicious after 100 requests
const BLOCK_THRESHOLD = 200; // block after 200 requests

// In-memory store
const ipToBucket: Map<string, Bucket> = new Map();

// Clean up old entries periodically (every 5 minutes)
setInterval(() => {
	const now = Date.now();
	for (const [ip, bucket] of ipToBucket.entries()) {
		if (now >= bucket.resetAtMs + 300_000) { // 5 minutes after reset
			ipToBucket.delete(ip);
		}
	}
}, 300_000);

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

function isSuspiciousRequest(request: NextRequest): boolean {
	const userAgent = request.headers.get('user-agent') || '';
	const pathname = request.nextUrl.pathname;
	
	// Check for common bot/attack patterns
	const suspiciousPatterns = [
		/\.(php|asp|aspx|jsp|cgi)$/i,
		/(wp-admin|wp-login|admin|login|phpmyadmin)/i,
		/(sqlmap|nikto|nmap|scanner)/i,
		/(bot|crawler|spider)/i,
	];
	
	// Check for suspicious user agents
	const suspiciousUserAgents = [
		/sqlmap/i,
		/nikto/i,
		/nmap/i,
		/scanner/i,
		/bot/i,
		/crawler/i,
		/spider/i,
	];
	
	return suspiciousPatterns.some(pattern => pattern.test(pathname)) ||
		   suspiciousUserAgents.some(pattern => pattern.test(userAgent));
}

function takeTokenNow(ip: string, isSuspicious: boolean): { allowed: boolean; remaining: number; resetAtMs: number; blocked: boolean } {
	const now = Date.now();
	const bucket = ipToBucket.get(ip);
	
	if (!bucket || now >= bucket.resetAtMs) {
		// initialize/reset bucket
		const newBucket: Bucket = { 
			tokens: MAX_REQUESTS_PER_WINDOW - 1, 
			resetAtMs: now + WINDOW_MS,
			suspiciousCount: isSuspicious ? 1 : 0
		};
		ipToBucket.set(ip, newBucket);
		return { allowed: true, remaining: newBucket.tokens, resetAtMs: newBucket.resetAtMs, blocked: false };
	}
	
	// Increment suspicious count if this request is suspicious
	if (isSuspicious) {
		bucket.suspiciousCount += 1;
	}
	
	// Block if suspicious count exceeds threshold
	if (bucket.suspiciousCount >= BLOCK_THRESHOLD) {
		return { allowed: false, remaining: 0, resetAtMs: bucket.resetAtMs, blocked: true };
	}
	
	if (bucket.tokens > 0) {
		bucket.tokens -= 1;
		return { allowed: true, remaining: bucket.tokens, resetAtMs: bucket.resetAtMs, blocked: false };
	}
	
	return { allowed: false, remaining: 0, resetAtMs: bucket.resetAtMs, blocked: false };
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
	const isSuspicious = isSuspiciousRequest(request);
	const { allowed, remaining, resetAtMs, blocked } = takeTokenNow(ip, isSuspicious);

	// Add security headers to all responses
	const response = allowed ? NextResponse.next() : new NextResponse('Too Many Requests', {
		status: blocked ? 403 : 429,
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'X-RateLimit-Limit': String(MAX_REQUESTS_PER_WINDOW),
			'X-RateLimit-Remaining': String(remaining),
			'X-RateLimit-Reset': String(Math.floor(resetAtMs / 1000)),
			'Retry-After': String(Math.max(1, Math.ceil((resetAtMs - Date.now()) / 1000))),
		},
	});

	// Add rate limit headers
	response.headers.set('X-RateLimit-Limit', String(MAX_REQUESTS_PER_WINDOW));
	response.headers.set('X-RateLimit-Remaining', String(remaining));
	response.headers.set('X-RateLimit-Reset', String(Math.floor(resetAtMs / 1000)));
	
	// Add additional security headers
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-XSS-Protection', '1; mode=block');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
	
	return response;
}

export const config = {
	matcher: '/:path*',
};

