#!/bin/bash

# BikeReserve - Setup Script
# This script will install dependencies and run initial formatting/linting

set -e  # Exit on error

echo "🚴 BikeReserve Setup Script"
echo "=========================="
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🎨 Running Prettier to format all files..."
npm run format:fix

echo ""
echo "🔍 Running ESLint to fix any auto-fixable issues..."
npm run lint:fix || true  # Don't exit on lint errors

echo ""
echo "🔧 Running TypeScript type check..."
npm run typecheck || echo "⚠️  TypeScript found some issues - please review them"

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "   1. Review any remaining ESLint or TypeScript errors"
echo "   2. Read STYLE_GUIDE.md for coding standards"
echo "   3. Run 'npm run dev' to start development"
echo ""
echo "💡 Helpful commands:"
echo "   npm run dev        - Start development server"
echo "   npm run check      - Format and lint all files"
echo "   npm run typecheck  - Check TypeScript types"
echo ""
