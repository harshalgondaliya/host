import logo from "../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext"; // Ensure this import is correct

const Nav = ({ totalItems = 0, totalPrice = 0, onClick }) => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
            <form className="max-w-lg mx-auto">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-black-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative w-[50rem]">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-black"
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
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-[45rem] p-4 ps-10 text-sm text-black border border-black rounded-lg bg-white focus:ring-blue-500 focus:border-black-500"
                  placeholder="Search Juice , Soft Drinks , Energy Drinks ......"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 mr-20"
                >
                  Search
                </button>
              </div>
            </form>
            &nbsp;&nbsp;&nbsp;
          </>
        )}
      </div>
      <div className="flex items-center space-x-0">
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

        <div className="relative group">
          <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-orange-500 transition duration-300">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
              {0}
            </span>
          </button>
        </div>

        <div className="bg-green-950 px-4 py-2 flex justify-between items-center">
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
