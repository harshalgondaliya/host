import React, { useState, useEffect } from "react";
import SkyBerry from "./skyberry";
import SkyBerryM from "./skyberryM";

const SkyBerryWrapper = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <SkyBerryM /> : <SkyBerry />;
};

export default SkyBerryWrapper;
