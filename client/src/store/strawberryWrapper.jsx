import React, { useState, useEffect } from "react";
import Strawberry from "./strawberry";
import StrawberryM from "./strawberryM";

const StrawberryWrapper = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <StrawberryM /> : <Strawberry />;
};

export default StrawberryWrapper;