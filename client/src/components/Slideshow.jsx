import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useTranslation } from 'react-i18next';

// Using dynamic imports to split the bundle
const loadImages = () => {
  return {
    image1: () => import("../assets/images/GrapesD.webp"),
    image2: () => import("../assets/images/GrapesMo.webp"),
    image3: () => import("../assets/images/LycheeD.webp"),
    image4: () => import("../assets/images/LycheeMo.webp"),
    image5: () => import("../assets/images/MangoD.webp"),
    image6: () => import("../assets/images/MangoMo.webp"),
    image7: () => import("../assets/images/PineappleD.webp"),
    image8: () => import("../assets/images/PineappleMo.webp"),
    image9: () => import("../assets/images/StrawberryD.webp"),
    image10: () => import("../assets/images/StrawberryMo.webp"),
  };
};

// Import images statically to ensure immediate availability
import image1 from "../assets/images/GrapesD.webp";
import image2 from "../assets/images/GrapesMo.webp";
import image3 from "../assets/images/LycheeD.webp";
import image4 from "../assets/images/LycheeMo.webp";
import image5 from "../assets/images/MangoD.webp";
import image6 from "../assets/images/MangoMo.webp";
import image7 from "../assets/images/PineappleD.webp";
import image8 from "../assets/images/PineappleMo.webp";
import image9 from "../assets/images/StrawberryD.webp";
import image10 from "../assets/images/StrawberryMo.webp";

// Loading placeholder component
const LoadingPlaceholder = memo(React.forwardRef((props, ref) => (
  <div ref={ref} className="animate-pulse bg-gray-200 w-full h-full rounded"></div>
)));

