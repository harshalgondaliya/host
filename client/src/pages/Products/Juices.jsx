import React, { useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

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
    sizes: "Bottles: 150ml , 250 ml",
    link : "/grapes",
    nutrition: {
      energy: "50.4kcal",
      protein: "0.32g",
      carbohydrates: "12.6g",
      "-Total Sugar": "12.4g",
      "-Added Sugars": "11.7g",
      fat: "40g",
      sodium: "33.5mg",
    },
    ingredients:
      "Grapes Juice, Concentrate ( 5% ), Water, Nata De Coco ( 8% ), Coconut Water ( 5% ), Sugar And Acidity Regulator ( 330 ) etc...",
  },
  {
    image: lycheeImage,
    name: "Lychee Juice",
    description: "Exotic lychee juice with a sweet and floral flavor.",
    sizes: "Bottles: 150ml , 250 ml",
    link : "/lychee",
    nutrition: {
      energy: "50.4kcal",
      protein: "0.32g",
      carbohydrates: "12.6g",
      "-Total Sugar": "12.4g",
      "-Added Sugars": "11.7g",
      fat: "40g",
      sodium: "33.5mg",
    },
    ingredients:
      "Lychee Juice, Concentrate ( 5% ), Water, Nata De Coco ( 8% ), Coconut Water ( 5% ), Sugar And Acidity Regulator ( 330 ) etc...",
  },
  {
    image: mangoImage,
    name: "Mango Juice",
    description: "Tropical mango juice with zero added sugar.",
    sizes: "Bottles: 150ml , 250 ml",
    link : "/mango",
    nutrition: {
      energy: "50.4kcal",
      protein: "0.32g",
      carbohydrates: "12.6g",
      "-Total Sugar": "12.4g",
      "-Added Sugars": "11.7g",
      fat: "40g",
      sodium: "33.5mg",
    },
    ingredients:
      "Mango Juice, Concentrate ( 5% ), Water, Nata De Coco ( 8% ), Coconut Water ( 5% ), Sugar And Acidity Regulator ( 330 ) etc...",
  },
  {
    image: pineappleImage,
    name: "Pineapple Juice",
    description: "Tangy pineapple juice rich in vitamin C and bromelain.",
    sizes: "Bottles: 150ml , 250 ml",
    link : "/pineapple",
    nutrition: {
      energy: "50.4kcal",
      protein: "0.32g",
      carbohydrates: "12.6g",
      "-Total Sugar": "12.4g",
      "-Added Sugars": "11.7g",
      fat: "40g",
      sodium: "33.5mg",
    },
    ingredients:
      "Pineapple Juice, Concentrate ( 5% ), Water, Nata De Coco ( 8% ), Coconut Water ( 5% ), Sugar And Acidity Regulator ( 330 ) etc...",
  },
  {
    image: strawberryImage,
    name: "Strawberry Juice",
    description:
      "Sweet and tangy strawberry juice made from fresh strawberries.",
    sizes: "Bottles: 150ml , 250 ml",
    link : "/strawberry",
    nutrition: {
      energy: "50.4kcal",
      protein: "0.32g",
      carbohydrates: "12.6g",
      "-Total Sugar": "12.4g",
      "-Added Sugars": "11.7g",
      fat: "40g",
      sodium: "33.5mg",
    },
    ingredients:
      "Strawberry Juice, Concentrate ( 5% ), Water, Nata De Coco ( 8% ), Coconut Water ( 5% ), Sugar And Acidity Regulator ( 330 ) etc...",
  },
  {
    image: skyberryImage,
    name: "SkyBerry Juice",
    description: "Unique SkyBerry juice with a blend of berries.",
    sizes: "Bottles: 150ml , 250 ml",
    link : "/skyberry",
    nutrition: {
      energy: "50.4kcal",
      protein: "0.32g",
      carbohydrates: "12.6g",
      "-Total Sugar": "12.4g",
      "-Added Sugars": "11.7g",
      fat: "40g",
      sodium: "33.5mg",
    },
    ingredients:
      "SkyBerry Juice, Concentrate ( 5% ), Water, Nata De Coco ( 8% ), Coconut Water ( 5% ), Sugar And Acidity Regulator ( 330 ) etc...",
  },
  {
    image: pomegranateImage,
    name: "Pomegranate Juice",
    description: "Rich and flavorful pomegranate juice full of antioxidants.",
    sizes: "Bottles: 150ml , 250 ml",
    link : "/pomegranate",
    nutrition: {
      energy: "50.4kcal",
      protein: "0.32g",
      carbohydrates: "12.6g",
      "-Total Sugar": "12.4g",
      "-Added Sugars": "11.7g",
      fat: "40g",
      sodium: "33.5mg",
    },
    ingredients:
      "Pomogranate Juice, Concentrate ( 5% ), Water, Nata De Coco ( 8% ), Coconut Water ( 5% ), Sugar And Acidity Regulator ( 330 ) etc...",
  },
];

