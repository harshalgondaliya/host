import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cartData from "../cart/data.json";
import Nav from "./Nav";
import { AppContent } from "../context/AppContext";
import Footer from "../components/Footer";

const CartM = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedSizes, setSelectedSizes] = useState({});
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useContext(AppContent);

  const handleSizeChange = (itemId, sizeIndex) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [itemId]: sizeIndex,
    }));
  
    const cartId = `${itemId}-${sizeIndex}`;
    const existingItem = cartItems.find((item) => item.productId === itemId);
  
    if (existingItem) {
      removeFromCart(existingItem.id); // Remove old size selection
      handleAddToCart(itemId, existingItem.quantity, sizeIndex); // Add new size
    }
  };
  

  const handleAddToCart = (itemId, quantity, sizeIndex) => {
    const product = cartData.products.subJuice.find(
      (item) => item.id === itemId
    );
    const selectedSize = product.sizes[sizeIndex];

    const item = {
      id: `${itemId}-${sizeIndex}`, // Unique ID for different sizes
      productId: itemId, // Keep original product ID
      name: product.name,
      description: product.description,
      image: product.image,
      quantity,
      size: selectedSize,
    };

    addToCart(item);
  };

  const handleQuantityChange = (itemId, sizeIndex, newQuantity) => {
    const cartId = `${itemId}-${sizeIndex}`;

    if (newQuantity <= 0) {
      removeFromCart(cartId); // Remove item
      setShowAddToCart(true); // Ensure UI updates to show "Add to Cart"
    } else {
      const existingItem = cartItems.find((item) => item.id === cartId);
      if (existingItem) {
        const updatedItem = { ...existingItem, quantity: newQuantity };
        removeFromCart(cartId); // Remove the old item
        addToCart(updatedItem); // Add the updated item
      }
    }
  };

  const handleManualQuantityChange = (itemId, sizeIndex, e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      handleQuantityChange(itemId, sizeIndex, newQuantity);
    }
  };
  

  const handleIncrement = (itemId, sizeIndex) => {
    const cartId = `${itemId}-${sizeIndex}`;
    const existingItem = cartItems.find((item) => item.id === cartId);
    if (existingItem) {
      handleQuantityChange(itemId, sizeIndex, existingItem.quantity + 1);
    }
  };

  const handleDecrement = (itemId, sizeIndex) => {
    const cartId = `${itemId}-${sizeIndex}`;
    const existingItem = cartItems.find((item) => item.id === cartId);
    if (existingItem) {
      handleQuantityChange(itemId, sizeIndex, existingItem.quantity - 1);
    }
  };
  
  

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.size.cutoffPrice,
    0
  );

  return (
    <>
      <div className="bg-yellow-400 min-h-screen p-2 md:p-4">
        <Nav totalItems={totalItems} totalPrice={totalPrice}
        onClick={() => navigate("/shopping-cart", { state: { cartItems } })}
         />
        <div className="mt-4">
          <h2 className="text-lg font-bold text-center">Shopping Cart</h2>
          <div className="space-y-4 mt-8">
            {cartData.products.subJuice.map((item) => {
              const selectedSizeIndex = selectedSizes[item.id] || 0;
              const selectedSize = item.sizes[selectedSizeIndex];
              
              const cartItem = cartItems.find((i) => i.id === `${item.id}-${selectedSizeIndex}`);

              const totalMRP = selectedSize.originalPrice * (cartItem ? cartItem.quantity : 1);
              const totalTooMore = selectedSize.cutoffPrice * (cartItem ? cartItem.quantity : 1);
              const totalDiscount = totalMRP - totalTooMore;

              return (
                <div
                  key={`${item.id}-${selectedSizeIndex}`}
                  className="border border-gray-500 bg-white p-0 md:p-0 rounded-lg shadow-md flex flex-row items-center gap-6 w-96"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-48 h-56 object-contain rounded-lg"
                    />
                    {item.vegetarianSymbol && (
                      <img
                        src="https://content.dmart.in/website/_next/static/media/veg.fd2bc51a.svg"
                        alt="Vegetarian Symbol"
                        className="absolute top-2 right-2 h-10 w-10"
                      />
                    )}
                  </div>
                  <div className="flex-1 bg-sky-100 rounded-lg shadow-md p-4">
                    <h3 className="text-sm font-semibold">{item.description}</h3>
                    <p className="text-xs text-gray-500 line-through">MRP: ₹{totalMRP.toFixed(2)}</p>
                    <p className="text-sm text-green-600 font-bold">TooMore: ₹{totalTooMore.toFixed(2)}</p>
                    <p className="text-xs font-semibold bg-green-100 text-green-600 px-2 py-1 rounded-sm w-fit">
                      ₹{totalDiscount.toFixed(2)} OFF
                    </p>
                    <label className="text-xs font-semibold mt-2 block">Select Size:</label>
                    <select
                      className="border p-2 w-full text-xs mt-1 rounded-lg"
                      value={selectedSizeIndex}
                      onChange={(e) => handleSizeChange(item.id, parseInt(e.target.value))}
                    >
                      {item.sizes.map((size, index) => (
                        <option key={index} value={index}>
                          {size.size} ({size.pricePerUnit})
                        </option>
                      ))}
                    </select>
                    {!cartItem || cartItem.quantity === 0 ? (
                      <button
                        className="mt-2 w-full bg-green-500 text-white py-2 text-sm rounded-lg hover:bg-green-600"
                        onClick={() => handleAddToCart(item.id, 1, selectedSizeIndex)}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="mt-2 flex items-center justify-between border p-2 rounded-lg w-full">
                        <button
                          className="bg-green-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-green-600"
                          onClick={() => handleDecrement(item.id, selectedSizeIndex)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-12 text-center border rounded-lg mx-1"
                          value={cartItem.quantity}
                          min="1"
                          onChange={(e) =>
                            handleManualQuantityChange(
                              item.id,
                              selectedSizeIndex,
                              e
                            )
                          }
                        />
                        <button
                          className="bg-green-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-green-600"
                          onClick={() => handleIncrement(item.id, selectedSizeIndex)}
                        >
                          +
                        </button>
                        <button
                          className="bg-gray-300 text-gray-700 px-3 py-1 ml-2"
                          onClick={() => handleQuantityChange(item.id, selectedSizeIndex, 0)}
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartM;