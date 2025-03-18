import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const placeholderSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23cccccc'/%3E%3C/svg%3E";

/**
 * Optimized image component with lazy loading
 */
const OptimizedImage = React.memo(({ 
  src, 
  alt = "Product image", 
  className, 
  onClick, 
  threshold = 100 
}) => (
  <LazyLoadImage
    src={src}
    alt={alt}
    className={className}
    effect="blur"
    threshold={threshold}
    onClick={onClick}
    placeholderSrc={placeholderSrc}
  />
));

/**
 * Load image relative to your project using Vite
 * Example usage: loadImage('/assets/images/products/grapes.webp')
 */
export const loadImage = (path) => {
  try {
    console.log("Attempting to load image:", path);
    let imgUrl;
    
    // First try to load as URL
    try {
      imgUrl = new URL(path, import.meta.url).href;
    } catch (urlError) {
      console.warn(`URL loading failed for: ${path}`, urlError);
      
      // Try direct path as fallback
      imgUrl = path;
    }
    
    console.log("Image loaded as:", imgUrl);
    return imgUrl;
  } catch (error) {
    console.error(`Failed to load image: ${path}`, error);
    return placeholderSrc;
  }
};

export default OptimizedImage;
