import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import cartData from "../cart/data.json";
import { AppContent } from "../context/AppContext";
import Nav from "./Nav";

const CartM = () => {
  const [selectedSizes, setSelectedSizes] = useState({});
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useContext(AppContent);

  const handleSizeChange = (itemId, sizeIndex) => {
    setSelectedSizes((prevSizes) => ({ ...prevSizes, [itemId]: sizeIndex }));
  };

  const handleAddToCart = (itemId, quantity, sizeIndex) => {
    const selectedSize = cartData.products.subJuice.find(
      (item) => item.id === itemId
    ).sizes[sizeIndex];

    const item = {
      id: itemId,
      name: cartData.products.subJuice.find((item) => item.id === itemId).name,
      image: cartData.products.subJuice.find((item) => item.id === itemId).image,
      quantity,
      size: selectedSize,
    };
    addToCart(item);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Nav/>
      <h2 className="text-lg font-bold text-center mb-4">Shopping Cart</h2>
      <div className="space-y-4">
        {cartData.products.subJuice.map((item) => {
          const selectedSizeIndex = selectedSizes[item.id] || 0;
          const selectedSize = item.sizes[selectedSizeIndex];
          const cartItem = cartItems.find((i) => i.id === item.id);

          return (
            <div key={item.id} className="bg-white p-3 rounded-lg shadow-md">
              <div className="flex items-center space-x-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">₹{selectedSize.cutoffPrice}</p>
                  <select
                    className="mt-1 border p-1 text-xs w-full"
                    value={selectedSizeIndex}
                    onChange={(e) => handleSizeChange(item.id, parseInt(e.target.value))}
                  >
                    {item.sizes.map((size, index) => (
                      <option key={index} value={index}>
                        {size.size} ({size.pricePerUnit})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {!cartItem || cartItem.quantity === 0 ? (
                <button
                  className="w-full mt-2 bg-green-500 text-white py-2 rounded"
                  onClick={() => handleAddToCart(item.id, 1, selectedSizeIndex)}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center justify-between mt-2">
                  <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded" onClick={() => removeFromCart(item.id)}>
                    ✕
                  </button>
                  <p className="text-sm font-semibold">{cartItem.quantity}x</p>
                  <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => handleAddToCart(item.id, cartItem.quantity + 1, selectedSizeIndex)}>
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartM;