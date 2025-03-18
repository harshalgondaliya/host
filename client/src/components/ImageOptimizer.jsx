import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const placeholderSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23cccccc'/%3E%3C/svg%3E";

/**
 * Optimized image component with advanced lazy loading
 */
const OptimizedImage = React.memo(({ 
  src, 
  alt = "Product image", 
  className, 
  onClick, 
  threshold = 100,
  width,
  height,
  loadingPriority = "lazy",
  style = {}
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative" style={{ width, height, ...style }}>
      {!isLoaded && (
        <div className="animate-pulse bg-gray-200 absolute inset-0 rounded"></div>
      )}
      <LazyLoadImage
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        effect="blur"
        threshold={threshold}
        onClick={onClick}
        placeholderSrc={placeholderSrc}
        width={width}
        height={height}
        loading={loadingPriority}
        afterLoad={() => setIsLoaded(true)}
        decoding="async"
        style={{ transition: 'opacity 0.3s', ...style }}
      />
    </div>
  );
});

/**
 * Load image relative to your project using Vite
 * Example usage: loadImage('/assets/images/products/grapes.webp')
 */
export const loadImage = (path) => {
  try {
    // Remove leading slash if present for consistency
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    
    // Use consistent path approach for both dev and prod
    return '/' + normalizedPath;
  } catch (error) {
    console.error(`Failed to load image: ${path}`, error);
    return placeholderSrc;
  }
};

/**
 * Preload images and return a promise that resolves when loading is complete
 * @param {string[]} paths - Array of image paths to preload
 * @returns {Promise<Object>} - Promise that resolves with an object mapping paths to loaded images
 */
export const preloadImages = (paths) => {
  return new Promise((resolve) => {
    const images = {};
    let loadedCount = 0;
    
    // If no paths, resolve immediately
    if (!paths || paths.length === 0) {
      resolve(images);
      return;
    }
    
    paths.forEach(path => {
      const img = new Image();
      const imagePath = loadImage(path);
      img.src = imagePath;
      
      const onLoad = () => {
        images[path] = imagePath;
        loadedCount++;
        if (loadedCount === paths.length) {
          resolve(images);
        }
      };
      
      const onError = () => {
        console.error(`Failed to preload image: ${path}`);
        images[path] = placeholderSrc;
        loadedCount++;
        if (loadedCount === paths.length) {
          resolve(images);
        }
      };
      
      img.onload = onLoad;
      img.onerror = onError;
      
      // If image is already cached by browser
      if (img.complete) {
        onLoad();
      }
    });
  });
};

/**
 * Image cache singleton to avoid duplicate loading
 */
export const ImageCache = {
  _cache: {},
  get: function(path) {
    return this._cache[path];
  },
  set: function(path, value) {
    this._cache[path] = value;
    return value;
  },
  preload: async function(paths) {
    const result = await preloadImages(paths);
    this._cache = {...this._cache, ...result};
    return result;
  }
};

export default OptimizedImage;
