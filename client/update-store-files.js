/**
 * This is a template for updating all store files to use the optimized image loading approach
 * 
 * Instructions for developers:
 * 
 * 1. For each product page, update image imports:
 *    - Remove direct imports like: import apple from "../assets/images/products/apple.webp"
 *    - Add import for OptimizedImage: import OptimizedImage, { loadImage } from "../components/ImageOptimizer"
 *    - Replace with dynamic imports: const apple = loadImage('../assets/images/products/apple.webp')
 * 
 * 2. Replace all <img> tags with <OptimizedImage> components:
 *    - <img src={image} alt="..." /> becomes:
 *    - <OptimizedImage src={image} alt="..." />
 * 
 * 3. Memoize the thumbnails array:
 *    const imageThumbnails = React.useMemo(() => [
 *      { src: image1, alt: "Description 1" },
 *      { src: image2, alt: "Description 2" },
 *      ...
 *    ], [image1, image2, ...]);
 * 
 * 4. Update the thumbnail display:
 *    {imageThumbnails.map((image, index) => (
 *      <OptimizedImage
 *        key={index}
 *        src={image.src}
 *        alt={image.alt}
 *        className="..."
 *        onClick={() => setSelectedImage(image.src)}
 *      />
 *    ))}
 * 
 * 5. Make sure to update the selectedImage state:
 *    - If it was comparing selectedImage === image, now compare selectedImage === image.src
 * 
 * For mobile versions: Follow the same pattern but adapt to the mobile layout.
 * For wrapper components: No changes needed as they just determine which component to render.
 * 
 * Example:
 * 
 * // Before
 * import apple from "../assets/images/products/apple.webp";
 * // ...
 * <img src={apple} alt="Apple" />
 * 
 * // After
 * import OptimizedImage, { loadImage } from "../components/ImageOptimizer";
 * // ...
 * const apple = loadImage('../assets/images/products/apple.webp');
 * // ...
 * <OptimizedImage src={apple} alt="Apple" />
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name correctly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files to update - excluding strawberry and strawberryM which are already updated
const filesToUpdate = [
  // Desktop versions
  'grapes.jsx',
  'lychee.jsx',
  'mango.jsx',
  'pineapple.jsx',
  'pomegranate.jsx',
  'skyberry.jsx',
  
  // Mobile versions
  'grapesM.jsx',
  'lycheeM.jsx',
  'mangoM.jsx',
  'pineappleM.jsx',
  'pomegranateM.jsx',
  'skyberryM.jsx',
];

const storePath = path.join(__dirname, 'src', 'store');

// Function to update a file
function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Update imports
    const importRegex = /import\s+(\w+)\s+from\s+["']([^"']+\.(webp|png|jpg|jpeg|svg))["'];/g;
    const importMatches = [...content.matchAll(importRegex)];
    
    if (importMatches.length) {
      // Add the OptimizedImage import if not already present
      if (!content.includes('import OptimizedImage')) {
        content = content.replace(
          /import React[^;]+;/,
          `import React, { useRef, useEffect, useState, useContext } from "react";\nimport OptimizedImage, { loadImage } from "../components/ImageOptimizer";`
        );
      }
      
      // Replace static imports with dynamic imports
      for (const match of importMatches) {
        const [fullImport, varName, importPath] = match;
        content = content.replace(
          fullImport,
          `// Dynamically import ${varName}\nconst ${varName} = loadImage('${importPath}');`
        );
      }
    }
    
    // 2. Add memoized image thumbnails array
    if (!content.includes('imageThumbnails')) {
      // Find image variable names
      const imageVarRegex = /const\s+(\w+)\s+=\s+loadImage\(['"][^'"]+\.webp['"]\);/g;
      const imageVars = [...content.matchAll(imageVarRegex)].map(match => match[1]);
      
      if (imageVars.length) {
        // Add after all variable declarations but before the return statement
        const thumbnailsArray = `
  // Memoized image thumbnails array
  const imageThumbnails = React.useMemo(() => [
    ${imageVars.map((v, i) => `{ src: ${v}, alt: "${v} image" }`).join(',\n    ')}
  ], [${imageVars.join(', ')}]);
`;
        content = content.replace(
          /(const\s+subtotalPrice[^;]+;)/,
          `$1\n${thumbnailsArray}`
        );
      }
    }
    
    // 3. Fix the thumbnail mapping
    const thumbnailMapRegex = /{(\[[\w\s,]+\])\.map\(\(image,\s*index\)\s*=>\s*\([^}]+\}\)\)}/gs;
    content = content.replace(
      thumbnailMapRegex,
      `{imageThumbnails.map((image, index) => (
              <div
                key={index}
                className={\`cursor-pointer p-1 rounded \${
                  selectedImage === image.src
                    ? "border-2 border-green-700"
                    : "border border-gray-300"
                }\`}
                onClick={() => setSelectedImage(image.src)}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  className="w-16 h-16 object-cover"
                  threshold={200}
                />
              </div>
            ))}`
    );
    
    // 4. Replace any remaining img tags with OptimizedImage
    content = content.replace(
      /<img\s+([^>]+)src={([^}]+)}([^>]+)>/g,
      `<OptimizedImage
              $1src={$2}$3>`
    );
    
    // 5. Fix main image display
    content = content.replace(
      /<OptimizedImage\s+src={selectedImage}([^>]+)>/g,
      `<OptimizedImage
              src={selectedImage}$1>`
    );
    
    // 6. Fix any remaining selected image comparisons
    content = content.replace(
      /selectedImage\s*===\s*image\s*\?/g,
      'selectedImage === image.src ?'
    );
    
    // Save the updated file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${path.basename(filePath)}`);
    
  } catch (error) {
    console.error(`Error updating ${path.basename(filePath)}:`, error);
  }
}

// Process all files
console.log('Starting update of store files...');
filesToUpdate.forEach(file => {
  const filePath = path.join(storePath, file);
  updateFile(filePath);
});
console.log('Finished updating store files');

// Run this script with: node update-store-files.js 