# 1. Dependencies Stage
FROM node:20-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat && apk upgrade --no-cache

# Copy package manager files
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install ONLY production dependencies (for runner later)
RUN if [ -f package-lock.json ]; then npm ci --only=production && npm cache clean --force; \
    elif [ -f yarn.lock ]; then corepack enable && yarn install --frozen-lockfile --production && yarn cache clean; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile --prod && pnpm store prune; \
    else npm install --only=production && npm cache clean --force; fi

# 2. Builder Stage
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production

RUN apk add --no-cache libc6-compat && apk upgrade --no-cache

# Copy package manager files
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install ALL dependencies including devDependencies
RUN if [ -f package-lock.json ]; then npm ci; \
    elif [ -f yarn.lock ]; then corepack enable && yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile; \
    else npm install; fi

# Copy app code
COPY . .

# Build Next.js app
RUN npm run build

# 3. Production Stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone output from the builder stage
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
