#!/bin/bash

echo "🔧 Fixing 3D Dependencies and Compilation Issues..."

# Clear npm cache
echo "📦 Clearing npm cache..."
npm cache clean --force

# Remove node_modules and package-lock.json
echo "🗑️ Removing node_modules and package-lock.json..."
rm -rf node_modules
rm -f package-lock.json

# Install dependencies
echo "📥 Installing dependencies..."
npm install

# Install specific 3D dependencies with compatible versions
echo "🎮 Installing 3D dependencies..."
npm install @react-three/fiber@8.15.11 @react-three/drei@9.88.13 three@0.158.0 @types/three@0.158.0

echo "✅ Dependencies fixed! Try running 'npm start' now."
echo ""
echo "🚀 If you still get errors, try:"
echo "   npm start -- --reset-cache"
echo ""
echo "📝 The 3D components have been updated to use compatible materials."
echo "   - Removed MeshDistortMaterial (causing compilation issues)"
echo "   - Replaced with meshStandardMaterial"
echo "   - Fixed wildcard exports in 3D index file"

