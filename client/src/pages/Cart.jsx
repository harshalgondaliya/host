import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cartData from "./data.json";
import Nav from "./Nav";
import Aside from "./Aside";

const Cart = () => {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [cart, setCart] = useState({});
  useNavigate();

  const handleSizeChange = (itemId, sizeIndex) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [itemId]: sizeIndex,
    }));
  };

  const handleAddToCart = (itemId, quantity, sizeIndex) => {
    const selectedSize = cartData.products.subJuice.find(
      (item) => item.id === itemId
    ).sizes[sizeIndex];

    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: {
        quantity,
        size: selectedSize,
      },
    }));
  };

  const handleQuantityChange = (itemId, quantity) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: {
        ...prevCart[itemId],
        quantity,
      },
    }));
  };

  const totalItems = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity * item.size.cutoffPrice,
    0
  );

  return (
    <div>
      <Nav totalItems={totalItems} totalPrice={totalPrice} />
      <div className="flex">
        <Aside />
        <main className="container mx-auto p-4">
          <h2 className="text-lg font-bold mb-4">Shopping Cart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cartData.products.subJuice.map((item) => {
              const selectedSizeIndex = selectedSizes[item.id] || 0;
              const selectedSize = item.sizes[selectedSizeIndex];
              const cartItem = cart[item.id];
              const discount =
                selectedSize.originalPrice - selectedSize.cutoffPrice; // Calculate the discount

              return (
                <div
                  key={item.id}
                  className="border rounded-lg shadow-md p-1 flex flex-col"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold">
                      {item.description}
                    </h3>
                    {item.vegetarianSymbol && (
                      <img
                        src="https://content.dmart.in/website/_next/static/media/veg.fd2bc51a.svg"
                        alt="Vegetarian Symbol"
                        className="h-10 w-10"
                      />
                    )}
                  </div>

                  <div className="flex justify-center my-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-contain rounded-lg"
                    />
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-500 text-sm line-through">
                      MRP: ₹{selectedSize.originalPrice}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-green-600 text-lg font-bold">
                        TooMore: ₹{selectedSize.cutoffPrice}
                      </p>
                      <p className="text-sm font-semibold">
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-sm">
                          ₹{discount} OFF
                        </span>
                      </p>
                    </div>
                    <p className="text-gray-500 text-xs">
                      ( Inclusive of all taxes )
                    </p>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                      Select Size:
                    </label>
                    <select
                      className="border p-2 w-full text-sm"
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

                  {!cartItem || cartItem.quantity === 0 ? (
                    <button
                      className="w-full bg-green-500 text-white py-2 rounded-lg"
                      onClick={() =>
                        handleAddToCart(item.id, 1, selectedSizeIndex)
                      }
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center border rounded-lg p-1 justify-between">
                      <button
                        className="bg-green-500 text-white px-3 py-1"
                        onClick={() =>
                          handleQuantityChange(item.id, cartItem.quantity - 1)
                        }
                      >
                        -
                      </button>

                      <span className="mx-1 font-semibold">
                        {cartItem.quantity}
                      </span>

                      <button
                        className="bg-green-500 text-white px-3 py-1 "
                        onClick={() =>
                          handleQuantityChange(item.id, cartItem.quantity + 1)
                        }
                      >
                        +
                      </button>

                      <button
                        className="bg-gray-300 text-gray-700 px-3 py-1 ml-2"
                        onClick={() => handleQuantityChange(item.id, 0)}
                      >
                        ✕
                      </button>
                    </div>
                  )}
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
