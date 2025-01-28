import React, { useState } from "react";
import cartData from "./data.json";

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
            className="w-full text-left p-2 rounded hover:bg-gray-300 cursor-pointer flex justify-between items-center"
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
                  className="p-2 rounded hover:bg-gray-950 cursor-pointer hover:text-orange-600"
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
            className="w-full text-left p-2 rounded hover:bg-gray-300 cursor-pointer flex justify-between items-center"
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
                  className="p-2 rounded hover:bg-gray-950 cursor-pointer hover:text-orange-600"
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
            className="w-full text-left p-2 rounded hover:bg-gray-300 cursor-pointer flex justify-between items-center"
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
                  className="p-2 rounded hover:bg-gray-950 cursor-pointer hover:text-orange-600"
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
            className="w-full text-left p-2 rounded hover:bg-gray-300 cursor-pointer flex justify-between items-center"
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
                   className="p-2 rounded hover:bg-gray-950 cursor-pointer hover:text-orange-600"
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
            className="w-full text-left p-2 rounded hover:bg-gray-300 cursor-pointer flex justify-between items-center"
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
                  className="p-2 rounded hover:bg-gray-950 cursor-pointer hover:text-orange-600"
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

export default Aside;