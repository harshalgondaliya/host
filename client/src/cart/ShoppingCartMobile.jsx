import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { AppContext } from "../context/AppContext";
import { FaTrash, FaArrowLeft } from "react-icons/fa";

const ShoppingCartMobile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useContext(AppContext);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const applyCoupon = () => {
    if (coupon === "TOOMOREOFFER") {
      setDiscount(30);
      alert("Coupon applied successfully! 30% discount added.");
    } else {
      alert("Invalid Coupon Code");
    }
  };

  const handleIncrement = (itemId, itemSize) => {
    addToCart({
      ...cartItems.find(
        (item) => item.id === itemId && item.size.value === itemSize.value
      ),
      quantity: 1,
    });
  };

  const handleDecrement = (itemId, itemSize) => {
    const existingItem = cartItems.find(
      (item) => item.id === itemId && item.size.value === itemSize.value
    );

    if (existingItem && existingItem.quantity > 1) {
      addToCart({ ...existingItem, quantity: -1 });
    } else {
      removeFromCart(itemId, itemSize);
    }
  };

  // Calculate totals
  const subtotalPrice = cartItems.reduce(
    (sum, item) =>
      item.size ? sum + item.quantity * item.size.cutoffPrice : sum,
    0
  );

  const totalSavings = cartItems.reduce(
    (sum, item) =>
      item.size
        ? sum +
          item.quantity * (item.size.originalPrice - item.size.cutoffPrice)
        : sum,
    0
  );

  const estimatedTax = 0.0; // 18% tax
  const shippingFee = subtotalPrice >= 5000 ? 0 : 50;
  const discountAmount = (subtotalPrice * discount) / 100;
  const orderTotal =
    subtotalPrice + shippingFee + estimatedTax - discountAmount;

  const toggleOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };

  return (
    <div className="min-h-screen bg-yellow-400 text-white pb-6">
      <Nav totalItems={cartItems.length} totalPrice={subtotalPrice} />
      <br /><br /><br />
      
      {/* Back button and title */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h2 className="text-xl font-bold text-green-950">Shopping Cart</h2>
        <div className="w-8"></div> {/* Spacing element for balance */}
      </div>

      {/* Cart items section */}
      {cartItems.length > 0 ? (
        <div className="space-y-3 mt-2 px-4">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size.value}`}
              className="bg-green-950 p-3 rounded-lg shadow-md flex items-start gap-3 relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-400">Size: {item.size.size}</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-orange-400 font-bold">
                    ₹{item.size.cutoffPrice.toFixed(2)}
                  </p>
                  <p className="text-xs line-through text-gray-400">
                    ₹{item.size.originalPrice.toFixed(2)}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-gray-600 rounded-full overflow-hidden">
                    <button
                      className="bg-gray-800 text-white px-3 py-1"
                      onClick={() => handleDecrement(item.id, item.size)}
                    >
                      −
                    </button>
                    <span className="px-3 text-sm font-bold">{item.quantity}</span>
                    <button
                      className="bg-gray-800 text-white px-3 py-1"
                      onClick={() => handleIncrement(item.id, item.size)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-red-400 p-1"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center mt-4">
            <button
              className="text-white py-2 px-6 rounded-full bg-green-950 hover:bg-orange-600 transition-colors font-medium"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-green-950 rounded-lg shadow-md mx-4 mt-4">
          <h3 className="text-lg font-bold mb-4">Your cart is empty</h3>
          <button
            className="text-white py-2 px-6 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      )}

      {/* Order Summary Toggle Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-950 py-3 px-4 flex justify-between items-center shadow-lg" onClick={toggleOrderSummary}>
        <div>
          <p className="text-sm text-gray-300">Total Amount</p>
          <p className="text-lg font-bold">₹{orderTotal.toFixed(2)}</p>
        </div>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-5 rounded-full font-semibold transition-colors"
          onClick={() => navigate("/checkout")}
        >
          Checkout Now
        </button>
      </div>

      {/* Expandable Order Summary */}
      {showOrderSummary && (
        <div className="fixed bottom-16 left-0 right-0 bg-green-950 p-4 rounded-t-xl shadow-lg animate-slide-up z-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold">Order Summary</h3>
            <button className="text-gray-400" onClick={toggleOrderSummary}>
              Close
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Original Price:</span>
              <span>
                ₹
                {cartItems
                  .reduce(
                    (sum, item) =>
                      sum + item.quantity * item.size.originalPrice,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Estimated Tax:</span>
              <span>₹{estimatedTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Shipping Fee:</span>
              <span>₹{shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-500">
              <span>Total Savings:</span>
              <span>-₹{totalSavings.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-red-500">
                <span>Coupon Discount ({discount}%):</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <hr className="my-2 border-gray-600" />
            <p className="flex justify-between font-bold text-lg text-white">
              <span>Order Total:</span>
              <span>₹{orderTotal.toFixed(2)}</span>
            </p>
          </div>

          {/* Coupon Section */}
          <div className="mt-4 pt-3 border-t border-gray-600">
            <h3 className="text-sm font-bold mb-2">Apply Coupon</h3>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 rounded-lg text-black"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                onClick={applyCoupon}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add some space at the bottom to prevent content being hidden by the fixed button */}
      <div className="h-16"></div>
    </div>
  );
};

export default ShoppingCartMobile;
