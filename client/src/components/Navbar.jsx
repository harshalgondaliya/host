import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { assets } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";
import { FaBars, FaSearch, FaTimes, FaShoppingCart, FaBell } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const [searchOpenMobile, setSearchOpenMobile] = useState(false);
  const [searchOpenDesktop, setSearchOpenDesktop] = useState(false);

  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  // Add notification count state
  const [notificationCount, setNotificationCount] = useState(0);
  
  // Fetch unread notification count for logged-in users
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

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Toggle Mobile Menu
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Toggle Dropdown Menu for "Products"
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav className="bg-green-950 fixed w-full z-20 top-0 start-0 border-b border-transparent dark:transparent">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-1">
        <a
          onClick={() => navigate("/")}
          className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
        >
          <img src={logo} alt="Toomore Juice Logo" className="h-14 w-14 sm:h-16 sm:w-16" />
        </a>

        <div className="dark:bg-transparent hidden md:flex items-center space-x-6">
          <ul className="flex items-center space-x-8">
            {/* Your existing menu items here */}
            {/* Example for one item */}
            <li>
              <Link
                to="/our-story"
                className="text-white text-lg hover:text-orange-500 transition"
              >
                Our Story
              </Link>
            </li>
            <li className="relative group">
              <Link
                to="/Juices"
                className="text-white text-lg hover:text-orange-500 transition"
              >
                Products
              </Link>
            </li>

            <li className="relative group">
              <Link
                to="/investor-relations"
                className="text-white text-lg hover:text-orange-500 transition"
              >
                Investors
              </Link>
              <ul
                className="absolute left-0 top-full mt-2 bg-gray-800 rounded-md shadow-lg opacity-0 
                 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48"
              >
                {[
                  {
                    icon: "📈",
                    text: "Investor Relations",
                    link: "/investor-relations",
                  },
                  // {
                  //   icon: "📊",
                  //   text: "Financial Reports",
                  //   link: "/financial-reports",
                  // },
                  {
                    icon: "📰",
                    text: "Press Releases",
                    link: "/press-releases",
                  },
                  // {
                  //   icon: "🗒️",
                  //   text: "Stockholder Information",
                  //   link: "/stockholder-info",
                  // },
                  {
                    icon: "❓",
                    text: "FAQs for Investors",
                    link: "/investor-FAQs",
                  },
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="block px-4 py-2 flex items-center space-x-2 hover:bg-gray-700 
                   rounded-md transition text-white text-sm hover:text-orange-400"
                  >
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </Link>
                ))}
              </ul>
            </li>

            <li className="relative group">
              <Link
                to="/env-impact"
                className="text-white text-lg hover:text-orange-500 transition"
              >
                Sustainability
              </Link>
              <ul
                className="absolute left-0 top-full mt-2 bg-gray-800 rounded-md shadow-lg opacity-0 
                 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48"
              >
                {[
                  {
                    icon: "🌍",
                    text: "Environmental Impact",
                    link: "/env-impact",
                  },
                  // {
                  //   icon: "💧",
                  //   text: "Water Conservation",
                  //   link: "/water-conservation",
                  // },
                  // {
                  //   icon: "🤝",
                  //   text: "Community Support",
                  //   link: "/community-support",
                  // },
                  // {
                  //   icon: "📜",
                  //   text: "Sustainability Reports",
                  //   link: "/sustainability-reports",
                  // },
                  // {
                  //   icon: "🏆",
                  //   text: "Certifications & Achievements",
                  //   link: "/certifications",
                  // },
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="block px-4 py-2 flex items-center space-x-2 hover:bg-gray-700 
                 rounded-md transition text-white text-sm hover:text-orange-400"
                  >
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </Link>
                ))}
              </ul>
            </li>

            <li className="relative group">
              <Link
                to="/careers"
                className="text-white text-lg hover:text-orange-500 transition"
              >
                Join Us
              </Link>
              <ul
                className="absolute left-0 top-full mt-2 bg-gray-800 rounded-md shadow-lg opacity-0 
                 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48"
              >
                {[
                  { icon: "👨‍💼", text: "Careers", link: "/careers" },
                  // {
                  //   icon: "🎓",
                  //   text: "Internship Opportunities",
                  //   link: "/internship-opportunities",
                  // },
                  // {
                  //   icon: "🌟",
                  //   text: "Life at Toomore Beverages",
                  //   link: "/life-at-toomore",
                  // },
                  // { icon: "💼", text: "Job Openings", link: "/job-openings" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="block px-4 py-2 flex items-center space-x-2 hover:bg-gray-700 
                   rounded-md transition text-white text-sm hover:text-orange-400"
                  >
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </Link>
                ))}
              </ul>
            </li>

            <li className="relative group">
              <Link
                to="/customer-care"
                className="text-white text-lg hover:text-orange-500 transition"
              >
                Support
              </Link>
              <ul
                className="absolute left-0 top-full mt-2 bg-gray-800 rounded-md shadow-lg opacity-0 
                 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48"
              >
                {[
                  // { icon: "📞", text: "Contact Us", link: "/contact-us" },
                  // { icon: "📝", text: "Feedback", link: "/feedback" },
                  { icon: "❓", text: "FAQs", link: "/FAQs" },
                  // {
                  //   icon: "🛒",
                  //   text: "Distributor",
                  //   link: "/distributor-support",
                  // },
                  { icon: "🙋‍♂️", text: "Customer Care", link: "/customer-care" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="block px-4 py-2 flex items-center space-x-2 hover:bg-gray-700 
                   rounded-md transition text-white text-sm hover:text-orange-400"
                  >
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </Link>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center justify-end w-full space-x-2">
          <button
            onClick={() => navigate("/search")}
            className="text-white hover:text-orange-500 transition-colors p-1"
            aria-label="Search"
          >
            <i className="fas fa-search text-xl"></i>
          </button>

          <button
            onClick={handleMobileMenuToggle}
            className="text-white hover:text-orange-500 transition-colors p-1 z-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <i className="fas fa-times text-xl"></i>
            ) : (
              <i className="fas fa-bars text-xl"></i>
            )}
          </button>

          {mobileMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
              <div 
                className="absolute top-0 right-0 w-4/5 sm:w-3/4 max-w-sm h-full bg-green-950 shadow-lg flex flex-col p-4 sm:p-6 space-y-3 
                transform transition-all duration-300 ease-in-out overflow-y-auto"
              >
                <ul className="space-y-4 text-white text-lg">
                  {userData ? (
                    <>
                      <li className="relative">
                        <br /><br />
                        <button
                          onClick={() => toggleDropdown("User")}
                          className="block w-full text-left hover:text-orange-500 flex justify-between items-center transition-colors"
                        >
                          {userData.name.charAt(0).toUpperCase() +
                            userData.name.slice(1)}{" "}
                          <i
                            className={`fas ${
                              openDropdown === "User"
                                ? "fa-chevron-up"
                                : "fa-chevron-down"
                            }`}
                          ></i>
                        </button>
                        {openDropdown === "User" && (
                          <ul className="mt-2 w-full bg-green-800 shadow-lg rounded-lg transition-opacity duration-300">
                            {!userData.isAccountVerified ? (
                              <li
                                onClick={sendVerificationOtp}
                                className="block px-4 py-2 text-white hover:bg-yellow-500 cursor-pointer"
                              >
                                Verify Account
                              </li>
                            ) : null}
                            <li
                              onClick={() => navigate("/reset-password")}
                              className="block px-4 py-2 text-white hover:bg-yellow-500 cursor-pointer"
                            >
                              Reset Password
                            </li>
                            <li
                              onClick={logout}
                              className="block px-4 py-2 text-white hover:bg-yellow-500 cursor-pointer"
                            >
                              Logout
                            </li>
                          </ul>
                        )}
                      </li>
                      <li>
                        <Link to="/account/notifications" className="block py-2 hover:text-orange-500 transition-colors">
                          Notifications
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link to="/login" className="block py-2 hover:text-orange-500 transition-colors">
                        Login
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/our-story" className="block py-2 hover:text-orange-500 transition-colors">
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link to="/juices" className="block py-2 hover:text-orange-500 transition-colors">
                      Products
                    </Link>
                  </li>

                  {/* Dropdown Menus */}
                  {[
                    {
                      title: "Investors",
                      links: [
                        {
                          path: "/investor-relations",
                          label: "Investor Relations",
                        },
                        // {
                        //   path: "/financial-reports",
                        //   label: "Financial Reports",
                        // },
                        { path: "/press-releases", label: "Press Releases" },
                        // {
                        //   path: "/stockholder-info",
                        //   label: "Stockholder Information",
                        // },
                        { path: "/investor-FAQs", label: "FAQs for Investors" },
                      ],
                    },
                    {
                      title: "Sustainability",
                      links: [
                        { path: "/env-impact", label: "Environmental Impact" },
                        // {
                        //   path: "/water-conservation",
                        //   label: "Water Conservation",
                        // },
                        // {
                        //   path: "/community-support",
                        //   label: "Community Support",
                        // },
                        // {
                        //   path: "/sustainability-reports",
                        //   label: "Sustainability Reports",
                        // },
                        // {
                        //   path: "/certifications",
                        //   label: "Certifications & Achievements",
                        // },
                      ],
                    },
                    {
                      title: "Join Us",
                      links: [
                        { path: "/careers", label: "Careers" },
                        // {
                        //   path: "/internship-opportunities",
                        //   label: "Internship Opportunities",
                        // },
                        // {
                        //   path: "/life-at-toomore",
                        //   label: "Life at Toomore Beverages",
                        // },
                        // { path: "/job-openings", label: "Job Openings" },
                      ],
                    },
                    {
                      title: "Support",
                      links: [
                        // { path: "/contact-us", label: "Contact Us" },
                        // { path: "/feedback", label: "Feedback" },
                        { path: "/FAQs", label: "FAQs" },
                        // { path: "/distributor-support", label: "Distributor" },
                        { path: "/customer-care", label: "Customer Care" },
                      ],
                    },
                  ].map((menu) => (
                    <li className="relative" key={menu.title}>
                      <button
                        onClick={() => toggleDropdown(menu.title)}
                        className="block w-full text-left py-2 hover:text-orange-500 transition-colors flex justify-between items-center"
                      >
                        {menu.title}{" "}
                        <i
                          className={`fas ${
                            openDropdown === menu.title
                              ? "fa-chevron-up"
                              : "fa-chevron-down"
                          }`}
                        ></i>
                      </button>
                      {openDropdown === menu.title && (
                        <ul className="mt-1 w-full bg-green-800 shadow-inner rounded-lg transition-all duration-300">
                          {menu.links.map((link, index) => (
                            <li key={index}>
                              <Link
                                to={link.path}
                                className="block px-4 py-2 text-white hover:bg-green-700 transition-colors hover:text-orange-400"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}

                  <li>
                    <Link to="/cart" className="block py-2 hover:text-orange-500 transition-colors">
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link to="/states" className="block py-2 hover:text-orange-500 transition-colors">
                      {t('Language Settings')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Items */}
        <div className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => navigate("/search")}
            className="text-white hover:text-orange-500 transition-colors p-2"
            aria-label="Search"
          >
            <i className="fas fa-search text-xl"></i>
          </button>

          <Link
            to="/cart"
            className="text-white hover:text-orange-500 transition-colors p-2"
            aria-label="Cart"
          >
            <i className="fas fa-shopping-cart text-xl"></i>
          </Link>
          
          {/* Notification Bell for Desktop */}
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
          
          {/* Language Settings Page Link */}
          <Link
            to="/states"
            className="text-white hover:text-orange-500 transition-colors p-2"
            title="Language Settings"
            aria-label="Language Settings"
          >
            <i className="fas fa-globe text-xl"></i>
          </Link>

          {/* Show user icon for desktop when user is not logged in */}
          {!userData && (
            <Link
              to="/login"
              className="text-white hover:text-orange-500 transition-colors p-2"
              aria-label="Login"
            >
              <i className="fas fa-user text-xl"></i>
            </Link>
          )}

          {/* Show user dropdown for desktop when user is logged in */}
          {userData && (
            <div className="relative group">
              <div className="w-7 h-7 flex justify-center items-center bg-green-800 text-white rounded-full hover:bg-black transition-colors cursor-pointer">
                {userData.name[0].toUpperCase()}
              </div>
              <div className="absolute right-0 mt-2 hidden group-hover:block z-10 w-48 bg-gray-800 shadow-lg rounded-md overflow-hidden transform origin-top-right transition-all duration-200">
                <ul className="py-1">
                  <li className="border-b border-gray-700 px-4 py-2 text-white">
                    {userData.name.charAt(0).toUpperCase() + userData.name.slice(1)}
                  </li>
                  {!userData.isAccountVerified && (
                    <li onClick={sendVerificationOtp} className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white hover:text-orange-400 transition-colors">
                      Verify Account
                    </li>
                  )}
                  <li onClick={() => navigate("/reset-password")} className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white hover:text-orange-400 transition-colors">
                    Reset Password
                  </li>
                  <li onClick={logout} className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white hover:text-orange-400 transition-colors">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
