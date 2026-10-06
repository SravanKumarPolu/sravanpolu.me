#!/bin/bash

# 3D Implementation Testing Setup Script
echo "🚀 Setting up 3D testing environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install 3D dependencies
echo "📦 Installing 3D dependencies..."
npm install @react-three/fiber @react-three/drei three @types/three

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ 3D dependencies installed successfully"
else
    echo "❌ Failed to install 3D dependencies"
    exit 1
fi

# Check if development server is already running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Development server is already running on port 3000"
    echo "🌐 You can access your app at: http://localhost:3000"
else
    echo "🚀 Starting development server..."
    echo "🌐 Your app will be available at: http://localhost:3000"
    echo "📋 Follow the testing guide: 3D_TESTING_GUIDE.md"
    echo ""
    echo "🎮 Testing Steps:"
    echo "1. Navigate to the Work section"
    echo "2. Click the cube icon (🟦) to toggle 3D view"
    echo "3. Test interactions: click & drag, scroll, keyboard navigation"
    echo "4. Click 'Explore' to open 3D modal"
    echo "5. Test accessibility features"
    echo ""
    echo "Press Ctrl+C to stop the server"
    npm start
fi
