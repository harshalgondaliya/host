import React, { Suspense, lazy, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Lazy load the Slideshow component
const Slideshow = lazy(() => import("./Slideshow"));

// Importing card image
import all from "../assets/images/bg.webp";

// showpiece image
import end from "../assets/images/Too more banner.webp";

// Importing images with descriptions
import grapesImg from "../assets/images/Grapes_Story.webp";
import pineappleImg from "../assets/images/Pineapple_Story.webp";
import strawImg from "../assets/images/Strawberry_Story.webp";
import lycheeImg from "../assets/images/Lychee_Story.webp";
import mangoImg from "../assets/images/Mango_Story.webp";

// Use smaller images for mobile devices when available
import grapesMobile from "../assets/images/GrapesMo.webp";
import pineappleMobile from "../assets/images/PineappleMo.webp";
import strawMobile from "../assets/images/StrawberryMo.webp";
import lycheeMobile from "../assets/images/LycheeMo.webp";
import mangoMobile from "../assets/images/MangoMo.webp";

// const images = [image1, image2, image3, image4, image5, image6];

// Loading placeholder component
const LoadingPlaceholder = () => (
  <div className="animate-pulse bg-gray-200 w-full h-60 rounded"></div>
);

// Images with descriptions
const imagesWithDesc = [
  {
    src: grapesImg,
    mobileSrc: grapesMobile,
    desc: "REFRESHING GRAPE JUICE",
    desc1: "Packed with Antioxidants",
    link: "/grapes",
  },
  {
    src: pineappleImg,
    mobileSrc: pineappleMobile,
    desc: "TANGY PINEAPPLE JUICE",
    desc1: "Rich in Vitamin C and Bromelain",
    link: "/pineapple",
  },
  {
    src: strawImg,
    mobileSrc: strawMobile,
    desc: "DELICIOUS STRAWBERRY JUICE",
    desc1: "Naturally Sweet and Full of Vitamin C",
    link: "/strawberry",
  },
  {
    src: lycheeImg,
    mobileSrc: lycheeMobile,
    desc: "SWEET LYCHEE JUICE",
    desc1: "Exotic Flavor with a Vitamin Boost",
    link: "/lychee",
  },
  {
    src: mangoImg,
    mobileSrc: mangoMobile,
    desc: "TROPICAL MANGO JUICE",
    desc1: "Zero Sugar, Pure Mango Goodness",
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

const Body = () => {
  const navigate = useNavigate();
  const scrollRef = React.useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Set up Intersection Observer to detect when elements are in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    // Observe all image containers
    document.querySelectorAll('.lazy-container').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-yellow-400 p-0 overflow-y-auto">
      <br />
      <br />
      
      <div id="hero-image" className="w-full h-auto shadow-lg transition-transform duration-300 hover:scale-105">
        <LazyLoadImage
          alt="Soft Front"
          src={all}
          effect="blur"
          className="w-full h-auto"
          threshold={200}
          placeholder={<LoadingPlaceholder />}
        />
      </div>

      <div className="w-full max-w-4xl text-center my-10 px-4">
        <h1
          className="text-2xl font-bold text-[#015c01] mb-3"
          style={{ fontFamily: '"Comic Sans MS", cursive' }}
        >
          Taste the Difference of Juice Made Right
        </h1>
        <p
          className="text-base text-[#015c01] leading-relaxed"
          style={{ fontFamily: '"Comic Sans MS", cursive' }}
        >
          At TooMore, we believe nature holds the secret to the best flavors and
          nutrition. Our juices are crafted from hand-picked fruits, free from
          artificial additives and preservatives. Every sip delivers pure,
          refreshing goodness straight from the orchard to your glass.
          Experience the vibrant taste of TooMore—where quality meets freshness.
          juices are crafted from hand-picked fruits, free from artificial
          additives and preservatives. Every sip delivers pure, refreshing
          goodness straight from the orchard to your glass.
        </p>
      </div>

      <Suspense fallback={<LoadingPlaceholder />}>
        <Slideshow />
      </Suspense>
      
      <div className="w-full max-w-4xl text-center my-10 px-4">
        <h1
          className="text-xl font-bold text-[#015c01] mb-3"
          style={{ fontFamily: '"Comic Sans MS", cursive' }}
        >
          Discover the Ultimate Juice Experience
        </h1>
        <p
          className="text-sm text-[#015c01] leading-relaxed"
          style={{ fontFamily: '"Comic Sans MS", cursive' }}
        >
          For decades, we've been crafting the finest juices by selecting the
          freshest, sun-ripened fruits at their peak. From orchard to bottle,
          every sip is a celebration of flavor, nutrition, and care. Experience
          the vibrant taste that's been delighting generations—pure, refreshing,
          and unforgettable.
        </p>
        <button
          className="mt-4 px-4 py-1 border-2 border-[#015c01] text-[#015c01] rounded-full transition-colors duration-300 hover:bg-[#046930] hover:text-yellow-400"
          style={{ fontFamily: '"Comic Sans MS", cursive' }}
          onClick={() => navigate("/Juices")}
        >
          EXPLORE OUR JUICE COLLECTION
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex justify-center gap-10 p-5 flex-wrap">
        {imagesWithDesc.slice(0, 3).map((image, index) => (
          <div
            key={index}
            id={`desktop-card-${index}`}
            className="w-72 text-center bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => image.link && navigate(image.link)}
            style={{ cursor: image.link ? "pointer" : "default" }}
          >
            <LazyLoadImage
              alt={image.desc}
              src={image.src}
              effect="blur"
              className="w-full h-auto rounded-t-lg"
              threshold={200}
              placeholder={<LoadingPlaceholder />}
            />
            <p className="mt-3 text-base text-[#015c01] font-light">
              {image.desc}
            </p>
            <h3 className="mt-1 text-lg text-[#015c01] font-bold">
              {image.desc1}
            </h3>
          </div>
        ))}
      </div>
      <div className="hidden sm:flex justify-center gap-10 p-5 flex-wrap">
        {imagesWithDesc.slice(3, 5).map((image, index) => (
          <div
            key={index}
            id={`desktop-card-${index+3}`}
            className="w-72 text-center bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => image.link && navigate(image.link)}
            style={{ cursor: image.link ? "pointer" : "default" }}
          >
            <LazyLoadImage
              alt={image.desc}
              src={image.src}
              effect="blur"
              className="w-full h-auto rounded-t-lg"
              threshold={200}
              placeholder={<LoadingPlaceholder />}
            />
            <p className="mt-3 text-base text-[#015c01] font-light">
              {image.desc}
            </p>
            <h3 className="mt-1 text-lg text-[#015c01] font-bold">
              {image.desc1}
            </h3>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="sm:hidden w-full overflow-x-scroll scroll-smooth snap-x snap-mandatory px-6">
        <div
          ref={scrollRef}
          className="flex gap-5 p-5 flex-nowrap justify-start"
        >
          {imagesWithDesc.map((image, index) => (
            <div
              key={index}
              id={`mobile-card-${index}`}
              className="flex flex-col items-center min-w-[90%] md:min-w-[50%] bg-white rounded-lg overflow-hidden shadow-md snap-center transition-transform duration-300 hover:scale-105"
              onClick={() => image.link && navigate(image.link)}
              style={{ cursor: image.link ? "pointer" : "default" }}
            >
              <LazyLoadImage
                alt={image.desc}
                src={image.mobileSrc || image.src}
                effect="blur"
                className="w-full h-auto rounded-t-sm"
                threshold={100}
                placeholder={<LoadingPlaceholder />}
              />
              <div className="p-2 text-center">
                <h3 className="text-lg text-[#015c01] font-bold">
                  {image.desc1}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{image.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl text-center my-10">
        <h1
          className="text-2xl font-bold text-[#015c01] mb-3"
          style={{ fontFamily: '"Comic Sans MS", cursive' }}
        >
          Best Juice Flavour Collection
        </h1>
        <p
          className="text-base text-[#015c01] leading-relaxed"
          style={{ fontFamily: '"Comic Sans MS", cursive' }}
        >
          Sure, Tropicana may not have invented orange juice, but in 1954, we
          found a way to bring fresh-tasting OJ to everyone. And to this day,
          we're still hand-picking oranges at their peak, squeezing them within
          24 hours, and bringing that delicious juice to fridges everywhere.
        </p>
        <button
          className="mt-4 px-4 py-1 border-2 border-[#015c01] text-[#015c01] rounded-full transition-colors duration-300 hover:bg-[#046930] hover:text-yellow-400"
          style={{ fontFamily: '"Comic Sans MS", cursive' }}
          onClick={() => navigate("/our-story")}
        >
          OUR STORY
        </button>
      </div>
      <div id="banner-image" className="w-full shadow-lg">
        <LazyLoadImage
          alt="Too More Banner"
          src={end}
          effect="blur"
          className="w-full h-auto"
          threshold={200}
          placeholder={<LoadingPlaceholder />}
        />
      </div>
    </div>
  );
};

export default Body;
