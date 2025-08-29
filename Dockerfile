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

# Copy all deps again, but now install devDependencies
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN if [ -f package-lock.json ]; then npm ci; \
    elif [ -f yarn.lock ]; then corepack enable && yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile; \
    else npm install; fi

# Copy app code
COPY . .

# Build Next.js app
RUN npm run build