const ProductCardDesktop = ({ product, zoom, origin, toggleZoom, index }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(product.link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.5,
        delay: index * 0.1
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-700 flex flex-row cursor-pointer"
      onClick={handleCardClick}
    >
      <motion.img
        src={product.image}
        alt={product.name}
        className="w-1/3 object-cover aspect-[4/3] transition-transform duration-500 cursor-zoom-in"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: origin,
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: zoom === 1 ? "zoom-in" : "zoom-out",
        }}
        whileHover={{ scale: 1.05 }}
        onClick={(e) => {
          e.stopPropagation();
          toggleZoom(e);
        }}
        loading="lazy"
      />
      <div className="p-5 w-2/3">
        <h2 className="text-2xl font-bold text-red-500 mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-gray-800 font-semibold mb-2">
          Sizes: {product.sizes}
        </p>
        <div className="bg-sky-150 p-3 rounded-lg">
          <h3 className="text-green-600 font-semibold">
            Nutritional Information (per 150ml)
          </h3>
          {Object.entries(product.nutrition).map(([key, value]) => (
            <div key={key} className="flex justify-between mb-1">
              <p className="text-gray-700 font-semibold">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </p>
              <p className="text-gray-700">{value}</p>
            </div>
          ))}
          <h4 className="font-semibold mt-2">Ingredients</h4>
          <p className="text-gray-700">{product.ingredients}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ProductCardMobile = ({ product, zoom, origin, toggleZoom, index }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(product.link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.5,
        delay: index * 0.1
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col sm:flex-row cursor-pointer"
      onClick={handleCardClick}
    >
      <motion.div className="w-full sm:w-1/2">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-cover transition-transform duration-500 cursor-pointer"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: origin,
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: zoom === 1 ? "zoom-in" : "zoom-out",
          }}
          whileHover={{ scale: 1.05 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom(e);
          }}
          loading="lazy"
        />
      </motion.div>
      <div className="p-5 w-full sm:w-1/2 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-red-500 mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2 text-base">{product.description}</p>
        <p className="text-gray-800 font-semibold mb-2 text-base">
          Sizes: {product.sizes}
        </p>
        <div className="bg-gray-150 p-3 rounded-lg">
          <h3 className="text-green-600 font-semibold text-base">
            Nutritional Information (per 150ml)
          </h3>
          {Object.entries(product.nutrition).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between text-gray-700 text-sm"
            >
              <span className="font-medium">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </span>
              <span>{value}</span>
            </div>
          ))}
          <h4 className="font-semibold mt-2 text-base">Ingredients</h4>
          <p className="text-gray-700 text-sm">{product.ingredients}</p>
        </div>
      </div>
    </motion.div>
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
      const x = ((e.clientX - rect.left) / rect.width) * 150;
      const y = ((e.clientY - rect.top) / rect.height) * 150;
      setOrigin(`${x}% ${y}%`);
      setZoom(6);
    } else {
      setZoom(1);
    }
  };

  return isMobile ? (
    <ProductCardMobile
      product={product}
      zoom={zoom}
      origin={origin}
      toggleZoom={toggleZoom}
    />
  ) : (
    <ProductCardDesktop
      product={product}
      zoom={zoom}
      origin={origin}
      toggleZoom={toggleZoom}
    />
  );
};

const Juice = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [visibleProducts, setVisibleProducts] = useState(3);

  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center bg-yellow-400 min-h-screen p-6 sm:p-4"
      >
        <br />
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-6 max-w-8xl w-full">
          {juiceProducts.slice(0, visibleProducts).map((product, index) => (
            <ProductCard key={index} product={product} index={index} />
          ))}
        </div>
        {visibleProducts < juiceProducts.length && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setVisibleProducts((prev) => prev + 3)}
            className="mt-4 px-6 py-2 bg-green-950 text-yellow-400 rounded-lg hover:bg-green-950 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 sm:px-4 sm:py-1 sm:text-sm"
          >
            Load More
          </motion.button>
        )}
        <br />
        <br />
      </motion.div>
      <Footer />
    </>
  );
};

export default Juice;
