import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const [searchOpenMobile, setSearchOpenMobile] = useState(false);
  const [searchOpenDesktop, setSearchOpenDesktop] = useState(false);

  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

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
    <nav className="bg-transparent dark:bg-green-950 fixed w-full z-20 top-0 start-0 border-b border-transparent dark:transparent">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-0">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="Toomore Juice Logo" className="h-16 w-16" />
        </a>

        <div className="dark:bg-transparent hidden md:flex items-center space-x-6">
          <ul className="flex items-center space-x-10">
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
              <ul
                className="absolute left-0 top-full mt-2 bg-gray-800 rounded-md shadow-lg opacity-0 
                 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48"
              >
                {[
                  { icon: "🍹", text: "Juices", link: "/Juices" },
                  { icon: "🥤", text: "Soft Drinks", link: "/soft-drinks" },
                  { icon: "⚡", text: "Energy Drinks", link: "/energy-drinks" },
                  {
                    icon: "💧",
                    text: "Drinking Water",
                    link: "/drinking-Water",
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
                  {
                    icon: "📊",
                    text: "Financial Reports",
                    link: "/financial-reports",
                  },
                  {
                    icon: "📰",
                    text: "Press Releases",
                    link: "/press-releases",
                  },
                  {
                    icon: "🗒️",
                    text: "Stockholder Information",
                    link: "/stockholder-info",
                  },
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
                  {
                    icon: "💧",
                    text: "Water Conservation",
                    link: "/water-conservation",
                  },
                  {
                    icon: "🤝",
                    text: "Community Support",
                    link: "/community-support",
                  },
                  {
                    icon: "📜",
                    text: "Sustainability Reports",
                    link: "/sustainability-reports",
                  },
                  {
                    icon: "🏆",
                    text: "Certifications & Achievements",
                    link: "/certifications",
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
                  {
                    icon: "🎓",
                    text: "Internship Opportunities",
                    link: "/internship-opportunities",
                  },
                  {
                    icon: "🌟",
                    text: "Life at Toomore Beverages",
                    link: "/life-at-toomore",
                  },
                  { icon: "💼", text: "Job Openings", link: "/job-openings" },
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
                to="/contact-us"
                className="text-white text-lg hover:text-orange-500 transition"
              >
                Support
              </Link>
              <ul
                className="absolute left-0 top-full mt-2 bg-gray-800 rounded-md shadow-lg opacity-0 
                 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48"
              >
                {[
                  { icon: "📞", text: "Contact Us", link: "/contact-us" },
                  { icon: "📝", text: "Feedback", link: "/feedback" },
                  { icon: "❓", text: "FAQs", link: "/FAQs" },
                  {
                    icon: "🛒",
                    text: "Distributor",
                    link: "/distributor-support",
                  },
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
        <div className="md:hidden flex items-center relative">
          {/* 🔹 Mobile Search Bar (Only for Mobile) */}
          {searchOpenMobile && (
            <div className="absolute top-full left-8 mt-4 w-64 bg-yellow-500 rounded-md shadow-lg p-3 block md:hidden">
              <input
                type="text"
                placeholder="Search any Juice..."
                className="w-full px-4 py-2 rounded-md bg-green-950 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate("/juices");
                  }
                }}
              />
            </div>
          )}
          {/* 🔹 Mobile Search Button */}
          <button
            onClick={() => setSearchOpenMobile(!searchOpenMobile)}
            className="text-white hover:text-orange-600 md:hidden ml-56"
          >
            <i className="fas fa-search text-xl"></i>
          </button>
          <button
            onClick={handleMobileMenuToggle}
            className="text-white text-2xl fixed top-4 right-4 z-50 transition-transform duration-300"
          >
            {mobileMenuOpen ? (
              <i className="fas fa-times"></i>
            ) : (
              <i className="fas fa-bars"></i>
            )}
          </button>

          {mobileMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
              <div className="absolute top-0 right-0 w-3/4 h-full bg-green-950 shadow-lg flex flex-col p-6 space-y-4 transition-transform duration-300 overflow-y-auto">
                <ul className="space-y-4 text-white text-lg">
                  <br />
                  {userData ? (
                    <li className="relative">
                      <button
                        onClick={() => toggleDropdown("User")}
                        className="block w-full text-left hover:text-white flex justify-between items-center"
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
                        <ul className="mt-2 w-48 bg-green-800 shadow-lg rounded-lg transition-opacity duration-300">
                          {!userData.isAccountVerified && (
                            <li
                              onClick={sendVerificationOtp}
                              className="block px-4 py-2 text-white hover:bg-yellow-500 cursor-pointer"
                            >
                              Verify Account
                            </li>
                          )}
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
                  ) : (
                    <li>
                      <Link to="/login" className="block hover:bg-yellow-500">
                        Login
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/our-story" className="block hover:text-white">
                      Our Story
                    </Link>
                  </li>

                  {/* Dropdown Menus */}
                  {[
                    {
                      title: "Products",
                      links: [
                        { path: "/juices", label: "Juices" },
                        { path: "/soft-drinks", label: "Soft Drinks" },
                        { path: "/energy-drinks", label: "Energy Drinks" },
                        { path: "/drinking-water", label: "Drinking Water" },
                      ],
                    },
                    {
                      title: "Investors",
                      links: [
                        {
                          path: "/investor-relations",
                          label: "Investor Relations",
                        },
                        {
                          path: "/financial-reports",
                          label: "Financial Reports",
                        },
                        { path: "/press-releases", label: "Press Releases" },
                        {
                          path: "/stockholder-info",
                          label: "Stockholder Information",
                        },
                        { path: "/investor-FAQs", label: "FAQs for Investors" },
                      ],
                    },
                    {
                      title: "Sustainability",
                      links: [
                        { path: "/env-impact", label: "Environmental Impact" },
                        {
                          path: "/water-conservation",
                          label: "Water Conservation",
                        },
                        {
                          path: "/community-support",
                          label: "Community Support",
                        },
                        {
                          path: "/sustainability-reports",
                          label: "Sustainability Reports",
                        },
                        {
                          path: "/certifications",
                          label: "Certifications & Achievements",
                        },
                      ],
                    },
                    {
                      title: "Join Us",
                      links: [
                        { path: "/careers", label: "Careers" },
                        {
                          path: "/internship-opportunities",
                          label: "Internship Opportunities",
                        },
                        {
                          path: "/life-at-toomore",
                          label: "Life at Toomore Beverages",
                        },
                        { path: "/job-openings", label: "Job Openings" },
                      ],
                    },
                    {
                      title: "Support",
                      links: [
                        { path: "/contact-us", label: "Contact Us" },
                        { path: "/feedback", label: "Feedback" },
                        { path: "/FAQs", label: "FAQs" },
                        { path: "/distributor-support", label: "Distributor" },
                        { path: "/customer-care", label: "Customer Care" },
                      ],
                    },
                  ].map((menu) => (
                    <li className="relative" key={menu.title}>
                      <button
                        onClick={() => toggleDropdown(menu.title)}
                        className="block w-full text-left hover:text-yellow-500 flex justify-between items-center"
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
                        <ul className="mt-2 w-48 bg-green-800 shadow-lg rounded-lg transition-opacity duration-300">
                          {menu.links.map((link, index) => (
                            <li key={index}>
                              <Link
                                to={link.path}
                                className="block px-4 py-2 text-white hover:bg-yellow-500"
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
                    <Link to="/cart" className="block hover:text-orange-900">
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link to="/states" className="block hover:text-orange-900">
                      States
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Items */}
        <div className="flex items-center space-x-5">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-white hover:text-orange-600 hidden md:block"
          >
            <i className="fas fa-search text-xl"></i>
          </button>
          {searchOpen && (
            <div className="absolute top-full right-48 mt-0 w-72 bg-yellow-500 rounded-md shadow-lg p-3">
              <input
                type="text"
                placeholder="Search any Juice..."
                className="w-full px-4 py-2 rounded-md bg-green-950 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate("/juices");
                  }
                }}
              />
            </div>
          )}

          <Link
            to="/cart"
            className="text-white hover:text-orange-600 hidden md:block"
          >
            <i className="fas fa-shopping-cart text-xl"></i>
          </Link>
          <Link
            to="/states"
            className="text-white hover:text-orange-600 hidden md:block"
          >
            <i className="fas fa-globe text-xl"></i>
          </Link>

          {/* Show user icon for desktop when user is not logged in */}
          {!userData && (
            <Link
              to="/login" // or wherever you want to redirect for login
              className="text-white hover:text-orange-600 hidden md:block"
            >
              <i className="fas fa-user text-xl"></i>
            </Link>
          )}

          {/* Show user dropdown for desktop when user is logged in */}
          {userData && (
            <div className="w-7 h-7 flex justify-center items-center bg-black text-white rounded-full relative group mb-0 hidden md:flex">
              {userData.name[0].toUpperCase()}
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-white rounded pt-10">
                <ul className="list-none m-0 p-2 bg-gray-900 text-sm">
                  {!userData.isAccountVerified && (
                    <li
                      onClick={sendVerificationOtp}
                      className="py-1 px-2 hover:bg-black cursor-pointer pr-10 hover:text-orange-600"
                    >
                      Verify Account
                    </li>
                  )}
                  <li
                    onClick={logout}
                    className="py-1 px-2 hover:bg-black cursor-pointer pr-10 hover:text-orange-600"
                  >
                    Logout
                  </li>
                  <li
                    onClick={() => navigate("/reset-password")}
                    className="py-1 px-2 w-full hover:bg-black cursor-pointer pr-10 hover:text-orange-600"
                  >
                    Reset Password
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
