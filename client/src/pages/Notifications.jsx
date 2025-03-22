import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { FaBell, FaCheckCircle, FaTimesCircle, FaTruck, FaBox } from "react-icons/fa";
import logo from "../assets/logo1.png";

const Notifications = () => {
  const navigate = useNavigate();
  const { isLoggedin, backendUrl } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, unread, order
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Redirect if not logged in
    if (!isLoggedin) {
      navigate("/login");
      return;
    }

    fetchNotifications();
  }, [isLoggedin, navigate, filter, page]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const unreadOnly = filter === "unread";
      const url = `${backendUrl}/api/notifications?page=${page}&limit=10${unreadOnly ? '&unreadOnly=true' : ''}`;
      
      const response = await axios.get(url, {
        withCredentials: true
      });

      if (response.data.success) {
        setNotifications(response.data.notifications);
        setTotalPages(response.data.pagination.pages);
        setUnreadCount(response.data.unreadCount);
      } else {
        throw new Error(response.data.message || "Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Failed to load notifications. Please try again later.");
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await axios.put(`${backendUrl}/api/notifications/${id}/read`, {}, {
        withCredentials: true
      });

      if (response.data.success) {
        // Update the notification in the state
        setNotifications(prevNotifications => 
          prevNotifications.map(notification => 
            notification._id === id ? { ...notification, isRead: true } : notification
          )
        );
        
        // Update unread count
        setUnreadCount(prev => Math.max(0, prev - 1));
        
        toast.success("Notification marked as read");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark notification as read");
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await axios.put(`${backendUrl}/api/notifications/read-all`, {}, {
        withCredentials: true
      });

      if (response.data.success) {
        // Update all notifications to be read
        setNotifications(prevNotifications => 
          prevNotifications.map(notification => ({ ...notification, isRead: true }))
        );
        
        // Reset unread count
        setUnreadCount(0);
        
        toast.success("All notifications marked as read");
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast.error("Failed to mark all notifications as read");
    }
  };

  const deleteNotification = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/notifications/${id}`, {
        withCredentials: true
      });

      if (response.data.success) {
        // Remove the notification from state
        setNotifications(prevNotifications => 
          prevNotifications.filter(notification => notification._id !== id)
        );
        
        // Update unread count if needed
        const deletedNotification = notifications.find(n => n._id === id);
        if (deletedNotification && !deletedNotification.isRead) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
        
        toast.success("Notification deleted");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification");
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order_placed':
        return <FaCheckCircle className="text-green-600 text-xl" />;
      case 'order_shipped':
        return <FaTruck className="text-blue-600 text-xl" />;
      case 'order_delivered':
        return <FaBox className="text-green-800 text-xl" />;
      case 'order_cancelled':
        return <FaTimesCircle className="text-red-600 text-xl" />;
      case 'payment_received':
        return <FaCheckCircle className="text-green-600 text-xl" />;
      default:
        return <FaBell className="text-orange-500 text-xl" />;
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

  const handleViewOrder = (orderId) => {
    if (orderId) {
      navigate(`/account/orders/${orderId}`);
    }
  };

  if (loading && page === 1) {
    return (
      <div className="min-h-screen bg-yellow-400 text-green-950 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Notifications</h1>
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

  return (
    <div className="min-h-screen bg-yellow-400 text-green-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Notifications</h1>
        
        {error ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-red-600">
            <p>{error}</p>
            <button 
              onClick={() => fetchNotifications()} 
              className="mt-4 bg-green-950 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Filter and actions bar */}
              <div className="p-4 bg-green-950 text-white flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center mb-3 sm:mb-0">
                  <FaBell className="mr-2" />
                  <span className="font-medium">
                    {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'No unread notifications'}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <select 
                    value={filter}
                    onChange={(e) => {
                      setFilter(e.target.value);
                      setPage(1); // Reset to first page when changing filter
                    }}
                    className="bg-green-800 text-white py-2 px-3 rounded-md"
                  >
                    <option value="all">All Notifications</option>
                    <option value="unread">Unread Only</option>
                  </select>
                  
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md transition-colors"
                    >
                      Mark All Read
                    </button>
                  )}
                </div>
              </div>
              
              {/* Notifications list */}
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <FaBell className="text-4xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No notifications found</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {notifications.map(notification => (
                    <li 
                      key={notification._id} 
                      className={`p-4 hover:bg-gray-50 transition-colors ${notification.isRead ? '' : 'bg-yellow-50'}`}
                    >
                      <div className="flex items-start">
                        <div className="mr-3">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className={`text-lg font-semibold ${notification.isRead ? 'text-gray-800' : 'text-green-950'}`}>
                              {notification.title}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {formatDate(notification.createdAt)}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mt-1">{notification.message}</p>
                          
                          <div className="mt-2 flex flex-wrap gap-2">
                            {notification.orderId && (
                              <button
                                onClick={() => handleViewOrder(notification.orderId)}
                                className="text-sm bg-green-950 text-white px-3 py-1 rounded-md hover:bg-green-800 transition-colors"
                              >
                                View Order
                              </button>
                            )}
                            
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification._id)}
                                className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                              >
                                Mark as Read
                              </button>
                            )}
                            
                            <button
                              onClick={() => deleteNotification(notification._id)}
                              className="text-sm bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                  
                </ul>
              )}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 p-4 bg-gray-50">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                    className={`px-3 py-1 rounded-md ${page === 1 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-green-950 text-white hover:bg-green-800'} transition-colors`}
                  >
                    Previous
                  </button>
                  
                  <span className="px-3 py-1">
                    Page {page} of {totalPages}
                  </span>
                  
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                    className={`px-3 py-1 rounded-md ${page === totalPages 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-green-950 text-white hover:bg-green-800'} transition-colors`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center mt-2">
        <button 
          onClick={() => navigate('/')}
          className="py-2 px-4 bg-green-950 text-white rounded-md hover:bg-green-800 transition-colors text-sm"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Notifications; 