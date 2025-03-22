import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { AppContext } from "../context/AppContext";
import { FaTrash, FaArrowLeft } from "react-icons/fa";

const ShoppingCartPage = () => {
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
      alert("Coupon applied successfully! 30% discount added.");
    } else {
      alert("Invalid Coupon Code");
    }
  };

  // Handle increment for an item
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

  const handleQuantityChange = (itemId, itemSize, newQuantity) => {
    if (newQuantity > 0) {
      const updatedItem = {
        ...cartItems.find(
          (item) => item.id === itemId && item.size.value === itemSize.value
        ),
        quantity: newQuantity,
      };
      addToCart(updatedItem);
    } else {
      removeFromCart(itemId, itemSize);
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
  const estimatedTax = 0.0; // 18% tax
  const discountAmount = (subtotalPrice * discount) / 100; // Calculate coupon discount amount
  const orderTotal =
    subtotalPrice + shippingFee + estimatedTax - discountAmount; // Final order total

  return (
    <div className="bg-yellow-400 text-white min-h-screen">
      <Nav totalItems={totalItems} totalPrice={subtotalPrice} />
      
      <div className="max-w-7xl mx-auto p-6 pt-8">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-green-950 font-medium"
          >
            <FaArrowLeft size={16} /> Back
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <main className="w-full lg:w-2/3">
            <h2 className="text-2xl font-bold mb-4 text-green-950">
              Shopping Cart
            </h2>
            {totalItems > 0 ? (
              <div className="space-y-4">
                {cartItems.map(
                  (item) =>
                    item.size && (
                      <div
                        key={`${item.id}-${item.size.value}`}
                        className="bg-green-950 p-5 rounded-lg shadow-md flex flex-col md:flex-row justify-between gap-4"
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
                          <h3 className="font-semibold text-lg">
                            {item.name}
                          </h3>
                          <p className="text-gray-400 text-sm mt-1">Size: {item.size.size} ({item.size.pricePerUnit})</p>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="space-x-1">
                              <span className="text-orange-400 font-bold text-lg">
                                ₹{item.size.cutoffPrice.toFixed(2)}
                              </span>
                              <span className="text-sm line-through text-gray-400">
                                ₹{item.size.originalPrice.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Price and Quantity Controls */}
                        <div className="flex items-center gap-6">
                          <div className="flex items-center border border-gray-700 rounded-full overflow-hidden">
                            <button
                              className="bg-gray-800 text-white w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition-colors"
                              onClick={() => handleDecrement(item.id, item.size)}
                            >
                              -
                            </button>
                            <span className="w-10 text-center text-lg font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              className="bg-gray-800 text-white w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition-colors"
                              onClick={() => handleIncrement(item.id, item.size)}
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold">
                              ₹{(item.size.cutoffPrice * item.quantity).toFixed(2)}
                            </p>
                            <button
                              className="text-red-400 mt-1 flex items-center gap-1 text-sm"
                              onClick={() => removeFromCart(item.id, item.size)}
                            >
                              <FaTrash size={14} /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                )}
                <div className="text-center mt-6">
                  <button
                    className="text-white py-3 px-8 rounded-full bg-green-950 hover:bg-green-900 transition-colors font-semibold"
                    onClick={() => navigate("/cart")}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center p-10 bg-green-950 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4">Your cart is empty</h3>
                <p className="text-gray-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <button
                  className="text-white py-3 px-8 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors font-semibold"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </main>

          {/* Order Summary */}
          <aside className="w-full lg:w-1/3">
            <div className="bg-green-950 p-6 rounded-lg shadow-md sticky top-6">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Items ({totalItems}):</span>
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
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-green-500">FREE</span>
                    ) : (
                      `₹${shippingFee.toFixed(2)}`
                    )}
                  </span>
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

                <hr className="my-3 border-gray-600" />
                <div className="flex justify-between font-bold text-xl text-white">
                  <span>Order Total:</span>
                  <span>₹{orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg mt-6 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>

              {/* Apply Coupon Section */}
              <div className="mt-6 pt-4 border-t border-gray-600">
                <h3 className="text-lg font-bold mb-3">Apply Coupon</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 p-3 border rounded-lg text-black"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors whitespace-nowrap"
                    onClick={applyCoupon}
                  >
                    Apply
                  </button>
                </div>
              </div>
              
              {/* Shipping note */}
              <div className="mt-4 text-sm text-gray-300">
                <p>Free shipping on orders over ₹5,000</p>
                <p className="mt-1">Standard shipping: ₹50</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
