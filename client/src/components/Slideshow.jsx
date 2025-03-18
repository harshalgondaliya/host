import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
const LoadingPlaceholder = memo(() => (
  <div className="animate-pulse bg-gray-200 w-full h-full rounded"></div>
));

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

const Slideshow = () => {
  // Image data with links - memoized to prevent recreation on each render
  const slideData = useMemo(() => [
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
  ], []);
  
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  
  const timeoutRef = useRef(null);
  const transitionRef = useRef(null);
  const slideshowRef = useRef(null);

  // Preload next images
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % slideData.length;
    const nextNextIndex = (currentIndex + 2) % slideData.length;
    
    // Preload next 2 images
    const imageToLoad1 = isMobile ? slideData[nextIndex].mobile : slideData[nextIndex].desktop;
    const imageToLoad2 = isMobile ? slideData[nextNextIndex].mobile : slideData[nextNextIndex].desktop;
    
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
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        handleNavigation((currentIndex + 1) % 5, true);
      }, 3000); // Auto-slide every 3 seconds
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, isPaused]);

  const handleNavigation = useCallback((index, isAutomatic = false) => {
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
  }, [isTransitioning]);

  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    setTouchStart(e.touches[0].clientX);
    setIsPaused(true);
    clearTimeout(timeoutRef.current);
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (isTransitioning) return; // Prevent swiping during transitions
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // If swipe distance is significant enough
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        // Swipe left, go to next
        handleNavigation((currentIndex + 1) % 5);
      } else {
        // Swipe right, go to previous
        handleNavigation((currentIndex - 1 + 5) % 5);
      }
    } else {
      // If it was just a tap, not a swipe
      timeoutRef.current = setTimeout(() => setIsPaused(false), 5000);
    }
  }, [handleNavigation, isTransitioning, touchStart, currentIndex]);

  // Get current image based on device type
  const getCurrentImage = useCallback(() => {
    const currentSlide = slideData[currentIndex];
    return isMobile ? currentSlide.mobile : currentSlide.desktop;
  }, [slideData, currentIndex, isMobile]);

  // Get current slide data
  const getCurrentSlide = useCallback(() => {
    return slideData[currentIndex];
  }, [slideData, currentIndex]);

  // Get transition classes based on state
  const getTransitionClasses = useCallback(() => {
    return `absolute inset-0 w-full h-full object-contain transition-opacity duration-600 ease-in-out ${
      isTransitioning ? 'opacity-60' : 'opacity-100'
    }`;
  }, [isTransitioning]);

  // Memoize the dots to prevent unnecessary re-renders
  const dotsIndicator = useMemo(() => (
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
  ), [slideData, currentIndex, handleNavigation]);

  return (
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
          onClick={() => handleNavigation((currentIndex - 1 + 5) % 5)}
          label="Previous slide"
        />
        <NavButton 
          direction="next" 
          onClick={() => handleNavigation((currentIndex + 1) % 5)}
          label="Next slide"
        />
      </div>

      {/* Dots Indicator */}
      {dotsIndicator}
    </div>
  );
};

export default memo(Slideshow);
