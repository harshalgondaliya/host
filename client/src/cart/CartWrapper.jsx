import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import CartM from "./CartM";

const CartWrapper = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <CartM /> : <Cart />;
};

export default CartWrapper;
