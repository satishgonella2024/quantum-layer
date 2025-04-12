#!/bin/bash

# Build script for all QuantumLayer components

set -e

echo "Building all QuantumLayer components..."

# Build core library
echo "Building core library..."
npm run build

# Build web interface
echo "Building web interface..."
cd web
npm install
npm run build
cd ..

# Build desktop app
echo "Building desktop app..."
cd desktop
npm install
npm run build
cd ..

echo "All components built successfully!"
