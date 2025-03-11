import React, { useEffect, useState } from "react";
import desktopLoader from "../assets/images/Desktop.mp4"; // Ensure this path is correct
import mobileLoader from "../assets/images/Mobile.mp4"; // Ensure this path is correct

const Preloader = ({ setLoading }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", checkScreenSize);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust based on animation length

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [setLoading]);

  return (
    <div
      id="preloader"
      className="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center z-50"
    >
      {/* Desktop Preloader */}
      {!isMobile && (
        <div className="w-full h-full">
          <video
            src={desktopLoader}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          ></video>
        </div>
      )}

      {/* Mobile Preloader */}
      {isMobile && (
        <div className="w-full h-full flex justify-center items-center">
          <video
            src={mobileLoader}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover rounded-lg"
          ></video>
        </div>
      )}
    </div>
  );
};

export default Preloader;
