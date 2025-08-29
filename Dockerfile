# syntax=docker/dockerfile:1.6

# 1. Builder Stage: Build the Next.js application
FROM node:20-alpine AS builder
WORKDIR /app

ENV NODE_ENV=production
# Next.js collects anonymous telemetry data on usage. Disable it.
ENV NEXT_TELEMETRY_DISABLED 1

# Install OS dependencies
RUN apk add --no-cache libc6-compat

# Copy package manager files
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install ALL dependencies (including dev dependencies needed for the build)
RUN if [ -f package-lock.json ]; then npm ci; \
    elif [ -f yarn.lock ]; then corepack enable && yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile; \
    else npm install; fi

# Copy the rest of the application source code
COPY . .

# Build the Next.js application with standalone output
RUN npm run build

# 2. Runner Stage: Create the final, minimal production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 8080

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Change ownership of the app directory
USER nextjs

# Copy the standalone output from the builder stage
# This includes the server, public assets, and static files
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 8080

CMD ["node", "server.js"]