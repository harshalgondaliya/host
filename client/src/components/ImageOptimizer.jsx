import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Low quality image placeholder - a simple SVG
const placeholderSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23cccccc'/%3E%3C/svg%3E";

/**
 * Optimized image component with lazy loading
 * @param {Object} props Component properties
 * @param {string} props.src Image source URL
 * @param {string} props.alt Alt text for the image
 * @param {string} props.className CSS classes for the image
 * @param {Function} props.onClick Click handler for the image
 * @param {number} props.threshold Distance from the viewport in pixels to start loading
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
 * A helper function to load an image URL with the import.meta.url approach
 * This helps Vite optimize and bundle the images efficiently
 * @param {string} path Path to the image
 * @returns {string} The resolved URL
 */
export const loadImage = (path) => {
  try {
    return new URL(path, import.meta.url).href;
  } catch (error) {
    console.error(`Failed to load image: ${path}`, error);
    return placeholderSrc;
  }
};

export default OptimizedImage; 