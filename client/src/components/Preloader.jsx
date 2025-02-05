import React, { useEffect } from "react";
import loader from "../assets/images/loader.mp4"; // Ensure this path is correct

const Preloader = ({ setLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time based on the animation

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div
      id="preloader"
      className="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center z-50"
    >
      <video
        src={loader}
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      ></video>
    </div>
  );
};

export default Preloader;
