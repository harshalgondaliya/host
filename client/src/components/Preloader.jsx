import React, { useEffect, useState } from "react";

// Define fallback placeholder if videos can't be loaded
const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f2f2f2'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23333333'%3ETooMore%3C/text%3E%3C/svg%3E";

const Preloader = ({ setLoading }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [desktopVideoLoaded, setDesktopVideoLoaded] = useState(false);
  const [mobileVideoLoaded, setMobileVideoLoaded] = useState(false);
  
  // Get video URLs using relative paths
  const desktopLoader = "/src/assets/images/Desktop.mp4";
  const mobileLoader = "/src/assets/images/Mobile.mp4";

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", checkScreenSize);

    // Shorter preloader timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Reduced from 2000ms

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [setLoading]);

  const handleVideoError = (event, type) => {
    console.error(`Failed to load ${type} video:`, event);
    if (type === 'desktop') {
      setDesktopVideoLoaded(false);
    } else {
      setMobileVideoLoaded(false);
    }
    // Force loader to finish if video fails
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div
      id="preloader"
      className="fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center z-50"
    >
      {/* Desktop Preloader */}
      {!isMobile && (
        <div className="w-full h-full">
          {!desktopVideoLoaded && (
            <div className="w-full h-full flex justify-center items-center">
              <img src={placeholderImage} alt="Loading..." className="w-48 h-48" />
            </div>
          )}
          <video
            src={desktopLoader}
            autoPlay
            muted
            onError={(e) => handleVideoError(e, 'desktop')}
            onLoadedData={() => setDesktopVideoLoaded(true)}
            className={`w-full h-full object-cover ${!desktopVideoLoaded ? 'hidden' : ''}`}
          ></video>
        </div>
      )}

      {/* Mobile Preloader */}
      {isMobile && (
        <div className="w-full h-full flex justify-center items-center">
          {!mobileVideoLoaded && (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img src={placeholderImage} alt="Loading..." className="w-32 h-32" />
            </div>
          )}
          <video
            src={mobileLoader}
            autoPlay
            muted
            onError={(e) => handleVideoError(e, 'mobile')}
            onLoadedData={() => setMobileVideoLoaded(true)}
            className={`w-full h-full object-cover rounded-lg ${!mobileVideoLoaded ? 'hidden' : ''}`}
          ></video>
        </div>
      )}
    </div>
  );
};

export default Preloader;
