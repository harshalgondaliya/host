import React, { useState, useEffect } from "react";
import Skyberry from "./skyberry";
import SkyberryM from "./skyberryM";

const SkyberryWrapper = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <SkyberryM /> : <Skyberry />;
};

export default SkyberryWrapper;
