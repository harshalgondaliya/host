import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

const Slideshow = () => {
  // Image data with links
  const slideData = [
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
  
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef(null);
  const transitionRef = useRef(null);
  const slideshowRef = useRef(null);

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

  const handleNavigation = (index, isAutomatic = false) => {
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
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setIsPaused(true);
    clearTimeout(timeoutRef.current);
  };

  const handleTouchEnd = (e) => {
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
  };

  // Get current image based on device type
  const getCurrentImage = () => {
    const currentSlide = slideData[currentIndex];
    return isMobile ? currentSlide.mobile : currentSlide.desktop;
  };

  // Get current slide data
  const getCurrentSlide = () => {
    return slideData[currentIndex];
  };

  // Get transition classes based on state
  const getTransitionClasses = () => {
    return `absolute inset-0 w-full h-full object-contain transition-opacity duration-600 ease-in-out ${
      isTransitioning ? 'opacity-60' : 'opacity-100'
    }`;
  };

  return (
    <div className="relative w-full max-w-[50rem] mx-auto">
      <div 
        ref={slideshowRef}
        className="relative h-[24rem] md:h-[32rem] lg:h-[36rem] overflow-hidden rounded-lg shadow-xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Blur */}
        <img
          src={getCurrentImage()}
          alt={`${getCurrentSlide().name} background`}
          className="absolute inset-0 w-full h-full object-cover blur-xl transition-transform duration-700 ease-in-out scale-105"
          style={{ transform: isTransitioning ? 'scale(1.1)' : 'scale(1.05)' }}
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
          <img
            src={getCurrentImage()}
            alt={getCurrentSlide().name}
            className={getTransitionClasses()}
            style={{ 
              transform: `scale(${isTransitioning ? '0.97' : '1'})`,
              transition: 'transform 600ms ease-in-out, opacity 600ms ease-in-out'
            }}
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
        <button
          onClick={() => handleNavigation((currentIndex - 1 + 5) % 5)}
          className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 p-3 md:p-4 text-white bg-black/40 rounded-full hover:bg-black/60 transition-all hover:scale-110 active:scale-95 z-20"
          aria-label="Previous slide"
        >
          ❮
        </button>
        <button
          onClick={() => handleNavigation((currentIndex + 1) % 5)}
          className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 p-3 md:p-4 text-white bg-black/40 rounded-full hover:bg-black/60 transition-all hover:scale-110 active:scale-95 z-20"
          aria-label="Next slide"
        >
          ❯
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-3">
        {slideData.map((slide, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(index)}
            className={`w-3 h-3 md:w-4 md:h-4 border-2 cursor-pointer transition-all duration-300 ease-in-out ${
              currentIndex === index
                ? "border-white bg-black animate-pulse scale-110"
                : "border-gray-500 bg-white hover:scale-110"
            } rounded-full`}
            aria-label={`Go to ${slide.name} slide`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
