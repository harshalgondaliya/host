import React, { useState, useEffect, useRef } from "react";
import image1 from "../assets/images/Grapes_Card.jpg";
import image2 from "../assets/all_juice/grapes_img_page-0001.jpg";
import image3 from "../assets/images/Lychee_Card.jpg";
import image4 from "../assets/all_juice/lychee_img_page-0001.jpg";
import image5 from "../assets/images/Mango_Card.jpg";
import image6 from "../assets/all_juice/mango_img_page-0001.jpg";
import image7 from "../assets/images/Pineapple_Post.jpg";
import image8 from "../assets/all_juice/pineapple_img.jpg";
import image9 from "../assets/images/Strawberry_Card.jpg";
import image10 from "../assets/all_juice/straw_img_page-0001.jpg";

const Slideshow = () => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000); // Auto-slide every 2 seconds
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, isPaused]);

  const handleNavigation = (index) => {
    setCurrentIndex(index);
    setIsPaused(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
  };

  return (
    <div className="relative w-full max-w-[50rem] mx-auto">
      <div className="relative h-[24rem] md:h-[32rem] lg:h-[36rem] overflow-hidden rounded-lg">
        {/* Background Blur */}
        <img
          src={images[currentIndex]}
          alt={`Background ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover blur-xl"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Main Slide Image */}
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* Navigation Buttons */}
        <button
          onClick={() => handleNavigation((currentIndex - 1 + images.length) % images.length)}
          className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 p-3 md:p-4 text-white bg-black/40 rounded-full hover:bg-black/60 transition"
        >
          ❮
        </button>
        <button
          onClick={() => handleNavigation((currentIndex + 1) % images.length)}
          className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 p-3 md:p-4 text-white bg-black/40 rounded-full hover:bg-black/60 transition"
        >
          ❯
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(index)}
            className={`w-3 h-3 md:w-4 md:h-4 border-2 cursor-pointer transition-all duration-200 ${
              currentIndex === index
                ? "border-white bg-black animate-pulse"
                : "border-gray-500 bg-white"
            } rounded-full`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
