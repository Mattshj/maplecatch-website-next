# syntax=docker/dockerfile:1.6

# ---------- Base builder image ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Install OS deps (optional) and enable corepack for pnpm/yarn if needed
RUN apk add --no-cache libc6-compat

# Copy lockfiles and package manifest first for better caching
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install dependencies (prefer npm if lockfile present)
RUN if [ -f package-lock.json ]; then npm ci; \
    elif [ -f yarn.lock ]; then corepack enable && yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile; \
    else npm install; fi

# ---------- Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js (standalone output)
RUN npm run build

# ---------- Runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=8080

# Cloud Run expects the server to listen on PORT env
EXPOSE 8080

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy only the necessary files from the builder output
# .next/standalone contains the server and production node_modules
# .next/static needs to be served as well
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

# Start the Next.js standalone server
CMD ["node", "server.js"]