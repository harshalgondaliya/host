import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cartData from "../cart/data.json";
import Nav from "./Nav";
import Aside from "./Aside";
import Footer from "../components/Footer";
import { AppContent } from "../context/AppContext"; // Import your context

import image1 from "../assets/images/products/pineapple.webp";
import image2 from "../assets/images/products/mango.webp";
import image3 from "../assets/images/products/grapes.webp";
import image4 from "../assets/images/products/lychee.webp";
import image5 from "../assets/images/products/strawberry.webp";
import image6 from "../assets/images/sb.webp";
import image7 from "../assets/images/products/pomegranate.webp";

const Cart = () => {
  const imageMap = {
    1: image1,  
    2: image2,
    3: image3,
    4: image4,
    5: image5,
    6: image6,
    7: image7,
  };
  
  
  
  useEffect(() => {
    window.scrollTo(0, 0); // This ensures the page always starts from the top
  }, []);

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

  // Calculate total items and total price
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.size.cutoffPrice,
    0
  );

  return (
    <>
      <div>
        <Nav
          totalItems={totalItems}
          totalPrice={totalPrice}
          onClick={() => navigate("/shopping-cart", { state: { cartItems } })}
          className="fixed top-0 left-0 w-full bg-white shadow-md z-50"
        />
        <br />
        <br />
        <div className="flex">
          <Aside className="top-10 left-0 h-full w-64 bg-gray-100 shadow-lg z-40" />
          <main className="container mx-auto p-4 bg-yellow-400">
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
                const cartItem = cartItems.find(
                  (i) => i.id === `${item.id}-${selectedSizeIndex}`
                );
                const itemPrice = selectedSize.cutoffPrice;

                const totalMRP =
                  selectedSize.originalPrice *
                  (cartItem ? cartItem.quantity : 1);
                const totalTooMore =
                  itemPrice * (cartItem ? cartItem.quantity : 1);
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

                  <img
                    src={imageMap[item.id]} // Use imageMap if item.id exists, otherwise fallback to item.image
                    alt={item.name}
                    className="w-48 h-48 object-contain rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-125 items-center ml-auto mr-auto"
                    onClick={() => item.link && navigate(item.link)}
                    style={{ cursor: item.link ? "pointer" : "default" }}
                  />

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
                    className="w-full bg-green-800 text-white py-2 rounded-lg"
                    onClick={() =>
                      handleAddToCart(item.id, 1, selectedSizeIndex)
                    }
                    >
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
                    &nbsp;Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center border rounded-lg p-1 justify-between">
                    <button
                      className="bg-green-800 text-white px-3 py-1"
                      onClick={() =>
                      handleDecrement(item.id, selectedSizeIndex)
                      }
                    >
                      -
                    </button>

                    <input
                      type="number"
                      className="w-16 text-center border rounded-lg mx-1"
                      value={cartItem.quantity}
                      onChange={(e) =>
                      handleManualQuantityChange(
                        item.id,
                        selectedSizeIndex,
                        e
                      )
                      }
                      min="1"
                    />

                    <button
                      className="bg-green-800 text-white px-3 py-1"
                      onClick={() =>
                      handleIncrement(item.id, selectedSizeIndex)
                      }
                    >
                      +
                    </button>

                    <button
                      className="bg-gray-400 text-gray-950 px-3 py-1 ml-2"
                      onClick={() =>
                      handleQuantityChange(item.id, selectedSizeIndex, 0)
                      } // Fix variable name
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
      <Footer />
    </>
  );
};

export default Cart;
