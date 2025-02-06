import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { AppContent } from "../context/AppContext"; // Import your context

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useContext(AppContent); // Use cartItems and functions from context
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    if (coupon === "TOOMOREOFFER") {
      setDiscount(30); // Apply 10% discount
    } else {
      alert("Invalid Coupon Code");
    }
  };

  // Handle increment for an item
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

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      const updatedItem = { ...cartItems.find((item) => item.id === itemId), quantity: newQuantity };
      addToCart(updatedItem); // Update the item
    } else if (newQuantity === 0) {
      removeFromCart(itemId); // Remove the item if quantity is 0
    } else {
      alert("Quantity cannot be less than 1");
    }
  };

  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalPrice = cartItems.reduce(
    (sum, item) =>
      item.size ? sum + item.quantity * item.size.cutoffPrice : sum,
    0
  );

  // Calculate total savings (total discount)
  const totalSavings = cartItems.reduce(
    (sum, item) =>
      item.size
        ? sum +
          item.quantity * (item.size.originalPrice - item.size.cutoffPrice)
        : sum,
    0
  );

  const shippingFee = subtotalPrice >= 5000 ? 0 : 50; // Free shipping for orders above ₹5000
  const estimatedTax = subtotalPrice * 0.18; // 18% tax
  const discountAmount = (subtotalPrice * discount) / 100; // Calculate coupon discount amount
  const orderTotal =
    subtotalPrice + shippingFee + estimatedTax - totalSavings - discountAmount; // Final order total

  return (
    <div className="min-h-screen bg-yellow-400 text-white">
      <Nav totalItems={totalItems} totalPrice={subtotalPrice} />
      <br />
      <br />
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto mt-6 gap-6 p-4">
        {/* Cart Items */}
        <main className="lg:w-3/4">
          <h2 className="text-2xl font-bold mb-4 text-green-950">Shopping Cart</h2>
          {totalItems > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item, index) =>
                item.size ? (
                  <div
                    key={index}
                    className="bg-green-950 p-4 rounded-lg shadow-md flex flex-col lg:flex-row justify-between items-center gap-4"
                  >
                    {/* Item Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>

                    {/* Price and Quantity Controls */}
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-lg font-semibold">
                        ₹{(item.size.cutoffPrice * item.quantity).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          className="bg-gray-700 text-white w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
                          onClick={() => handleDecrement(item.id)}
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          className="bg-gray-700 text-white w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
                          onClick={() => handleIncrement(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          ) : (
            <div className="text-center p-10 bg-green-950 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Your cart is empty</h3>
              <button
                className="text-white py-2 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors"
                onClick={() => navigate("/cart")}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </main>

        {/* Order Summary */}
          <aside className="lg:w-1/4 bg-green-950 p-6 rounded-lg shadow-md fixed top-0 right-0 h-full overflow-y-auto">
          <br /><br /><br /><br /><br /><br />
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="mb-4">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal Price:</span>
                <span>₹{subtotalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Estimated Tax (18%):</span>
                <span>₹{estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping Fee:</span>
                <span>₹{shippingFee.toFixed(2)}</span>
              </div>

              {/* Display Total Savings */}
            <div className="flex justify-between text-green-500">
              <span>Total Savings:</span>
              <span>-₹{totalSavings.toFixed(2)}</span>
            </div>

            {/* Display Coupon Discount */}
            {discount > 0 && (
              <div className="flex justify-between text-red-500">
                <span>Coupon Discount ({discount}%):</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <hr className="my-2 border-gray-600" />
            <div className="flex justify-between font-bold text-lg text-white">
              <span>Order Total:</span>
              <span>₹{orderTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg mt-4 transition-colors"
          >
            Proceed to Checkout
          </button>

          {/* Apply Coupon Section */}
          <div className="mt-4 p-4 border-t border-gray-600">
            <h3 className="text-lg font-bold mb-2">Apply Coupon</h3>
            <input
              type="text"
              className="w-full p-2 border rounded-lg text-black"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg mt-2 transition-colors"
              onClick={applyCoupon}
            >
              Apply Coupon
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ShoppingCartPage;