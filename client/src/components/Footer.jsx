import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="bg-green-950 text-white h-auto w-full">
      <div className="container mx-auto px-6 md:px-16 py-7">
        {/* Logo Section */}
        <div className="flex justify-center md:justify-start mb-4">
          <img src={logo} alt="Too More Beverages" className="w-1/6 md:w-1/5" />
        </div>

        <hr className="border-gray-800 mb-6" />

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* About Us */}
          <div>
            <h4 className="text-lg font-bold mb-2">About Us</h4>
            <ul>
              <li><Link to="/media-center" className="hover:underline">Media Center</Link></li>
              <li><Link to="/foundation" className="hover:underline">Toomore Foundation</Link></li>
              <li><Link to="/investors" className="hover:underline">Investors</Link></li>
              <li><Link to="/policies" className="hover:underline">Policies and Practices</Link></li>
              <li><Link to="/careers" className="hover:underline">Careers</Link></li>
            </ul>
          </div>

          {/* Need Help? */}
          <div>
            <h4 className="text-lg font-bold mb-2">Need Help?</h4>
            <ul>
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link to="/contact-us" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/international" className="hover:underline">International</Link></li>
            </ul>
          </div>

          {/* Terms of Use */}
          <div>
            <h4 className="text-lg font-bold mb-2">Terms of Use</h4>
            <ul>
              <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/cookies-policy" className="hover:underline">Cookies Policy</Link></li>
              <li><Link to="/notice-at-collection" className="hover:underline">Notice at Collection</Link></li>
              <li><Link to="/do-not-sell" className="hover:underline">Do Not Sell or Share My Personal Information</Link></li>
              <li><Link to="/terms-of-service" className="hover:underline">Terms of Service</Link></li>
              <li><Link to="/cookies-settings" className="hover:underline">Cookies Settings</Link></li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-lg font-bold mb-2">Address</h4>
            <address className="italic">
              PITHDIYA ROAD, <br />
              near SHIV FELT, <br />
              Derdi, Rajkot-360370, <br />
              Gujarat, India
            </address>
          </div>
        </div>

        {/* Social Media & Location Button */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
          {/* Location Button */}
          <Link
            to="/states"
            className="border border-black rounded-full py-2 px-4 hover:bg-black hover:text-orange-600 text-center mb-4 md:mb-0"
          >
            <i className="fas fa-map-marker-alt" /> &nbsp; Indian | States
          </Link>

          {/* Social Media Icons */}
          <div className="flex gap-3">
            {[
              { href: "https://www.facebook.com/too.more.142", icon: "fab fa-facebook-f" },
              { href: "https://www.instagram.com/too_more1/", icon: "fab fa-instagram" },
              { href: "https://www.youtube.com/@toomorebeverages9253", icon: "fab fa-youtube" },
              { href: "https://wa.me/+918780499433", icon: "fab fa-whatsapp" },
              { href: "mailto:toomore343@gmail.com", icon: "fas fa-envelope" },
              { href: "https://x.com/too_more343", icon: "fa-brands fa-x-twitter" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white border border-black rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-black hover:text-orange-600"
              >
                <i className={`${social.icon} text-xl`} />
              </a>
            ))}
          </div>
        </div>

        <hr className="border-gray-800 my-4" />
        <p className="text-sm text-center">
          Copyright © 2025 Toomore Beverages Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