// Navigation button component
const NavButton = memo(({ direction, onClick, label }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 ${
      direction === 'prev' ? 'left-2 md:left-4' : 'right-2 md:right-4'
    } transform -translate-y-1/2 p-3 md:p-4 text-white bg-black/40 rounded-full hover:bg-black/60 transition-all hover:scale-110 active:scale-95 z-20`}
    aria-label={label}
  >
    {direction === 'prev' ? '❮' : '❯'}
  </button>
));

// Dot indicator component
const DotIndicator = memo(({ active, onClick, ariaLabel }) => (
  <div
    onClick={onClick}
    className={`w-3 h-3 md:w-4 md:h-4 border-2 cursor-pointer transition-all duration-300 ease-in-out ${
      active
        ? "border-white bg-black animate-pulse scale-110"
        : "border-gray-500 bg-white hover:scale-110"
    } rounded-full`}
    aria-label={ariaLabel}
  ></div>
));

// Error boundary component for handling errors in the slideshow
class SlideshowErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Slideshow error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-[50rem] mx-auto h-[24rem] md:h-[32rem] lg:h-[36rem] bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center p-4">
            <h2 className="text-xl text-red-600 mb-2">Oops! Something went wrong.</h2>
            <p className="mb-4">We're having trouble loading the slideshow.</p>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => this.setState({ hasError: false })}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Define the component as a named function
const Slideshow = () => {
  // Add translation hook even if not used yet
  const { t } = useTranslation();
  
  // Define states first
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  
  // Define refs
  const timeoutRef = useRef(null);
  const transitionRef = useRef(null);
  const slideshowRef = useRef(null);
  
  // Define static slide data
  const slideDataArray = [
    { 
      desktop: image1, 
      mobile: image2, 
      link: "/grapes",
      name: "Grapes"
    },
    { 
      desktop: image3, 
      mobile: image4, 
      link: "/lychee",
      name: "Lychee" 
    },
    { 
      desktop: image5, 
      mobile: image6, 
      link: "/mango",
      name: "Mango" 
    },
    { 
      desktop: image7, 
      mobile: image8, 
      link: "/pineapple",
      name: "Pineapple" 
    },
    { 
      desktop: image9, 
      mobile: image10, 
      link: "/strawberry",
      name: "Strawberry" 
    }
  ];
  
  // Image data with links - memoized to prevent recreation on each render
  const slideData = useMemo(() => slideDataArray, []);
  
  // Preload next images
  useEffect(() => {
    if (!slideData || !slideData.length) return;
    
    const nextIndex = (currentIndex + 1) % slideData.length;
    const nextNextIndex = (currentIndex + 2) % slideData.length;
    
    // Preload next 2 images
    const imageToLoad1 = isMobile ? slideData[nextIndex].mobile : slideData[nextIndex].desktop;
    const imageToLoad2 = isMobile ? slideData[nextNextIndex].mobile : slideData[nextNextIndex].desktop;
    
    if (!imageToLoad1 || !imageToLoad2) return;
    
    const img1 = new Image();
    const img2 = new Image();
    
    img1.src = imageToLoad1;
    img2.src = imageToLoad2;
    
    return () => {
      img1.onload = null;
      img2.onload = null;
    };
  }, [currentIndex, slideData, isMobile]);

  // Check if mobile on component mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check immediately
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!isPaused && slideData && slideData.length) {
      timeoutRef.current = setTimeout(() => {
        handleNavigation((currentIndex + 1) % slideData.length, true);
      }, 3000); // Auto-slide every 3 seconds
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, isPaused, slideData]);

  const handleNavigation = useCallback((index, isAutomatic = false) => {
    if (!slideData || !slideData.length) return;
    if (isTransitioning && !isAutomatic) return; // Prevent rapid clicks during transition
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    if (!isAutomatic) {
      setIsPaused(true);
      clearTimeout(timeoutRef.current);
    }
    
    // Clear previous transition timeout if exists
    if (transitionRef.current) {
      clearTimeout(transitionRef.current);
    }
    
    // Set timeout for transition duration
    transitionRef.current = setTimeout(() => {
      setIsTransitioning(false);
      
      if (!isAutomatic) {
        timeoutRef.current = setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
      }
    }, 600); // Match this with the CSS transition duration
  }, [isTransitioning, slideData]);

  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    setTouchStart(e.touches[0].clientX);
    setIsPaused(true);
    clearTimeout(timeoutRef.current);
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!slideData || !slideData.length) return;
    if (isTransitioning) return; // Prevent swiping during transitions
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // If swipe distance is significant enough
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        // Swipe left, go to next
        handleNavigation((currentIndex + 1) % slideData.length);
      } else {
        // Swipe right, go to previous
        handleNavigation((currentIndex - 1 + slideData.length) % slideData.length);
      }
    } else {
      // If it was just a tap, not a swipe
      timeoutRef.current = setTimeout(() => setIsPaused(false), 5000);
    }
  }, [handleNavigation, isTransitioning, touchStart, currentIndex, slideData]);

  // Get current image based on device type
  const getCurrentImage = useCallback(() => {
    if (!slideData || !slideData.length || currentIndex >= slideData.length) return '';
    const currentSlide = slideData[currentIndex];
    return isMobile ? currentSlide.mobile : currentSlide.desktop;
  }, [slideData, currentIndex, isMobile]);

  // Get current slide data
  const getCurrentSlide = useCallback(() => {
    if (!slideData || !slideData.length || currentIndex >= slideData.length) {
      return { name: 'Slide', link: '/' };
    }
    return slideData[currentIndex];
  }, [slideData, currentIndex]);

  // Get transition classes based on state
  const getTransitionClasses = useCallback(() => {
    return `absolute inset-0 w-full h-full object-contain transition-opacity duration-600 ease-in-out ${
      isTransitioning ? 'opacity-60' : 'opacity-100'
    }`;
  }, [isTransitioning]);

  // Memoize the dots to prevent unnecessary re-renders
  const dotsIndicator = useMemo(() => {
    if (!slideData || !slideData.length) return null;
    
    return (
      <div className="flex justify-center mt-4 space-x-3">
        {slideData.map((slide, index) => (
          <DotIndicator
            key={index}
            active={currentIndex === index}
            onClick={() => handleNavigation(index)}
            ariaLabel={`Go to ${slide.name} slide`}
          />
        ))}
      </div>
    );
  }, [slideData, currentIndex, handleNavigation]);

  // Safeguard for missing data
  if (!slideData || slideData.length === 0) {
    return (
      <div className="relative w-full max-w-[50rem] mx-auto h-[24rem] md:h-[32rem] lg:h-[36rem] bg-gray-100 rounded-lg flex items-center justify-center">
        <p>No slides available</p>
      </div>
    );
  }

  return (
    <SlideshowErrorBoundary>
      <div className="relative w-full max-w-[50rem] mx-auto">
        <div 
          ref={slideshowRef}
          className="relative h-[24rem] md:h-[32rem] lg:h-[36rem] overflow-hidden rounded-lg shadow-xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background Blur */}
          <LazyLoadImage
            src={getCurrentImage()}
            alt={`${getCurrentSlide().name} background`}
            effect="blur"
            className="absolute inset-0 w-full h-full object-cover blur-xl transition-transform duration-700 ease-in-out scale-105"
            style={{ transform: isTransitioning ? 'scale(1.1)' : 'scale(1.05)' }}
            threshold={200}
            placeholder={<LoadingPlaceholder />}
          />
          <div className="absolute inset-0 bg-black/50 transition-opacity duration-500 ease-in-out"></div>

          {/* Main Slide Image with Link */}
          <Link 
            to={getCurrentSlide().link}
            className="absolute inset-0 flex items-center justify-center z-10"
            onClick={(e) => {
              // Prevent link navigation when swiping or using buttons
              if (isTransitioning) {
                e.preventDefault();
              }
            }}
          >
            <LazyLoadImage
              src={getCurrentImage()}
              alt={getCurrentSlide().name}
              effect="blur"
              className={getTransitionClasses()}
              style={{ 
                transform: `scale(${isTransitioning ? '0.97' : '1'})`,
                transition: 'transform 600ms ease-in-out, opacity 600ms ease-in-out'
              }}
              threshold={100}
              visibleByDefault={true}
            />
            
            {/* Fruit name overlay */}
            <div 
              className={`absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-3 px-4 font-bold text-xl md:text-2xl transition-all duration-500 ease-in-out ${
                isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              {getCurrentSlide().name}
            </div>
          </Link>

          {/* Navigation Buttons */}
          <NavButton 
            direction="prev" 
            onClick={() => handleNavigation((currentIndex - 1 + slideData.length) % slideData.length)}
            label="Previous slide"
          />
          <NavButton 
            direction="next" 
            onClick={() => handleNavigation((currentIndex + 1) % slideData.length)}
            label="Next slide"
          />
        </div>

        {/* Dots Indicator */}
        {dotsIndicator}
      </div>
    </SlideshowErrorBoundary>
  );
};

export default Slideshow;
