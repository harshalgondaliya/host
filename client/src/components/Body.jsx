import React, { Suspense, lazy, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Lazy load the Slideshow component
const Slideshow = lazy(() => import("./Slideshow"));

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

// const images = [image1, image2, image3, image4, image5, image6];

// Loading placeholder component
const LoadingPlaceholder = () => (
  <div className="animate-pulse bg-gray-200 w-full h-60 rounded"></div>
);

// Images with descriptions
const imagesWithDesc = [
  {
    src: grapesImg,
    desc: "REFRESHING GRAPE JUICE",
    desc1: "Packed with Antioxidants",
    link: "/grapes",
  },
  {
    src: pineappleImg,
    desc: "TANGY PINEAPPLE JUICE",
    desc1: "Rich in Vitamin C and Bromelain",
    link: "/pineapple",
  },
  {
    src: strawImg,
    desc: "DELICIOUS STRAWBERRY",
    desc1: "Naturally Sweet and Full of Vitamin C",
    link: "/strawberry",
  },
  {
    src: lycheeImg,
    desc: "SWEET LYCHEE JUICE",
    desc1: "Exotic Flavor with a Vitamin Boost",
    link: "/lychee",
  },
  {
    src: mangoImg,
    desc: "TROPICAL MANGO JUICE",
    desc1: "Pure Mango Goodness and Vitamin C",
    link: "/mango",
  },
];

// Implement a custom hook for lazy loading images
const useImageLoader = (src) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return { isLoaded, imageSrc };
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

  useEffect(() => {
    // Set up Intersection Observer to detect when elements are in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    // Observe all image containers
    document.querySelectorAll(".lazy-container").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Add font-family to the document
  useEffect(() => {
    // Create a style element
    const style = document.createElement("style");
    // Add CSS for custom font loading
    style.textContent = `
      @font-face {
        font-family: 'Comic Sans MS';
        src: local('Comic Sans MS'),
             local('ComicSansMS'),
             local('Comic Sans');
        font-display: swap;
      }
      body {
        font-family: "Comic Sans MS", "Comic Sans", "Chalkboard SE", "TSCu_Comic", cursive;
        font-size: 1.2rem;
      }
    `;
    // Append to the head
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full bg-yellow-400 p-0 overflow-y-auto"
      style={comicSansStyle}
    >
      <br />
      <br />

      {/* Desktop View: Hero image followed by text */}
      <div className="hidden sm:block w-full h-auto shadow-lg transition-transform duration-300 hover:scale-105 lazy-container">
        <img
          src={all}
          alt="Soft Front"
          className="w-full h-auto"
          loading="lazy"
        />  
      </div>

      {/* Mobile View: Text first, then hero image */}
      <div className="sm:hidden w-full max-w-4xl text-center my-0 px-0">
        <img
          src={valley}
          alt="valley"
          className="w-[101%] h-[230px] mx-0 mb-0 object-fill"
        />
        <h1
          className="text-2xl font-bold text-[#015c01] -mt-14 mb-2"
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
        <br /><br />
        <button
          onClick={() => navigate("/cart")}
          className="mt-4 bg-[#015c01] text-white px-6 py-2 rounded-full hover:bg-[#013b01] transition-colors duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          style={{ ...comicSansStyle, fontSize: "1.1rem" }}
        >
          View Products
        </button>
        <br />
        <br />
        <br />
      </div>

      {/* Mobile View: Hero image */}
      <div className="sm:hidden w-full h-auto shadow-xl rounded-lg mx-2 mb-5 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl lazy-container">
        <br />
        <img
          src={all}
          alt="Soft Front"
          className="w-full h-auto"
          loading="lazy"
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

      <Suspense fallback={<LoadingPlaceholder />}>
        <Slideshow />
      </Suspense>

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
          // style={{...comicSansStyle}}
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
            className="w-72 text-center bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl lazy-container"
            onClick={() => image.link && navigate(image.link)}
            style={{ cursor: image.link ? "pointer" : "default" }}
          >
            <img
              src={image.src}
              alt={image.desc}
              className="w-full h-auto rounded-t-lg"
              loading="lazy"
            />
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
            className="w-72 text-center bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl lazy-container"
            onClick={() => image.link && navigate(image.link)}
            style={{ cursor: image.link ? "pointer" : "default" }}
          >
            <img
              src={image.src}
              alt={image.desc}
              className="w-full h-auto rounded-t-lg"
              loading="lazy"
            />
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
              className="flex flex-col items-center min-w-[85%] bg-white rounded-lg overflow-hidden shadow-lg snap-center transition-all duration-300 hover:scale-105 hover:shadow-xl lazy-container"
              onClick={() => image.link && navigate(image.link)}
              style={{ cursor: image.link ? "pointer" : "default" }}
            >
              <img
                src={image.src}
                alt={image.desc}
                className="w-full h-auto rounded-t-lg"
                loading="lazy"
              />
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
          // style={{...comicSansStyle}}
          onClick={() => navigate("/our-story")}
        >
          OUR STORY
        </button>
      </div>
      <div
        id="banner-image"
        className="w-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 lazy-container"
      >
        <img
          src={end}
          alt="Soft Front"
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Body;
