import React, { Suspense, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import Slideshow directly instead of lazy loading it
import Slideshow from "./Slideshow";

// Importing card image
import all from "../assets/images/bg.webp";

// showpiece image
import end from "../assets/images/Too more banner.webp";

// valley image
import valley from "../assets/images/valley.webp";

// Importing images with descriptions
import grapesImg from "../assets/images/Grapes_Story.webp";
import pineappleImg from "../assets/images/Pineapple_Story.webp";
import strawImg from "../assets/images/Strawberry_Story.webp";
import lycheeImg from "../assets/images/Lychee_Story.webp";
import mangoImg from "../assets/images/Mango_Story.webp";

// Preload all images in the head
const preloadImagesInHead = () => {
  const images = [all, valley, grapesImg, pineappleImg, strawImg, lycheeImg, mangoImg, end];
  const head = document.head;
  
  images.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.type = 'image/webp';
    link.crossOrigin = '';  // Empty string means use-credentials mode same as the page
    head.appendChild(link);
  });
};

// Eagerly load all images on page load
const preloadImages = () => {
  const images = [all, valley, grapesImg, pineappleImg, strawImg, lycheeImg, mangoImg, end];
  images.forEach((src) => {
    const img = new Image();
    img.crossOrigin = '';
    img.src = src;
  });
};

// Image configuration with responsive sizes and descriptions
const imagesWithDesc = [
  {
    src: grapesImg,
    desc: "REFRESHING GRAPE JUICE",
    desc1: "Packed with Antioxidants",
    link: "/grapes",
    width: 400,
    height: 300,
  },
  {
    src: pineappleImg,
    desc: "TANGY PINEAPPLE JUICE",
    desc1: "Rich in Vitamin C and Bromelain",
    link: "/pineapple",
    width: 400,
    height: 300,
  },
  {
    src: strawImg,
    desc: "DELICIOUS STRAWBERRY",
    desc1: "Naturally Sweet and Full of Vitamin C",
    link: "/strawberry",
    width: 400,
    height: 300,
  },
  {
    src: lycheeImg,
    desc: "SWEET LYCHEE JUICE",
    desc1: "Exotic Flavor with a Vitamin Boost",
    link: "/lychee",
    width: 400,
    height: 300,
  },
  {
    src: mangoImg,
    desc: "TROPICAL MANGO JUICE",
    desc1: "Pure Mango Goodness and Vitamin C",
    link: "/mango",
    width: 400,
    height: 300,
  },
];

// Loading placeholder component
const LoadingPlaceholder = () => (
  <div className="animate-pulse bg-gray-200 w-full h-60 rounded"></div>
);

