import React, { useState, useEffect } from "react";
import Lychee from "./lychee";
import LycheeM from "./lycheeM";

const LycheeWrapper = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <LycheeM /> : <Lychee />;
};  

export default LycheeWrapper;
