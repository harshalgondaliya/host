import React, { useState, useEffect } from "react";
import Mango from "./mango";
import MangoM from "./mangoM";

const MangoWrapper = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MangoM /> : <Mango />;
};  

export default MangoWrapper;
