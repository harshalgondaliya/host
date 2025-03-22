import logo from "../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext"; // Ensure this import is correct
import { FaBell } from "react-icons/fa";
import axios from "axios";

const Nav = ({ totalItems = 0, totalPrice = 0, onClick }) => {
  const navigate = useNavigate();
  const { userData, backendUrl } = useContext(AppContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  // Fetch notification count when userData changes
  useEffect(() => {
    if (userData && backendUrl) {
      const fetchNotificationCount = async () => {
        try {
          const response = await axios.get(`${backendUrl}/api/notifications?limit=1&unreadOnly=true`, {
            withCredentials: true
          });
          
          if (response.data.success) {
            setNotificationCount(response.data.unreadCount || 0);
          }
        } catch (error) {
          console.error("Error fetching notification count:", error);
        }
      };
      
      fetchNotificationCount();
      
      // Set up interval to check for new notifications every minute
      const intervalId = setInterval(fetchNotificationCount, 60000);
      
      return () => clearInterval(intervalId);
    }
  }, [userData, backendUrl]);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handler for search icon click
  const handleSearchClick = () => {
    navigate('/search');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 bg-green-950 border-b border-gray-200 px-4 py-2 flex justify-between items-center z-50"
      style={{ height: "64px" }}
    >
      <div className="flex items-center space-x-1">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="DMart Logo"
          className="h-16 cursor-pointer"
        />
        {!isMobile && (
          <>
            &nbsp;&nbsp;&nbsp;
            <div className="text-sm">
              <span className="block font-semibold text-gray-300">360370</span>
              <span className="text-gray-300 text-lg">Rajkot</span>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Earliest{" "}
                <span className="text-green-600 font-semibold">
                  Home Delivery
                </span>{" "}
                available
              </p>
              <p className="text-orange-500 text-sm font-semibold flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Everyday 07:00 AM - 09:00 PM
              </p>
            </div>
            &nbsp;&nbsp;&nbsp;
          </>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {/* Search Icon Button */}
        <div className="relative mx-2">
          <button 
            onClick={handleSearchClick}
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-orange-500 transition duration-300 flex items-center justify-center"
            aria-label="Search"
          >
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>

        {userData ? (
          <div className="hidden md:block text-lg text-gray-300 hover:text-orange-600 cursor-pointer">
            <span className="font-semibold">
              {userData.name.charAt(0).toUpperCase() + userData.name.slice(1)}
            </span>
          </div>
        ) : (
          <div className="hidden md:block text-sm text-gray-300 hover:text-orange-600 cursor-pointer">
            <Link to="/login">
              <i className="fas fa-user font-semibold"></i>
              &nbsp;&nbsp;&nbsp;Sign In / Register
            </Link>
          </div>
        )}

        {userData && (
          <div className="relative">
            <Link to="/account/notifications" className="text-white hover:text-yellow-400 transition-colors relative">
              <FaBell className="text-2xl" />
              {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </Link>
          </div>
        )}

        <div className="relative flex items-center space-x-1">
          <button
            onClick={() => navigate("/Shopping-cart")}
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-orange-500 h-10 w-10 flex justify-center items-center relative"
          >
            <i className="fas fa-shopping-cart text-lg"></i>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
                {totalItems}
              </span>
            )}
          </button>
          {/* Show total price in both mobile and desktop views */}
          <span className="block text-white text-sm font-semibold">
            {totalItems > 0 ? `₹${totalPrice.toFixed(2)}` : ""}
          </span>
        </div>

        <div className="relative">
          {/* Toggle Button */}
          <button className="text-white" onClick={handleMobileMenuToggle}>
            {!mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            ) : (
              <i className="fas fa-times text-xl"></i>
            )}
          </button>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
              <div className="absolute top-0 right-0 w-3/4 md:w-1/4 h-full bg-green-950 shadow-lg flex flex-col p-6 space-y-4 transition-transform duration-300 overflow-y-auto">
                {/* Close Button */}
                <button
                  className="self-end text-white text-2xl"
                  onClick={handleMobileMenuToggle}
                >
                  &times;
                </button>

                {/* Add search option to mobile menu */}
                <div className="flex items-center bg-gray-800 rounded-lg p-2 mb-4">
                  <button 
                    onClick={handleSearchClick}
                    className="text-white flex items-center w-full justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span>Search Products</span>
                  </button>
                </div>

                <ul className="space-y-4 text-white text-lg">
                  <li>
                    <Link to="/cart" className="block hover:text-white">
                      Cart Store
                    </Link>
                  </li>
                  <li>
                    <Link to="/Shopping-cart" className="block hover:text-white">
                      Shopping Cart
                    </Link>
                  </li>
                  <li>
                        <Link to="/account/notifications" className="block py-2 hover:text-orange-500 transition-colors">
                          Notifications
                        </Link>
                      </li>
                  <li>
                    <Link to="/pineapple" className="block hover:text-white">
                      Pineapple
                    </Link>
                  </li>
                  <li>
                    <Link to="/mango" className="block hover:text-white">
                      Mango
                    </Link>
                  </li>
                  <li>
                    <Link to="/grapes" className="block hover:text-white">
                      Grapes
                    </Link>
                  </li>
                  <li>
                    <Link to="/lychee" className="block hover:text-white">
                      Lychee
                    </Link>
                  </li>
                  <li>
                    <Link to="/strawberry" className="block hover:text-white">
                      Strawberry
                    </Link>
                  </li>
                  <li>
                    <Link to="/skyberry" className="block hover:text-white">
                      SkyBerry
                    </Link>
                  </li>
                  <li>
                    <Link to="/pomegranate" className="block hover:text-white">
                      Pomegranate
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
