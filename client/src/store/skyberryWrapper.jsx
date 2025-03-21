import React, { useState, useEffect } from "react";
import Skyberry from "./skyberry";
import SkyberryM from "./skyberryM";
import SEO from "../components/SEO";

const SkyberryWrapper = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Product-specific schema data
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Skyberry Juice",
    "image": "https://www.toomorebeverages.in/src/assets/images/skyberry.webp",
    "description": "Premium Skyberry juice made from fresh, hand-picked fruits. Rich in antioxidants and vitamins.",
    "brand": {
      "@type": "Brand",
      "name": "Too More"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.toomorebeverages.in/skyberry",
      "priceCurrency": "INR",
      "price": "4.99",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Too More Beverages",
        "telephone": "+918780499433"
      }
    }
  };

  return (
    <>
      <SEO 
        title="Skyberry Juice"
        description="Experience the unique taste of Skyberry juice. Made from premium berries, our Skyberry juice is rich in antioxidants and provides a refreshing taste with every sip."
        image="/src/assets/images/skyberry.webp"
        type="product"
        schemaData={productSchema}
      />
      {isMobile ? <SkyberryM /> : <Skyberry />}
    </>
  );
};

export default SkyberryWrapper;
