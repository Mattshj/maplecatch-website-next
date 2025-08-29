# syntax=docker/dockerfile:1.6

# 1. Dependencies Stage
FROM node:20-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat && apk upgrade --no-cache

# Copy package manager files
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install ALL dependencies (dev + prod) for build
RUN if [ -f package-lock.json ]; then npm ci; \
    elif [ -f yarn.lock ]; then corepack enable && yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile; \
    else npm install; fi

# 2. Builder Stage
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production

RUN apk add --no-cache libc6-compat && apk upgrade --no-cache

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js app (needs devDependencies)
RUN npm run build

# 3. Runner Stage (minimal image)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=8080

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
USER nextjs

# Copy standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 8080
CMD ["node", "server.js"]
