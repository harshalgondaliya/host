import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartData from "./data.json";
import Nav from "./Nav";
import Aside from "./Aside";

const ShoppingCartPage = () => {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [coupon, setCoupon] = useState("");

  const handleSizeChange = (itemId, sizeIndex) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [itemId]: sizeIndex,
    }));
  };

  const calculateTotal = () => {
    return cartData.products.subJuice.reduce((total, item) => {
      const selectedSizeIndex = selectedSizes[item.id] || 0;
      const selectedSize = item.sizes[selectedSizeIndex];
      return total + selectedSize.cutoffPrice;
    }, 0);
  };

  const navigate = useNavigate();

  return (
    <div>
      <Nav />
      <div className="flex">
        <Aside />
        <main className="container mx-auto p-4">
          <h2 className="text-lg font-bold mb-4">Shopping Cart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cartData.products.subJuice.map((item) => {
              const selectedSizeIndex = selectedSizes[item.id] || 0;
              const selectedSize = item.sizes[selectedSizeIndex];

              return (
                <div
                  key={item.id}
                  className="border rounded-lg shadow-md p-4 flex flex-col"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold">{item.description}</h3>
                    {item.vegetarianSymbol && (
                      <img
                        src="https://content.dmart.in/website/_next/static/media/veg.fd2bc51a.svg"
                        alt="Vegetarian Symbol"
                        className="h-6 w-6"
                      />
                    )}
                  </div>

                  <div className="flex justify-center my-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-contain rounded-lg"
                    />
                  </div>

                  <div className="mb-4 flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm line-through">
                        ₹{selectedSize.originalPrice}
                      </p>
                      <p className="text-green-600 text-lg font-bold">
                        ₹{selectedSize.cutoffPrice}
                      </p>
                    </div>
                    <span className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">
                      ₹{selectedSize.discount} OFF
                    </span>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
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

                  <button className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600">
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-bold mb-2">Order Summary</h2>
            <p className="mb-2">Subtotal: ₹{calculateTotal()}</p>
            <label className="block mb-2">Apply Coupon:</label>
            <input
              type="text"
              className="border p-2 w-full rounded mb-4"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />

            <button
              onClick={() => navigate("/order-summary")}
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
