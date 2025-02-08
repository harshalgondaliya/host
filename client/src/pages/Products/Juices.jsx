import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Import images
import grapeImage from "../../assets/images/products/grapes.webp";
import lycheeImage from "../../assets/images/products/lychee.webp";
import mangoImage from "../../assets/images/products/mango.webp";
import pineappleImage from "../../assets/images/products/pineapple.webp";
import strawberryImage from "../../assets/images/products/strawberry.webp";
import skyberryImage from "../../assets/images/products/SkyBerry.webp";
import pomegranateImage from "../../assets/images/products/Pomegranate.webp";

const juiceProducts = [
  {
    image: grapeImage,
    name: "Grape Juice",
    description: "A refreshing grape juice packed with antioxidants.",
    sizes: "Cans: 180 ml, 300 ml | Bottles: 250 ml, 500 ml, 1 L",
    nutrition: {
      energy: "60kcal",
      carbohydrates: "15g",
      sugars: "14g",
      fat: "0g",
      protein: "0g",
      sodium: "10mg",
    },
    ingredients: "Grape Juice, Sugar, Water, Natural Flavors",
  },
  {
    image: lycheeImage,
    name: "Lychee Juice",
    description: "Exotic lychee juice with a sweet and floral flavor.",
    sizes: "Cans: 200 ml, 330 ml | Bottles: 300 ml, 750 ml, 1.5 L",
    nutrition: {
      energy: "65kcal",
      carbohydrates: "16g",
      sugars: "15g",
      fat: "0g",
      protein: "0g",
      sodium: "8mg",
    },
    ingredients: "Lychee Juice, Sugar, Water, Natural Flavors",
  },
  {
    image: mangoImage,
    name: "Mango Juice",
    description: "Tropical mango juice with zero added sugar.",
    sizes: "Cans: 250 ml, 500 ml | Bottles: 400 ml, 1 L, 2 L",
    nutrition: {
      energy: "70kcal",
      carbohydrates: "17g",
      sugars: "16g",
      fat: "0g",
      protein: "0g",
      sodium: "12mg",
    },
    ingredients: "Mango Juice, Water, Natural Flavors",
  },
  {
    image: pineappleImage,
    name: "Pineapple Juice",
    description: "Tangy pineapple juice rich in vitamin C and bromelain.",
    sizes: "Cans: 200 ml, 330 ml | Bottles: 300 ml, 1 L",
    nutrition: {
      energy: "50kcal",
      carbohydrates: "13g",
      sugars: "12g",
      fat: "0g",
      protein: "0g",
      sodium: "5mg",
    },
    ingredients: "Pineapple Juice, Sugar, Water, Natural Flavors",
  },
  {
    image: strawberryImage,
    name: "Strawberry Juice",
    description:
      "Sweet and tangy strawberry juice made from fresh strawberries.",
    sizes: "Cans: 250 ml, 500 ml | Bottles: 300 ml, 1 L",
    nutrition: {
      energy: "55kcal",
      carbohydrates: "14g",
      sugars: "13g",
      fat: "0g",
      protein: "0g",
      sodium: "7mg",
    },
    ingredients: "Strawberry Juice, Sugar, Water, Natural Flavors",
  },
  {
    image: skyberryImage,
    name: "SkyBerry Juice",
    description: "Unique SkyBerry juice with a blend of berries.",
    sizes: "Cans: 200 ml, 330 ml | Bottles: 300 ml, 750 ml",
    nutrition: {
      energy: "60kcal",
      carbohydrates: "15g",
      sugars: "14g",
      fat: "0g",
      protein: "0g",
      sodium: "9mg",
    },
    ingredients: "SkyBerry Juice, Sugar, Water, Natural Flavors",
  },
  {
    image: pomegranateImage,
    name: "Pomegranate Juice",
    description: "Rich and flavorful pomegranate juice full of antioxidants.",
    sizes: "Cans: 250 ml, 500 ml | Bottles: 400 ml, 1 L",
    nutrition: {
      energy: "65kcal",
      carbohydrates: "16g",
      sugars: "15g",
      fat: "0g",
      protein: "0g",
      sodium: "10mg",
    },
    ingredients: "Pomegranate Juice, Sugar, Water, Natural Flavors",
  },
];

const ProductCardDesktop = ({ product, zoom, origin, toggleZoom }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-row">
      <img
        src={product.image}
        alt={product.name}
        className="w-1/3 object-cover aspect-[4/3] transition-transform duration-500 cursor-zoom-in"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: origin,
          transition: "transform 0.4s ease-in-out",
          cursor: zoom === 1 ? "zoom-in" : "zoom-out",
        }}
        onClick={toggleZoom}
        loading="lazy"
      />
      <div className="p-5 w-2/3">
        <h2 className="text-2xl font-bold text-red-500 mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-gray-800 font-semibold mb-2">Sizes: {product.sizes}</p>
        <div className="bg-gray-100 p-3 rounded-lg">
          <h3 className="text-green-600 font-semibold">Nutritional Information (per 100ml)</h3>
          {Object.entries(product.nutrition).map(([key, value]) => (
            <p key={key} className="text-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
            </p>
          ))}
          <h4 className="font-semibold mt-2">Ingredients</h4>
          <p className="text-gray-700">{product.ingredients}</p>
        </div>
      </div>
    </div>
  );
};

const ProductCardMobile = ({ product, zoom, origin, toggleZoom }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col sm:flex-row">
      {/* Image on Left */}
      <div className="w-full sm:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-cover transition-transform duration-500 cursor-pointer"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: origin,
            transition: "transform 0.4s ease-in-out",
            cursor: zoom === 1 ? "zoom-in" : "zoom-out",
          }}
          onClick={toggleZoom}
          loading="lazy"
        />
      </div>

      {/* Description on Right */}
      <div className="p-5 w-full sm:w-1/2 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-red-500 mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2 text-base">{product.description}</p>
        <p className="text-gray-800 font-semibold mb-2 text-base">Sizes: {product.sizes}</p>
        <div className="bg-gray-100 p-3 rounded-lg">
          <h3 className="text-green-600 font-semibold text-base">
            Nutritional Information (per 100ml)
          </h3>
          {Object.entries(product.nutrition).map(([key, value]) => (
            <p key={key} className="text-gray-700 text-sm">
              {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
            </p>
          ))}
          <h4 className="font-semibold mt-2 text-base">Ingredients</h4>
          <p className="text-gray-700 text-sm">{product.ingredients}</p>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState("center center");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleZoom = (e) => {
    if (zoom === 1) {
      const rect = e.target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setOrigin(`${x}% ${y}%`);
      setZoom(6);
    } else {
      setZoom(1);
    }
  };

  return isMobile ? (
    <ProductCardMobile product={product} zoom={zoom} origin={origin} toggleZoom={toggleZoom} />
  ) : (
    <ProductCardDesktop product={product} zoom={zoom} origin={origin} toggleZoom={toggleZoom} />
  );
};

const Juice = () => {
  const [visibleProducts, setVisibleProducts] = useState(3);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-yellow-400 min-h-screen p-6 sm:p-4">
        <br />
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-6 max-w-8xl w-full">
          {juiceProducts.slice(0, visibleProducts).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        {visibleProducts < juiceProducts.length && (
          <button
            onClick={() => setVisibleProducts((prev) => prev + 3)}
            className="mt-4 px-6 py-2 bg-green-950 text-yellow-400 rounded-lg hover:bg-green-950 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 sm:px-4 sm:py-1 sm:text-sm"
          >
            Load More
          </button>
        )}
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
};

export default Juice;
