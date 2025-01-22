import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import logo from "../assets/logo1.png"; // Adjust the path based on your image location
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome styles

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-11 py-14">
        <div className="grid grid-cols-12 md:grid-cols-1 gap-7 ml-14">
          <div className="flex justify-between mb-4 ml-24">
            <img src={logo} alt="Too More Beverages" className="w-1/6" />
          </div>
          <hr className="border-gray-800 mb-6" />
          <div className="flex flex-wrap justify-between text-left align-center">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-bold mb-2">About Us</h4>
              <ul>
                <li className="mb-2">
                  <Link to="/media-center" className="hover:underline">
                    Media Center
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/foundation" className="hover:underline">
                    Toomore Foundation
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/investors" className="hover:underline">
                    Investors
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/policies" className="hover:underline">
                    Policies and Practices
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:underline">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-bold mb-2">Need Help?</h4>
              <ul>
                <li className="mb-2">
                  <Link to="/faq" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/contact-us" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/international" className="hover:underline">
                    International
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-bold mb-2">Terms of Use</h4>
              <ul>
                <li className="mb-2">
                  <Link to="/privacy-policy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/cookies-policy" className="hover:underline">
                    Cookies Policy
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/notice-at-collection" className="hover:underline">
                    Notice at Collection
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/do-not-sell" className="hover:underline">
                    Do Not Sell or Share My Personal Information
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/terms-of-service" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookies-settings" className="hover:underline">
                    Cookies Settings
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full md:w-1/4">
              <h4 className="text-lg font-bold mb-2">Address</h4>
              <address className="not-italic">
                PITHDIYA ROAD,
                <br />
                near SHIV FELT,
                <br />
                Derdi, Rajkot-360370,
                <br />
                Gujarat, India
              </address>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
            <div>
              <Link
                to="/states"
                className="border border-black rounded-full py-2 px-4 hover:bg-black hover:text-cyan-400"
              >
                <i className="fas fa-map-marker-alt" /> &nbsp;&nbsp;Indian |
                States
              </Link>
            </div>
            <div className="flex gap-3 justify-center">
              <a
                href="https://www.facebook.com/too.more.142"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black border border-black rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-black hover:text-cyan-400"
              >
                <i className="fab fa-facebook-f text-xl" />
              </a>
              <a
                href="https://www.instagram.com/too_more1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black border border-black rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-black hover:text-cyan-400"
              >
                <i className="fab fa-instagram text-xl" />
              </a>
              <a
                href="https://www.youtube.com/@toomorebeverages9253"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black border border-black rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-black hover:text-cyan-400"
              >
                <i className="fab fa-youtube text-xl" />
              </a>
              <a
                href="https://wa.me/+918780499433"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black border border-black rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-black hover:text-cyan-400"
              >
                <i className="fab fa-whatsapp text-xl" />
              </a>
              <a
                href="mailto:harshalgondaliya07@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black border border-black rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-black hover:text-cyan-400"
              >
                <i className="fas fa-envelope text-xl" />
              </a>
              <a
                href="https://www.twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black border border-black rounded-full p- w-10 h-10 flex items-center justify-center hover:bg-black hover:text-cyan-400"
              >
                <i className="fa-brands fa-x-twitter text-xl" />
              </a>
            </div>
          </div>

          <hr className="border-gray-800 my-6" />
          <p className="text-sm">
            Copyright © 2025 Toomore Beverages Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
