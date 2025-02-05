import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import cartData from "../cart/data.json";
import Nav from "./Nav";
import Aside from "./Aside";
import { AppContent } from "../context/AppContext"; // Import your context

const Cart = () => {
  const [selectedSizes, setSelectedSizes] = useState({});
  const navigate = useNavigate();

  // Use cart state and functions from context
  const { cartItems, addToCart, removeFromCart } = useContext(AppContent);

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

    const item = {
      id: itemId,
      name: cartData.products.subJuice.find((item) => item.id === itemId).name,
      description: cartData.products.subJuice.find((item) => item.id === itemId)
        .description,
      image: cartData.products.subJuice.find((item) => item.id === itemId).image,
      quantity,
      size: selectedSize,
    };

    addToCart(item); // Add item to cart using context
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId); // Remove item from cart if quantity is 0 or less
    } else {
      const existingItem = cartItems.find((item) => item.id === itemId);
      if (existingItem) {
        const updatedItem = { ...existingItem, quantity: newQuantity };
        removeFromCart(itemId); // Remove the old item
        addToCart(updatedItem); // Add the updated item to cart
      }
    }
  };

  const handleManualQuantityChange = (itemId, e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      handleQuantityChange(itemId, newQuantity);
    }
  };

  const handleIncrement = (itemId) => {
    const existingItem = cartItems.find((item) => item.id === itemId);
    if (existingItem) {
      handleQuantityChange(itemId, existingItem.quantity + 1);
    }
  };

  const handleDecrement = (itemId) => {
    const existingItem = cartItems.find((item) => item.id === itemId);
    if (existingItem) {
      handleQuantityChange(itemId, existingItem.quantity - 1);
    }
  };

  // Calculate total items and total price
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.size.cutoffPrice,
    0
  );

  return (
    <div>
      <Nav
        totalItems={totalItems}
        totalPrice={totalPrice}
        onClick={() => navigate("/shoppingcart", { state: { cartItems } })}
      />{" "}
      <br />
      <br />
      <div className="flex">
        <Aside />
        <main className="container mx-auto p-4 bg-orange-300">
          <h2 className="text-lg font-bold mb-4" style={{ fontFamily: '"Comic Sans MS", cursive' }}>Shopping Cart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cartData.products.subJuice.map((item) => {
              const selectedSizeIndex = selectedSizes[item.id] || 0;
              const selectedSize = item.sizes[selectedSizeIndex];
              const cartItem = cartItems.find((i) => i.id === item.id);

              // Corrected calculations
              const totalMRP = selectedSize.originalPrice * (cartItem ? cartItem.quantity : 1);
              const totalTooMore = selectedSize.cutoffPrice * (cartItem ? cartItem.quantity : 1);
              const totalDiscount = totalMRP - totalTooMore;

                return (
                <div
                  key={item.id}
                  className="border border-gray-500 rounded-lg shadow p-4 flex flex-col bg-white"
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
                    MRP: ₹{totalMRP.toFixed(2)}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-green-600 text-lg font-bold">
                    TooMore: ₹{totalTooMore.toFixed(2)}
                    </p>
                    <p className="text-sm font-semibold">
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-sm">
                      ₹{totalDiscount.toFixed(2)} OFF
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
                    onClick={() => handleDecrement(item.id)}
                    >
                    -
                    </button>

                    <input
                    type="number"
                    className="w-16 text-center border rounded-lg mx-1"
                    value={cartItem.quantity}
                    onChange={(e) => handleManualQuantityChange(item.id, e)}
                    min="1"
                    />

                    <button
                    className="bg-green-500 text-white px-3 py-1"
                    onClick={() => handleIncrement(item.id)}
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