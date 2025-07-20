# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm ci

# Copy source code
COPY src ./src
COPY index.html ./
COPY vite.config.ts ./
COPY tsconfig*.json ./
COPY tailwind.config.js ./
COPY .postcssrc.json ./

# Build the frontend
RUN npm run build

# Production stage
FROM node:24-alpine AS production

WORKDIR /app

# Copy package files for server dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built frontend
COPY --from=builder /app/dist ./dist

# Copy server code
COPY src/server ./src/server

# Copy healthcheck
COPY docker/healthcheck.js ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001 -G nodejs

# Change ownership
RUN chown -R appuser:nodejs /app
USER appuser

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start script
CMD ["npm", "run", "server"]

