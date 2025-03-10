import React, { useState, useEffect } from "react";
import Pineapple from "./pineapple";
import PineappleM from "./pineappleM";

const PineappleWrapper= () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <PineappleM /> : <Pineapple />;
};  

export default PineappleWrapper;
