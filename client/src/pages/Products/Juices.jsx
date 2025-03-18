import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCardClick = () => {
    navigate(product.link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* Desktop Layout */}
      <div className="hidden md:flex md:flex-row md:h-[400px]">
        {/* Image section */}
        <div 
          className="relative md:w-2/5 cursor-pointer" 
          onClick={handleCardClick}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-0 right-0 bg-yellow-400 text-green-800 text-sm font-bold px-3 py-1 m-2 rounded">
            {product.sizes.split(":")[1]}
          </div>
        </div>
        
        {/* Content section */}
        <div className="p-6 md:w-3/5 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-4">
            <h2 
              className="text-2xl font-bold text-green-800 cursor-pointer hover:text-green-600 transition-colors"
              onClick={handleCardClick}
            >
              {product.name}
            </h2>
            <button 
              onClick={handleCardClick}
              className="bg-yellow-400 hover:bg-yellow-500 text-green-800 text-sm py-1.5 px-4 rounded-full transition-colors duration-300"
            >
              View Details
            </button>
          </div>
          
          <p className="text-gray-600 text-base mb-4">{product.description}</p>
          
          {/* Nutrition info - always visible */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm">
            <h3 className="font-medium text-green-800 border-b border-yellow-200 pb-1 mb-3 text-lg">Nutrition Facts</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {Object.entries(product.nutrition).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600">
                    {key.startsWith('-') ? key.substring(1) : key}:
                  </span>
                  <span className="text-green-700 font-medium">{value}</span>
                </div>
              ))}
            </div>
            
            <h4 className="font-medium text-green-800 mt-4 border-t border-yellow-200 pt-2">Ingredients:</h4>
            <p className="text-gray-600 text-xs">{product.ingredients}</p>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h2 className="text-white text-xl font-bold">{product.name}</h2>
            <span className="text-yellow-400 text-sm">{product.sizes}</span>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-3">{product.description}</p>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-green-800 font-medium text-sm">Nutrition Facts</span>
            <button 
              onClick={handleCardClick}
              className="bg-yellow-400 hover:bg-yellow-500 text-green-800 text-xs py-1.5 px-4 rounded-full transition-colors duration-300"
            >
              View Details
            </button>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-xs">
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-2">
              {Object.entries(product.nutrition).slice(0, 6).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600">
                    {key.startsWith('-') ? key.substring(1) : key}:
                  </span>
                  <span className="text-green-700 font-medium">{value}</span>
                </div>
              ))}
            </div>
            
            <details>
              <summary className="text-green-800 font-medium cursor-pointer">Ingredients</summary>
              <p className="mt-1 text-gray-600 text-xs leading-tight">{product.ingredients}</p>
            </details>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Juice = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = ["all", "Berry", "Tropical", "Premium"];
  
  const getCategoryProducts = (category) => {
    switch(category) {
      case "all":
        return juiceProducts;
      case "Berry":
        return juiceProducts.filter(p => 
          p.name.includes("Berry") || 
          p.name.includes("Strawberry") ||
          p.description.toLowerCase().includes("berry")
        );
      case "Tropical":
        return juiceProducts.filter(p => 
          p.name.includes("Mango") || 
          p.name.includes("Pineapple") ||
          p.description.toLowerCase().includes("tropical")
        );
      case "Premium":
        return juiceProducts.filter(p => 
          p.name.includes("Pomegranate") || 
          p.name.includes("Lychee") ||
          p.description.toLowerCase().includes("premium") ||
          p.description.toLowerCase().includes("antioxidants")
        );
      default:
        return juiceProducts;
    }
  };
  
  const filteredProducts = getCategoryProducts(activeCategory);

  return (
    <>
      <Navbar />
      <div className="bg-yellow-400 min-h-screen">
        {/* Header section */}
        <div className="bg-yellow-400 py-7 mb-6">
          <div className="container mx-auto px-4">
            <br /><br /><br />
            <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800">
              Our Premium Juices
            </h1>
            <p className="text-center text-green-700 mt-2 max-w-2xl mx-auto">
              Discover our range of refreshing, all-natural juices made from the finest ingredients
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-10">
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-green-900 text-yellow-400 shadow border border-green-900"
                    : "bg-white text-green-900 hover:bg-yellow-100 border border-green-900"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Products list */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-auto max-w-6xl">
            {filteredProducts.slice(0, visibleProducts).map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </div>
          
          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <h3 className="text-xl text-green-800 font-bold">No juices found in this category</h3>
              <p className="text-green-700 mt-2">Try selecting a different category</p>
            </div>
          )}
          
          {/* Load more button */}
          {visibleProducts < filteredProducts.length && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleProducts((prev) => prev + 4)}
                className="px-7 py-2.5 bg-green-900 text-yellow-400 rounded-full hover:bg-green-800 transition-colors duration-300 inline-flex items-center shadow-md"
              >
                <span>Load More</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Juice;
