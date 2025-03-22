import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Nav from "../cart/Nav";
import CheckoutNav from "../components/CheckoutNav";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, backendUrl, userData, isLoggedin } = useContext(AppContext);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    paymentMethod: "cod",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });
  
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate order summary
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
  
  const shippingFee = subtotalPrice >= 5000 ? 0 : 50;
  const estimatedTax = 0.0; // 18% tax
  const discountAmount = (subtotalPrice * discount) / 100; // Calculate coupon discount amount
  const orderTotal = subtotalPrice + shippingFee + estimatedTax - discountAmount;

  // Apply coupon function
  const applyCoupon = () => {
    if (coupon === "TOOMOREOFFER") {
      setDiscount(30); // Apply 30% discount
    } else {
      alert("Invalid Coupon Code");
    }
  };

  useEffect(() => {
    // Redirect to cart if there are no items
    if (cartItems.length === 0 && !orderPlaced) {
      navigate("/shopping-cart");
    }

    // Pre-fill user information if logged in
    if (isLoggedin && userData) {
      setFormData(prevData => ({
        ...prevData,
        firstName: userData.firstName || prevData.firstName,
        lastName: userData.lastName || prevData.lastName,
        email: userData.email || prevData.email,
        phone: userData.phone || prevData.phone,
      }));
    }
  }, [cartItems, navigate, orderPlaced, isLoggedin, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    else if (!/^\d{6}$/.test(formData.postalCode)) newErrors.postalCode = "Postal code must be 6 digits";

    // Payment method validation
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) 
        newErrors.cardNumber = "Card number must be 16 digits";
      if (!formData.cardHolder.trim()) newErrors.cardHolder = "Card holder name is required";
      if (!formData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required";
      else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) 
        newErrors.expiryDate = "Expiry date must be in MM/YY format";
      if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
      else if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = "CVV must be 3 digits";
    } else if (formData.paymentMethod === "upi") {
      if (!formData.upiId.trim()) newErrors.upiId = "UPI ID is required";
      else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(formData.upiId)) 
        newErrors.upiId = "Invalid UPI ID format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Generate a random order ID
        const randomOrderId = "ORDER" + Math.floor(Math.random() * 1000000);
        setOrderId(randomOrderId);
        
        // Create order object with all relevant details
        const orderDetails = {
          orderId: randomOrderId,
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country
          },
          paymentMethod: formData.paymentMethod,
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            size: {
              size: item.size.size,
              value: item.size.value || item.size.size,
              cutoffPrice: item.size.cutoffPrice,
              originalPrice: item.size.originalPrice
            },
            quantity: item.quantity,
            price: item.size.cutoffPrice,
            subtotal: item.size.cutoffPrice * item.quantity
          })),
          pricing: {
            subtotal: subtotalPrice,
            shipping: shippingFee,
            tax: estimatedTax,
            discount: discountAmount,
            totalSavings: totalSavings,
            orderTotal: orderTotal
          },
          userId: userData?.id || null,
          orderDate: new Date().toISOString()
        };
        
        // Store order in database and send email
        let response;
        if (isLoggedin) {
          // If user is logged in, associate the order with their account
          response = await axios.post(`${backendUrl}/api/orders/create`, orderDetails, {
            withCredentials: true
          });
        } else {
          // For guest checkout
          response = await axios.post(`${backendUrl}/api/orders/guest-checkout`, orderDetails);
        }
        
        if (response.data.success) {
          // Show success toast
          toast.success("Order placed successfully!");
          setOrderPlaced(true);
          
          // Clear the cart after order is successfully placed
          setTimeout(() => {
            clearCart();
          }, 1000);
        } else {
          throw new Error(response.data.message || "Failed to place order");
        }
      } catch (error) {
        console.error("Order placement error:", error);
        
        let errorMessage = "Failed to place order. Please try again.";
        
        if (error.response) {
          // Server responded with an error status code
          if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.status === 500) {
            errorMessage = "Server error. Please try again later.";
          } else if (error.response.status === 401) {
            errorMessage = "Authentication required. Please log in again.";
          }
        } else if (error.request) {
          // Request was made but no response received
          errorMessage = "No response from server. Please check your connection.";
        } else if (error.message) {
          // Error with request setup
          errorMessage = error.message;
        }
        
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-yellow-400 text-green-950 py-6 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 md:p-8">
          <div className="text-center">
            <div className="mb-6">
              <svg className="w-16 h-16 md:w-24 md:h-24 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Order Confirmed!</h2>
            <p className="text-lg md:text-xl mb-6">Thank you for your purchase.</p>
            <div className="mb-8">
              <p className="text-gray-700">Your order ID: <span className="font-bold">{orderId}</span></p>
              <p className="text-gray-700 mt-2">We've sent a confirmation email to {formData.email}</p>
              <p className="text-gray-700 mt-2">You will receive your order in 3-5 business days.</p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="bg-green-950 text-white py-2 px-4 md:py-3 md:px-6 rounded-lg hover:bg-green-800 transition-colors"
              >
                Continue Shopping
              </button>
              {isLoggedin && (
                <button
                  onClick={() => navigate("/account/orders")}
                  className="bg-orange-500 text-white py-2 px-4 md:py-3 md:px-6 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  View Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-400 text-green-950 py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">Checkout</h1>
        
        <div className="mb-4">
          <Nav totalItems={cartItems.length} totalPrice={orderTotal} />
        </div>
        
        <div className="mb-4">
          <CheckoutNav />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Order Summary - Shows first on mobile */}
          <div className="w-full lg:w-1/3 order-1 mb-4 lg:mb-0">
            <div className="bg-green-950 text-white rounded-lg shadow-md p-4 md:p-6 lg:sticky lg:top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              {/* Items */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Items ({cartItems.length})</h3>
                <div className="space-y-3 max-h-40 md:max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item?.size?.value}`} className="flex justify-between">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded mr-2"
                        />
                        <div>
                          <p className="text-sm">{item.name} {item?.size?.size}</p>
                          <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p>₹{(item?.size?.cutoffPrice * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Details */}
              <div className="mb-4">
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
                  <span>Estimated Tax (18%):</span>
                  <span>₹{estimatedTax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-300">
                  <span>Shipping Fee:</span>
                  <span>{shippingFee === 0 ? "Free" : `₹${shippingFee.toFixed(2)}`}</span>
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
              
              {/* Apply Coupon Section */}
              <div className="mt-4 p-3 md:p-4 border-t border-green-800">
                <h3 className="text-lg font-bold mb-2">Apply Coupon</h3>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg text-black"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                    onClick={applyCoupon}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Checkout Form - Shows second on mobile */}
          <div className="w-full lg:w-2/3 order-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="firstName">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="lastName">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="phone">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1" htmlFor="address">
                  Address*
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="city">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="state">
                    State*
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="postalCode">
                    Postal Code*
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="country">
                    Country*
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Payment Method</h2>
              
              <div className="mb-6">
                <div className="flex flex-col space-y-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span>Credit/Debit Card</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === "upi"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span>UPI</span>
                  </label>
                </div>
              </div>
              
              {formData.paymentMethod === "card" && (
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="cardNumber">
                      Card Number*
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full p-2 border rounded-md ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="cardHolder">
                      Card Holder Name*
                    </label>
                    <input
                      type="text"
                      id="cardHolder"
                      name="cardHolder"
                      value={formData.cardHolder}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.cardHolder ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.cardHolder && <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="expiryDate">
                        Expiry Date (MM/YY)*
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={`w-full p-2 border rounded-md ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="cvv">
                        CVV*
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className={`w-full p-2 border rounded-md ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}
              
              {formData.paymentMethod === "upi" && (
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="upiId">
                      UPI ID*
                    </label>
                    <input
                      type="text"
                      id="upiId"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      placeholder="yourname@upi"
                      className={`w-full p-2 border rounded-md ${errors.upiId ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => navigate("/shopping-cart")}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors w-full sm:w-auto order-2 sm:order-1"
                >
                  Back to Cart
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-green-950 text-white py-2 px-6 rounded-md hover:bg-green-800 transition-colors w-full sm:w-auto order-1 sm:order-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 