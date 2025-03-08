import React, { useState, useEffect } from "react";
import ShoppingCartPage from "./ShoppingCartPage";
import ShoppingCartMobile from "./ShoppingCartMobile";

const ShoppingCartWrapper = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <ShoppingCartMobile /> : <ShoppingCartPage />;
};

export default ShoppingCartWrapper;
