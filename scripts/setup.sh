#!/bin/bash

# Setup script for QuantumLayer development environment

set -e

echo "Setting up QuantumLayer development environment..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js is required but not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d '.' -f 1)
if [ "$NODE_MAJOR" -lt 16 ]; then
    echo "Node.js v16 or higher is required. Found v$NODE_VERSION."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Create necessary directories
echo "Creating configuration directories..."
mkdir -p ~/.quantum/agents
mkdir -p ~/.quantum/memory
mkdir -p ~/.quantum/history
mkdir -p ~/.quantum/graphs

# Copy example configurations
echo "Copying example configurations..."
cp -n examples/agents/* ~/.quantum/agents/ 2>/dev/null || true
cp -n examples/config/quantum-config.yaml ~/.quantum/config.yaml 2>/dev/null || true

# Build the project
echo "Building project..."
npm run build

# Link for development
echo "Setting up development links..."
npm link

echo "
QuantumLayer setup complete!

To start using the CLI, run:
  quantumctl --help

To start the web interface, run:
  cd web && npm run dev

To run the desktop app, run:
  cd desktop && npm run dev
"
