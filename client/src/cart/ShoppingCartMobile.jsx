import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { AppContext } from "../context/AppContext";

const ShoppingCartMobile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useContext(AppContext);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    if (coupon === "TOOMOREOFFER") {
      setDiscount(30);
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

  return (
    <div className="min-h-screen bg-yellow-400 text-white p-4">
      <Nav totalItems={cartItems.length} totalPrice={subtotalPrice} />
      <h2 className="text-lg font-bold text-center mt-4">Shopping Cart</h2>

      {cartItems.length > 0 ? (
        <div className="space-y-4 mt-4">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size.value}`}
              className="bg-green-950 p-3 rounded-lg shadow-md flex items-center justify-between"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1 ml-2">
                <h3 className="text-sm font-semibold">
                  {item.name}&nbsp; : &nbsp; ({item.size.size})
                </h3>
                <p className="text-gray-400">{item.description}</p>
                <p className="text-xs">
                  ₹{(item.size.cutoffPrice * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="bg-gray-700 text-white px-3 py-1 rounded text-lg"
                  onClick={() => handleDecrement(item.id, item.size)}
                >
                  −
                </button>
                <span className="text-sm font-bold">{item.quantity}</span>
                <button
                  className="bg-gray-700 text-white px-3 py-1 rounded text-lg"
                  onClick={() => handleIncrement(item.id, item.size)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="text-center ">
            <button
              className="text-white py-2 px-4 rounded-lg bg-green-950 hover:bg-orange-600 transition-colors"
              onClick={() => navigate("/cart")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center p-6 bg-green-950 rounded-lg shadow-md mt-4">
          <h3 className="text-lg font-bold mb-4">Your cart is empty</h3>
          <button
            className="text-white py-2 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors"
            onClick={() => navigate("/cart")}
          >
            Continue Shopping
          </button>
        </div>
      )}

      {/* Order Summary */}
      <div className="my-[10px] bg-green-950 p-9 rounded-lg">
        <h3 className="text-lg font-bold">Order Summary</h3><br />
        <div className="flex justify-between text-gray-300">
          <span>Original Price:</span>
          <span>
            ₹
            {cartItems
              .reduce(
                (sum, item) => sum + item.quantity * item.size.originalPrice,
                0
              )
              .toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Estimated Tax (18%):</span>
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
        <hr className="my-2" />
        <p className="flex justify-between font-bold text-lg text-white">
          <span>Order Total:</span>
          <span>₹{orderTotal.toFixed(2)}</span>
        </p>
      </div>

      {/* Checkout & Coupon Section */}
      <button
        onClick={() => navigate("/checkout")}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg mt-4 transition-colors"
      >
        Proceed to Checkout
      </button>

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
    </div>
  );
};

export default ShoppingCartMobile;
