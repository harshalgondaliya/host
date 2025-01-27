import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartData from "./data.json";

import pineappleImage from "../assets/images/products/pineapple.jpg";
import MangoImage from "../assets/images/products/mango.jpg";
import grapeImage from "../assets/images/products/grapes.jpg";
import lycheeImage from "../assets/images/products/lychee.jpg";
import strawberryImage from "../assets/images/products/strawberry.jpg";
import logo from "../assets/logo1.png";

// Sample Navbar Component
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-green-950 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="DMart Logo"
          className="h-16 cursor-pointer"
        />
        &nbsp;&nbsp;&nbsp;
        <div className="text-sm">
          <span className="block font-semibold text-gray-300">360370</span>
          <span className="text-gray-300 text-lg">Rajkot</span>
        </div>
        &nbsp;&nbsp;&nbsp;
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Earliest{" "}
            <span className="text-green-600 font-semibold">Home Delivery</span>{" "}
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
          <div className="relative  w-[50rem]">
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
              className="block w-[50rem] p-4 ps-10 text-sm text-black border border-black rounded-lg bg-white focus:ring-blue-500 focus:border-black-500"
              placeholder="Search Juice , Soft Drinks , Energy Drinks ......"
              required
            />

            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
        &nbsp;&nbsp;&nbsp;
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-300 hover:text-orange-600 cursor-pointer">
          <Link to="/login">
            <i className="fas fa-user font-semibold"></i>&nbsp;&nbsp;&nbsp;Sign
            In / Register
          </Link>
        </div>
        &nbsp;
        <div className="relative group">
          <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-orange-500 transition duration-300">
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
              3
            </span>
          </button>
        </div>
        &nbsp;&nbsp;
        <div className="relative group">
          <div className="relative flex items-center justify-center">
            <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-orange-500 transition w-13 h-12 duration-300">
              <Link to="/cart-store" className="text-white rounded-full">
                <i className="fas fa-shopping-cart text-xl"></i>
              </Link>
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Aside = () => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <aside className="w-64 bg-gray-100 border-r p-4">
      <h2
        className="text-lg font-bold mb-4"
        style={{ fontFamily: '"Comic Sans MS", cursive' }}
      >
        Products
      </h2>

      <ul className="space-y-2">
        {/* Juice Category */}
        <li
          onMouseEnter={() => setOpenCategory("juice")}
          onMouseLeave={() => setOpenCategory(null)}
        >
          <button
            className="w-full text-left p-2 rounded hover:bg-gray-200 cursor-pointer flex justify-between items-center"
            onClick={() => toggleCategory("juice")}
          >
            Juice ({cartData.products.subJuice.length})
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${
                openCategory === "juice" ? "rotate-90" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          {openCategory === "juice" && (
            <ul className="bg-gray-50 border rounded shadow-md mt-2 p-2 space-y-1">
              {cartData.products.subJuice.map((item) => (
                <li
                  key={item.id}
                  className="p-2 rounded hover:bg-gray-200 cursor-pointer"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Soft Drink Category */}
        <li
          onMouseEnter={() => setOpenCategory("softDrink")}
          onMouseLeave={() => setOpenCategory(null)}
        >
          <button
            className="w-full text-left p-2 rounded hover:bg-gray-200 cursor-pointer flex justify-between items-center"
            onClick={() => toggleCategory("softDrink")}
          >
            Soft Drinks ({cartData.products.subSoftDrink.length})
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${
                openCategory === "softDrink" ? "rotate-90" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          {openCategory === "softDrink" && (
            <ul className="bg-gray-50 border rounded shadow-md mt-2 p-2 space-y-1">
              {cartData.products.subSoftDrink.map((item) => (
                <li
                  key={item.id}
                  className="p-2 rounded hover:bg-gray-200 cursor-pointer"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Energy Drink Category */}
        <li
          onMouseEnter={() => setOpenCategory("energyDrink")}
          onMouseLeave={() => setOpenCategory(null)}
        >
          <button
            className="w-full text-left p-2 rounded hover:bg-gray-200 cursor-pointer flex justify-between items-center"
            onClick={() => toggleCategory("energyDrink")}
          >
            Energy Drinks ({cartData.products.subEnergyDrink.length})
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${
                openCategory === "energyDrink" ? "rotate-90" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          {openCategory === "energyDrink" && (
            <ul className="bg-gray-50 border rounded shadow-md mt-2 p-2 space-y-1">
              {cartData.products.subEnergyDrink.map((item) => (
                <li
                  key={item.id}
                  className="p-2 rounded hover:bg-gray-200 cursor-pointer"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Naatu Naatu Category */}
        <li
          onMouseEnter={() => setOpenCategory("naatuNaatu")}
          onMouseLeave={() => setOpenCategory(null)}
        >
          <button
            className="w-full text-left p-2 rounded hover:bg-gray-200 cursor-pointer flex justify-between items-center"
            onClick={() => toggleCategory("naatuNaatu")}
          >
            Naatu Naatu ({cartData.products.subNaatuNaatu.length})
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${
                openCategory === "naatuNaatu" ? "rotate-90" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          {openCategory === "naatuNaatu" && (
            <ul className="bg-gray-50 border rounded shadow-md mt-2 p-2 space-y-1">
              {cartData.products.subNaatuNaatu.map((item) => (
                <li
                  key={item.id}
                  className="p-2 rounded hover:bg-gray-200 cursor-pointer"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Drinking Water Category */}
        <li
          onMouseEnter={() => setOpenCategory("drinkingWater")}
          onMouseLeave={() => setOpenCategory(null)}
        >
          <button
            className="w-full text-left p-2 rounded hover:bg-gray-200 cursor-pointer flex justify-between items-center"
            onClick={() => toggleCategory("drinkingWater")}
          >
            Drinking Water ({cartData.products.subDrinkingWater.length})
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${
                openCategory === "drinkingWater" ? "rotate-90" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          {openCategory === "drinkingWater" && (
            <ul className="bg-gray-50 border rounded shadow-md mt-2 p-2 space-y-1">
              {cartData.products.subDrinkingWater.map((item) => (
                <li
                  key={item.id}
                  className="p-2 rounded hover:bg-gray-200 cursor-pointer"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

// Sample Cart Component
const Cart = () => {
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeChange = (itemId, sizeIndex) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [itemId]: sizeIndex,
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Aside />
        <main className="container mx-auto p-4">
          <h2
            className="text-lg font-bold mb-4"
            style={{ fontFamily: '"Comic Sans MS", cursive' }}
          >
            Shopping Cart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cartData.products.subJuice.map((item) => {
              const selectedSizeIndex = selectedSizes[item.id] || 0;
              const selectedSize = item.sizes[selectedSizeIndex];

              return (
                <div
                  key={item.id}
                  className="border rounded-lg shadow-md p-1 flex flex-col w-[rem]"
                >
                  {/* Product Header */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {item.description}
                    </h3>
                    {item.vegetarianSymbol && (
                      <img
                        src="https://content.dmart.in/website/_next/static/media/veg.fd2bc51a.svg"
                        alt="Vegetarian Symbol"
                        className="h-10 w-10"
                        title="Vegetarian"
                      />
                    )}
                  </div>

                  {/* Product Image */}
                  <div className="flex justify-center my-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-contain rounded-lg"
                    />
                  </div>

                  {/* Price Information */}
                  <div className="mb-4 flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">
                        <span className="font-semibold">MRP: </span>
                        <span className="line-through">
                          ₹{selectedSize.originalPrice}
                        </span>
                      </p>
                      <p className="text-green-600 text-lg font-bold">
                        TooMore: ₹{selectedSize.cutoffPrice}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Inclusive of all taxes
                      </p>
                    </div>
                    <div>
                      <span className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">
                        ₹{selectedSize.discount} OFF
                      </span>
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Size:
                    </label>
                    <select
                      className="border border-gray-300 rounded p-2 w-full text-sm"
                      value={selectedSizeIndex}
                      onChange={(e) =>
                        handleSizeChange(item.id, parseInt(e.target.value))
                      }
                    >
                      {item.sizes.map((size, index) => (
                        <option key={index} value={index}>
                          {size.size} ({size.pricePerUnit})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition">
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Cart;
