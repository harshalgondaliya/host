import React, { useState, useEffect } from "react";
import Pomegranate from "./pomegranate";
import PomegranateM from "./pomegranateM";

const PomegranateWrapper = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <PomegranateM /> : <Pomegranate />;
};

export default PomegranateWrapper;
