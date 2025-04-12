# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build project
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/examples ./examples
COPY --from=builder /app/bin ./bin

# Set permissions for executable
RUN chmod +x ./bin/quantumctl.js

# Make CLI globally available
RUN npm link

# Create necessary directories
RUN mkdir -p /.quantum/agents
RUN mkdir -p /.quantum/memory
RUN mkdir -p /.quantum/history

# Set environment variables
ENV NODE_ENV=production
ENV QUANTUM_CONFIG_DIR=/.quantum

# Command to run
ENTRYPOINT ["quantumctl"]
CMD ["--help"]
