import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { FaArrowLeft, FaBox, FaTruck, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Import product images
import skyberryImage from "../../assets/images/sb.webp";
import grapesImage from "../../assets/images/products/grapes.webp";
import pineappleImage from "../../assets/images/products/pineapple.webp";
import mangoImage from "../../assets/images/products/mango.webp";
import lycheeImage from "../../assets/images/products/lychee.webp";
import strawberryImage from "../../assets/images/products/strawberry.webp";
import pomegranateImage from "../../assets/images/products/Pomegranate.webp";


const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { isLoggedin, backendUrl } = useContext(AppContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect if not logged in
    if (!isLoggedin) {
      navigate("/login");
      return;
    }

    console.log("OrderDetails component mounted with orderId:", orderId);
    fetchOrderDetails();
  }, [isLoggedin, orderId]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      // Add console.log to debug
      console.log("Fetching order:", orderId);
      
      const response = await axios.get(`${backendUrl}/api/orders/${orderId}`, {
        withCredentials: true
      });

      if (response.data.success) {
        console.log("Order data received:", response.data.order);
        
        // Log all items to help debug product identification
        if (response.data.order && response.data.order.items) {
          console.log("Order items:", response.data.order.items.map(item => ({
            id: item.id,
            name: item.name
          })));
        }
        
        setOrder(response.data.order);
      } else {
        throw new Error(response.data.message || "Failed to fetch order details");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError("Failed to load order details. Please try again later.");
      toast.error("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const getOrderStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaCheckCircle className="text-green-600 text-xl" />;
      case 'processing':
        return <FaMoneyBillWave className="text-yellow-600 text-xl" />;
      case 'shipped':
        return <FaTruck className="text-blue-600 text-xl" />;
      case 'delivered':
        return <FaBox className="text-green-800 text-xl" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-600 text-xl" />;
      default:
        return <FaCheckCircle className="text-green-600 text-xl" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Helper function to get product image based on product ID
  const getProductImage = (productId) => {
    console.log("Getting product image for ID:", productId);
    
    const normalizedId = productId.toLowerCase();
    
    if (normalizedId.includes('skyberry') || normalizedId.includes('sky') || normalizedId.includes('sb')) {
      console.log("Resolved to Skyberry image");
      return skyberryImage;
    } else if (normalizedId.includes('grape') || normalizedId.includes('gr')) {
      console.log("Resolved to Grapes image");
      return grapesImage;
    } else if (normalizedId.includes('pineapple') || normalizedId.includes('pine')) {
      console.log("Resolved to Pineapple image");
      return pineappleImage;
    } else if (normalizedId.includes('mango')) {
      console.log("Resolved to Mango image");
      return mangoImage;
    } else if (normalizedId.includes('lychee')) {
      console.log("Resolved to Lychee image");
      return lycheeImage;
    } else if (normalizedId.includes('strawberry') || normalizedId.includes('straw')) {
      console.log("Resolved to Strawberry image");
      return strawberryImage;
    } else if (normalizedId.includes('pomegranate') || normalizedId.includes('pome')) {
      console.log("Resolved to Pomegranate image");
      return pomegranateImage;
    }
    
    // Default image if no match
    console.log("No match found, using default Skyberry image");
    return skyberryImage;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-yellow-400 text-green-950 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Order Details</h1>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-yellow-400 text-green-950 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Order Details</h1>
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-red-600">
            <p>{error}</p>
            <button 
              onClick={() => fetchOrderDetails()} 
              className="mt-4 bg-green-950 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-yellow-400 text-green-950 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Order Details</h1>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p>Order not found.</p>
            <button 
              onClick={() => navigate('/account/notifications')} 
              className="mt-4 bg-green-950 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors"
            >
              Back to Notifications
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-400 text-green-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/account/notifications')} 
            className="text-green-950 hover:text-green-800 mr-4"
          >
            <FaArrowLeft className="text-2xl" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold">Order Details</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Order Header */}
          <div className="p-4 bg-green-950 text-white flex flex-wrap justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Order #{order.orderId || order._id}</h2>
              <p className="text-sm">Placed on {formatDate(order.orderDate || order.createdAt)}</p>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              {getOrderStatusIcon(order.status)}
              <span className="ml-2 font-medium capitalize">{order.status}</span>
            </div>
          </div>
          
          {/* Shipping Info */}
          <div className="p-4 border-b">
            <h3 className="font-semibold mb-2">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p>{order.customer.address}</p>
                <p>{order.customer.city}, {order.customer.state} {order.customer.postalCode}</p>
                <p>{order.customer.country}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact</p>
                <p>{order.customer.firstName} {order.customer.lastName}</p>
                <p>{order.customer.phone}</p>
                <p>{order.customer.email}</p>
              </div>
            </div>
          </div>
          
          {/* Order Items */}
          <div className="p-4">
            <h3 className="font-semibold mb-2">Order Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600">Product</th>
                    <th className="px-4 py-2 text-left text-gray-600">Size</th>
                    <th className="px-4 py-2 text-left text-gray-600">Qty</th>
                    <th className="px-4 py-2 text-left text-gray-600">Price</th>
                    <th className="px-4 py-2 text-left text-gray-600">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {order.items.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                            <img 
                              src={getProductImage(item.id)}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                console.error(`Failed to load image for product: ${item.id}`);
                                e.target.onerror = null;
                                e.target.src = skyberryImage;
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{item.size.size} ({item.size.value})</td>
                      <td className="px-4 py-3">{item.quantity}</td>
                      <td className="px-4 py-3">{formatCurrency(item.price)}</td>
                      <td className="px-4 py-3">{formatCurrency(item.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="p-4 bg-gray-50">
            <div className="flex flex-col items-end">
              <div className="w-full max-w-xs">
                <div className="flex justify-between py-1">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.pricing.subtotal)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Shipping</span>
                  <span>{formatCurrency(order.pricing.shipping)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Tax</span>
                  <span>{formatCurrency(order.pricing.tax)}</span>
                </div>
                {order.pricing.discount > 0 && (
                  <div className="flex justify-between py-1 text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(order.pricing.discount)}</span>
                  </div>
                )}
                {order.pricing.totalSavings > 0 && (
                  <div className="flex justify-between py-1 text-green-600">
                    <span>Total Savings</span>
                    <span>{formatCurrency(order.pricing.totalSavings)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 font-semibold border-t mt-2">
                  <span>Total</span>
                  <span>{formatCurrency(order.pricing.orderTotal)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment Info */}
          <div className="p-4 border-t">
            <h3 className="font-semibold mb-2">Payment Information</h3>
            <p><span className="text-gray-600">Method:</span> {order.paymentMethod}</p>
            <p><span className="text-gray-600">Status:</span> <span className="capitalize">{order.status}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 