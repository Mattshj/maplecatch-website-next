# syntax=docker/dockerfile:1.6

# ---------- Base builder image ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Install OS deps and security updates
RUN apk add --no-cache libc6-compat && \
    apk upgrade --no-cache

# Copy lockfiles and package manifest first for better caching
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install dependencies (prefer npm if lockfile present)
RUN if [ -f package-lock.json ]; then npm ci --only=production && npm cache clean --force; \
    elif [ -f yarn.lock ]; then corepack enable && yarn install --frozen-lockfile --production && yarn cache clean; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile --prod && pnpm store prune; \
    else npm install --only=production && npm cache clean --force; fi

# ---------- Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

# Install build dependencies
RUN apk add --no-cache libc6-compat && \
    apk upgrade --no-cache

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js (standalone output)
RUN npm run build

# ---------- Runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app

# Install security updates and create non-root user
RUN apk upgrade --no-cache && \
    addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs && \
    # Create necessary directories with proper permissions
    mkdir -p /app/.next /app/public && \
    chown -R nextjs:nodejs /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=8080 \
    # Security: Disable Node.js debugging
    NODE_OPTIONS="--max-old-space-size=512" \
    # Security: Set umask for file creation
    UMASK=0022

# Cloud Run expects the server to listen on PORT env
EXPOSE 8080

# Copy only the necessary files from the builder output
# .next/standalone contains the server and production node_modules
# .next/static needs to be served as well
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Security: Switch to non-root user
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8080/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the Next.js standalone server
CMD ["node", "server.js"]