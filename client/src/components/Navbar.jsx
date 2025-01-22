import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
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

      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="bg-orange-500 dark:bg-blue-700 fixed w-full z-20 top-0 start-0 border-b border-orange-600 dark:border-blue-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-0">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="Toomore Juice Logo" className="h-16 w-16" />
        </a>

        <div className="bg-blue-700 hidden md:flex items-center space-x-6">
          <ul className="flex items-center space-x-10">
            <li>
              <Link
                to="/our-story"
                className="text-black text-lg hover:text-yellow-300"
              >
                Our Story
              </Link>
            </li>
            <li className="relative group">
              <Link
                to="/Juice"
                className="text-black text-lg hover:text-yellow-300"
              >
                Products
              </Link>
              <ul className="absolute top-[165%] left-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transform scale-90 group-hover:scale-100 transition-all duration-300 ease-in-out">
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-blue-700 rounded">
                  <span>🍹</span>
                  <Link
                    to="/Juice"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Juices
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-blue-700 rounded">
                  <span>🥤</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Soft Drinks
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-blue-700 rounded">
                  <span>⚡</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Energy Drinks
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-blue-700 rounded">
                  <span>💧</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Drinking Water
                  </Link>
                </li>
              </ul>
            </li>

            {/* Investors Dropdown - Green to Yellow Gradient */}
            <li className="relative group">
              <Link to="/" className="text-black text-lg hover:text-yellow-300">
                Investors
              </Link>
              <ul className="absolute top-[165%] left-0 bg-gradient-to-r from-green-500 to-yellow-500 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transform scale-90 group-hover:scale-100 transition-all duration-300 ease-in-out">
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-green-700 rounded">
                  <span>📈</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Investor Relations
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-green-700 rounded">
                  <span>📊</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Financial Reports
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-green-700 rounded">
                  <span>📰</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Press Releases
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-green-700 rounded">
                  <span>🗒️</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Stockholder Information
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-green-700 rounded">
                  <span>❓</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    FAQs for Investors
                  </Link>
                </li>
              </ul>
            </li>

            {/* Sustainability Dropdown - Light Green to Dark Green Gradient */}
            <li className="relative group">
              <Link to="/" className="text-black text-lg hover:text-yellow-300">
                Sustainability
              </Link>
              <ul className="absolute top-[165%] left-0 bg-gradient-to-r from-green-400 to-green-800 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transform scale-90 group-hover:scale-100 transition-all duration-300 ease-in-out">
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-green-700 rounded">
                  <span>🌍</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Environmental Impact
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-green-700 rounded">
                  <span>💧</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Water Conservation
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-green-700 rounded">
                  <span>🤝</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Community Support
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-green-700 rounded">
                  <span>📜</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Sustainability Reports
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-green-700 rounded">
                  <span>🏆</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Certifications & Achievements
                  </Link>
                </li>
              </ul>
            </li>

            {/* Join Us Dropdown - Purple to Indigo Gradient */}
            <li className="relative group">
              <Link to="/" className="text-black text-lg hover:text-yellow-300">
                Join Us
              </Link>
              <ul className="absolute top-[165%] left-0 bg-gradient-to-r from-purple-700 to-indigo-800 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transform scale-90 group-hover:scale-100 transition-all duration-300 ease-in-out">
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-purple-800 rounded">
                  <span>👨‍💼</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Careers
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-purple-800 rounded">
                  <span>🎓</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Internship Opportunities
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-purple-800 rounded">
                  <span>🌟</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Life at Toomore Beverages
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-purple-800 rounded">
                  <span>💼</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Job Openings
                  </Link>
                </li>
              </ul>
            </li>

            {/* Support Dropdown - Red to Orange Gradient */}
            <li className="relative group">
              <Link to="/" className="text-black text-lg hover:text-yellow-300">
                Support
              </Link>
              <ul className="absolute top-[165%] left-0 bg-gradient-to-r from-red-700 to-orange-700 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transform scale-90 group-hover:scale-100 transition-all duration-300 ease-in-out">
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-red-800 rounded">
                  <span>📞</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-red-800 rounded">
                  <span>📝</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Feedback
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-red-800 rounded">
                  <span>❓</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    FAQs
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-red-800 rounded">
                  <span>🛒</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Distributor Support
                  </Link>
                </li>
                <li className="px-4 py-2 flex items-center space-x-2 hover:bg-red-800 rounded">
                  <span>🙋‍♂️</span>
                  <Link
                    to="/"
                    className="block text-white text-xs font-bold hover:text-yellow-300"
                  >
                    Customer Care
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-5">
          <Link to="/" className="text-black hover:text-yellow-300">
            <i className="fas fa-search text-xl"></i>
          </Link>
          <Link to="/" className="text-black hover:text-yellow-300">
            <i className="fas fa-heart text-xl"></i>
          </Link>
          <Link to="/" className="text-black hover:text-yellow-300">
            <i className="fas fa-shopping-cart text-xl"></i>
          </Link>
          <Link to="/" className="text-black hover:text-yellow-300">
            <i className="fas fa-globe text-xl"></i>
          </Link>
          {userData ? (
            <div className="w-6 h-6 flex justify-center items-center bg-black text-white rounded-full relative group mb-1">
              {userData.name[0].toUpperCase()}
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
                <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
                  {!userData.isAccountVerified && (
                    <li
                      onClick={sendVerificationOtp}
                      className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
                    >
                      Verify Account
                    </li>
                  )}
                  <li
                    onClick={logout}
                    className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
                  >
                    Logout
                  </li>
                  <li
                    onClick={() => navigate("/reset-password")}
                    className="py-1 px-2 w-full hover:bg-gray-200 cursor-pointer pr-10"
                  >
                    Reset Password
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/login" className="text-black hover:text-yellow-300">
              <i className="fas fa-user text-xl"></i>
            </Link>
          )}
        </div>

        <button className="md:hidden text-black">
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
