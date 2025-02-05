import React from "react";
import Slideshow from "./Slideshow";
import { useNavigate } from "react-router-dom";

// Importing card image
import Grapes_Card from "../assets/images/front.webp";

// showpiece image
import softFrontImage from "../assets/images/soft_front.jpg";

// Importing images with descriptions
import grapesImg from "../assets/all_juice/grapes_img_page-0001.jpg";
import pineappleImg from "../assets/all_juice/pineapple_img.jpg";
import strawImg from "../assets/all_juice/straw_img_page-0001.jpg";
import lycheeImg from "../assets/all_juice/lychee_img_page-0001.jpg";
import mangoImg from "../assets/all_juice/mango_img_page-0001.jpg";

// const images = [image1, image2, image3, image4, image5, image6];

// Images with descriptions
const imagesWithDesc = [
  {
    src: grapesImg,
    desc: "REFRESHING GRAPE JUICE",
    desc1: "Packed with Antioxidants",
  },
  {
    src: pineappleImg,
    desc: "TANGY PINEAPPLE JUICE",
    desc1: "Rich in Vitamin C and Bromelain",
  },
  {
    src: strawImg,
    desc: "DELICIOUS STRAWBERRY JUICE",
    desc1: "Naturally Sweet and Full of Vitamin C",
  },
  {
    src: lycheeImg,
    desc: "SWEET LYCHEE JUICE",
    desc1: "Exotic Flavor with a Vitamin Boost",
  },
  {
    src: mangoImg,
    desc: "TROPICAL MANGO JUICE",
    desc1: "Zero Sugar, Pure Mango Goodness",
  },
];


const Body = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-yellow-400 p-0 overflow-y-auto">
      <br />
      <div className="w-full h-auto shadow-lg">
        <img src={Grapes_Card} alt="Soft Front" className="w-full h-auto" />
      </div>

      <br /><br /><br /><br /><br />

      <Slideshow />

      <div className="w-full max-w-4xl text-center my-10">
        <h1
          className="text-2xl font-bold text-[#015c01] mb-3"
          style={{ fontFamily: '"Comic Sans MS", cursive' }}
        >
          Discover the Ultimate Juice Experience
        </h1>
        <p
          className="text-base text-[#015c01] leading-relaxed"
          style={{ fontFamily: '"Comic Sans MS", cursive' }}
        >
          For decades, we've been crafting the finest juices by selecting the
          freshest, sun-ripened fruits at their peak. From orchard to bottle,
          every sip is a celebration of flavor, nutrition, and care. Experience
          the vibrant taste that’s been delighting generations—pure, refreshing,
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

      <div className="flex flex-wrap justify-center gap-10 p-5">
        {imagesWithDesc.map((image, index) => (
          <div
            key={index}
            className="w-72 text-center bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            <img
              src={image.src}
              alt={image.desc}
              className="w-full h-auto rounded-t-lg"
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
          we’re still hand-picking oranges at their peak, squeezing them within
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

      <div className="w-full shadow-lg">
        <img src={softFrontImage} alt="Soft Front" className="w-full h-auto" />
      </div>
    </div>
  );
};


export default Body;
