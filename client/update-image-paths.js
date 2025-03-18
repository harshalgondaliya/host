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
    
    content = content.replace(loadImageRegex, (match, path) => {
      // If path already starts with '../assets/', leave it
      if (path.startsWith('../assets/')) {
        return match;
      }
      
      // Otherwise, fix the path by adding '../assets/'
      // If it doesn't include 'images/products/', add that too
      let newPath = path;
      
      if (!path.includes('assets/')) {
        newPath = '../assets/' + newPath;
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