// Custom image component with blur-up loading and fixed attributes
const OptimizedImage = ({ src, alt, className, loadingPriority = "eager", width, height, fetchPriority = "high" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);

  useEffect(() => {
    // Create hidden image to preload
    const img = new Image();
    img.crossOrigin = '';
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
      setTimeout(() => setIsBlurred(false), 10); // Small delay for smoother transition
    };
    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {isBlurred && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded"></div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        loading={loadingPriority}
        fetchpriority={fetchPriority.toLowerCase()} // lowercase to fix React warning
        width={width}
        height={height}
        decoding="async"
        style={{ 
          transition: 'opacity 0.3s, filter 0.3s',
          filter: isBlurred ? 'blur(10px)' : 'blur(0)'
        }}
      />
    </div>
  );
};

// Define font style to be used consistently throughout the component
const comicSansStyle = {
  fontFamily:
    '"Comic Sans MS", "Comic Sans", "Chalkboard SE", "TSCu_Comic", cursive',
  fontSize: "1.2rem", // Increased base font size
};

const Body = () => {
  const navigate = useNavigate();
  const scrollRef = React.useRef(null);
  const [isVisible, setIsVisible] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Initialize and preload images immediately
  useEffect(() => {
    // Run both preloading techniques
    preloadImagesInHead();
    preloadImages();

    // Add inline <link> tags directly to document head (alternative approach)
    const style = document.createElement('style');
    style.textContent = `
      img {
        content-visibility: auto;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Remove IntersectionObserver if we're eagerly loading all images
  // Instead always render all images immediately
  const allVisible = imagesWithDesc.reduce((acc, _, index) => {
    acc[`desktop-card-${index}`] = true;
    acc[`desktop-card-${index + 3}`] = true;
    acc[`mobile-card-${index}`] = true;
    acc['banner-image'] = true;
    return acc;
  }, {});

  useEffect(() => {
    setIsVisible(allVisible);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full bg-yellow-400 p-0 overflow-y-auto"
      style={comicSansStyle}
    >
      <br />
      <br />

      {/* Desktop View: Hero image followed by text */}
      <div className="hidden sm:block w-full h-auto shadow-lg transition-transform duration-300 hover:scale-105">
        <OptimizedImage
          src={all}
          alt="Soft Front"
          className="w-full h-auto"
          loadingPriority="eager"
          width={1200}
          height={600}
          fetchPriority="high"
        />  
      </div>

      {/* Mobile View: Text first, then hero image */}
      <div className="sm:hidden w-full max-w-4xl text-center my-0 px-0">
        <div className="relative">
          <OptimizedImage
            src={valley}
            alt="valley"
            className="w-[101%] h-[230px] mx-0 mb-0 object-fill"
            loadingPriority="eager"
            width={500}
            height={230}
            fetchPriority="high"
          />
        </div>
        <h1
          className="text-2xl font-bold text-[#015c01] -mt-28 mb-2"
          style={{ ...comicSansStyle, fontSize: "1.8rem" }}
        >
          Taste the Difference
        </h1>
        <p
          className="text-lg text-[#015c01] leading-relaxed"
          style={{ ...comicSansStyle, fontSize: "1.2rem" }}
        >
          At TooMore, we believe nature holds the secret to the best flavors.
          Our juices are crafted from hand-picked fruits, free from additives.
          Every sip delivers pure, refreshing goodness straight from orchard to
          glass.
        </p>
        <br />
        <button
          onClick={() => navigate("/cart")}
          className="mt-4 bg-[#015c01] text-white px-6 py-2 rounded-full hover:bg-[#013b01] transition-colors duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          style={{ ...comicSansStyle, fontSize: "1.1rem" }}
        >
          View Products
        </button>
        <br />
        <br />
      </div>

      {/* Mobile View: Hero image */}
      <div className="sm:hidden w-full h-auto shadow-xl rounded-lg mx-2 mb-5 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <OptimizedImage
          src={all}
          alt="Soft Front"
          className="w-full h-auto"
          loadingPriority="eager"
          width={500}
          height={300}
          fetchPriority="high"
        />
      </div>
      <br />
      <br />
      <br />

      {/* Desktop View: Text section */}
      <div className="hidden sm:block w-full max-w-4xl text-center my-10 px-4">
        <h1
          className="text-3xl font-bold text-[#015c01] mb-3"
          style={{ ...comicSansStyle, fontSize: "2rem" }}
        >
          Taste the Difference
        </h1>
        <p
          className="text-xl text-[#015c01] leading-relaxed"
          style={{ ...comicSansStyle, fontSize: "1.4rem" }}
        >
          At TooMore, we believe nature holds the secret to the best flavors.
          Our juices are crafted from hand-picked fruits, free from additives.
          Every sip delivers pure, refreshing goodness straight from orchard to
          glass.
        </p>
        <br />

        <button
          onClick={() => navigate("/cart")}
          className="mt-4 bg-[#015c01] text-white px-6 py-2 rounded-full hover:bg-[#013b01] transition-colors duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          style={{ ...comicSansStyle, fontSize: "1.1rem" }}
        >
          View Products
        </button>
      </div>
      <br />
      <br />
      <br />

      {/* Render Slideshow directly instead of using Suspense */}
      <Slideshow />

      <div className="w-full max-w-4xl text-center my-10 px-4">
        <h1
          className="text-2xl font-bold text-[#015c01] mb-3"
          style={{ ...comicSansStyle, fontSize: "1.8rem" }}
        >
          Ultimate Juice Experience
        </h1>
        <p
          className="text-lg text-[#015c01] leading-relaxed"
          style={{ ...comicSansStyle, fontSize: "1.3rem" }}
        >
          We select the freshest, sun-ripened fruits at their peak. From orchard
          to bottle, every sip is a celebration of flavor and nutrition.
        </p>
        <button
          className="mt-4 bg-[#015c01] text-white px-6 py-2 rounded-full hover:bg-[#013b01] transition-colors duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          onClick={() => navigate("/Juices")}
        >
          EXPLORE OUR JUICES
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex justify-center gap-10 p-5 flex-wrap">
        {imagesWithDesc.slice(0, 3).map((image, index) => (
          <div
            key={index}
            id={`desktop-card-${index}`}
            className="w-72 text-center bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => image.link && navigate(image.link)}
            style={{ cursor: image.link ? "pointer" : "default" }}
          >
            <div className="relative aspect-w-4 aspect-h-3">
              <OptimizedImage
                src={image.src}
                alt={image.desc}
                className="w-full h-auto rounded-t-lg"
                width={image.width}
                height={image.height}
                loadingPriority="eager"
                fetchPriority="high"
              />
            </div>
            <p
              className="mt-3 text-base text-[#015c01] font-light"
              style={{ ...comicSansStyle, fontSize: "1rem" }}
            >
              {image.desc}
            </p>
            <h3
              className="mt-1 text-lg text-[#015c01] font-bold"
              style={{ ...comicSansStyle, fontSize: "1.2rem" }}
            >
              {image.desc1}
            </h3>
          </div>
        ))}
      </div>
      <div className="hidden sm:flex justify-center gap-10 p-5 flex-wrap">
        {imagesWithDesc.slice(3, 5).map((image, index) => (
          <div
            key={index}
            id={`desktop-card-${index + 3}`}
            className="w-72 text-center bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => image.link && navigate(image.link)}
            style={{ cursor: image.link ? "pointer" : "default" }}
          >
            <div className="relative aspect-w-4 aspect-h-3">
              <OptimizedImage
                src={image.src}
                alt={image.desc}
                className="w-full h-auto rounded-t-lg"
                width={image.width}
                height={image.height}
                loadingPriority="eager"
                fetchPriority="high"
              />
            </div>
            <p
              className="mt-3 text-base text-[#015c01] font-light"
              style={{ ...comicSansStyle, fontSize: "1rem" }}
            >
              {image.desc}
            </p>
            <h3
              className="mt-1 text-lg text-[#015c01] font-bold"
              style={{ ...comicSansStyle, fontSize: "1.2rem" }}
            >
              {image.desc1}
            </h3>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="sm:hidden w-full overflow-x-scroll scroll-smooth snap-x snap-mandatory px-4 py-2 my-4">
        <h2
          className="text-xl font-bold text-[#015c01] mb-3 text-center"
          style={{ ...comicSansStyle, fontSize: "1.5rem" }}
        >
          Our Flavors
        </h2>
        <div
          ref={scrollRef}
          className="flex gap-4 p-3 flex-nowrap justify-start"
        >
          {imagesWithDesc.map((image, index) => (
            <div
              key={index}
              id={`mobile-card-${index}`}
              className="flex flex-col items-center min-w-[85%] bg-white rounded-lg overflow-hidden shadow-lg snap-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => image.link && navigate(image.link)}
              style={{ cursor: image.link ? "pointer" : "default" }}
            >
              <div className="relative w-full aspect-w-4 aspect-h-3">
                <OptimizedImage
                  src={image.src}
                  alt={image.desc}
                  className="w-full h-auto rounded-t-lg"
                  loadingPriority="eager"
                  width={image.width}
                  height={image.height}
                  fetchPriority="high"
                />
              </div>
              <div className="p-3 text-center">
                <h3
                  className="text-lg text-[#015c01] font-bold"
                  style={{ ...comicSansStyle, fontSize: "1.2rem" }}
                >
                  {image.desc1}
                </h3>
                <p
                  className="mt-1 text-base text-[#015c01]"
                  style={{ ...comicSansStyle, fontSize: "1rem" }}
                >
                  {image.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-2">
          <div className="flex space-x-2">
            {imagesWithDesc.map((_, index) => (
              <div
                key={index}
                className="h-2 w-2 rounded-full bg-[#015c01]"
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl text-center my-10">
        <h1
          className="text-3xl font-bold text-[#015c01] mb-3"
          style={{ ...comicSansStyle, fontSize: "2rem" }}
        >
          Best Juice Collection
        </h1>
        <p
          className="text-xl text-[#015c01] leading-relaxed"
          style={{ ...comicSansStyle, fontSize: "1.4rem" }}
        >
          We're hand-picking oranges at their peak, squeezing them within 24
          hours, and bringing that delicious juice to fridges everywhere.
        </p>
        <button
          className="mt-4 bg-[#015c01] text-white px-6 py-2 rounded-full hover:bg-[#013b01] transition-colors duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          onClick={() => navigate("/our-story")}
        >
          OUR STORY
        </button>
      </div>
      <div
        id="banner-image"
        className="w-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
      >
        <OptimizedImage
          src={end}
          alt="Soft Front"
          className="w-full h-auto"
          loadingPriority="eager" 
          width={1200}
          height={500}
          fetchPriority="high"
        />
      </div>
    </div>
  );
};

export default Body;
