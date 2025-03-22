#!/bin/bash
echo "Building the React app..."
npm run build

# Ensure routing config files are in the dist folder
echo "Copying routing configuration files..."

# For Apache
if [ -f "public/.htaccess" ]; then
  cp public/.htaccess dist/
fi

# For Netlify
if [ -f "public/_redirects" ]; then
  cp public/_redirects dist/
fi

echo "Build process completed!" 