/**
 * This script updates all store files to fix the image path issue
 * for both development and production builds.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name correctly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files to update - all product files
const filesToUpdate = [
  // Desktop versions
  'grapes.jsx',
  'lychee.jsx',
  'mango.jsx',
  'pineapple.jsx',
  'pomegranate.jsx',
  'skyberry.jsx',
  'strawberry.jsx',
  
  // Mobile versions
  'grapesM.jsx',
  'lycheeM.jsx',
  'mangoM.jsx',
  'pineappleM.jsx',
  'pomegranateM.jsx',
  'skyberryM.jsx',
  'strawberryM.jsx',
];

const storePath = path.join(__dirname, 'src', 'store');

// Function to update image paths in a file
function updateImagePaths(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the loadImage paths
    const loadImageRegex = /loadImage\(['"]([^'"]+)['"]\)/g;
    
    content = content.replace(loadImageRegex, (match, imagePath) => {
      // Normalize the path
      let newPath = imagePath;
      
      // Ensure path starts with /assets/ for consistency
      if (!newPath.startsWith('/assets/') && !newPath.startsWith('../assets/')) {
        if (newPath.includes('assets/')) {
          // Convert 'assets/...' to '/assets/...'
          newPath = '/' + newPath;
        } else {
          // Add '/assets/' prefix if missing
          newPath = '/assets/' + newPath;
        }
      }
      
      // Convert '../assets/' to '/assets/' for consistency
      if (newPath.startsWith('../assets/')) {
        newPath = newPath.replace('../assets/', '/assets/');
      }
      
      return `loadImage('${newPath}')`;
    });
    
    // Save the updated file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated image paths in ${path.basename(filePath)}`);
    
  } catch (error) {
    console.error(`✗ Error updating ${path.basename(filePath)}:`, error);
  }
}

// Update all files
console.log("Updating image paths in store files...");

for (const file of filesToUpdate) {
  const filePath = path.join(storePath, file);
  
  if (fs.existsSync(filePath)) {
    updateImagePaths(filePath);
  } else {
    console.warn(`⚠ File not found: ${file}`);
  }
}

console.log("Image path update completed!");

// Also copy required images to public folder to ensure availability in production
const publicAssetsDir = path.join(__dirname, 'public', 'assets', 'images');
const srcAssetsDir = path.join(__dirname, 'src', 'assets', 'images');

// Create directories if they don't exist
if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
  console.log("Created public assets directory");
}

// Copy images from src/assets to public/assets
function copyImagesRecursively(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    console.warn(`⚠ Source directory not found: ${sourceDir}`);
    return;
  }
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  const items = fs.readdirSync(sourceDir);
  
  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const targetPath = path.join(targetDir, item);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyImagesRecursively(sourcePath, targetPath);
    } else {
      // Only copy image files
      if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(item)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied: ${item} to public assets`);
      }
    }
  }
}

console.log("Copying images to public folder for production...");
copyImagesRecursively(srcAssetsDir, publicAssetsDir);
console.log("Image copy completed!"); 