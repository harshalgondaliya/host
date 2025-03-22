import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const NotificationBell = () => {
  const { isLoggedin, backendUrl } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  // Fetch user notifications
  const fetchNotifications = async () => {
    if (!isLoggedin) return;
    
    try {
      setIsLoading(true);
      const response = await axios.get(`${backendUrl}/api/notifications`, {
        withCredentials: true
      });
      
      if (response.data.success) {
        console.log('Notifications received:', response.data.notifications);
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.unreadCount);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      const response = await axios.put(`${backendUrl}/api/notifications/${id}/read`, {}, {
        withCredentials: true
      });
      
      if (response.data.success) {
        // Update local state
        setNotifications(prev => 
          prev.map(notification => 
            notification._id === id 
              ? { ...notification, isRead: true } 
              : notification
          )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const response = await axios.put(`${backendUrl}/api/notifications/read-all`, {}, {
        withCredentials: true
      });
      
      if (response.data.success) {
        // Update local state
        setNotifications(prev => 
          prev.map(notification => ({ ...notification, isRead: true }))
        );
        setUnreadCount(0);
        toast.success('All notifications marked as read');
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast.error('Failed to mark notifications as read');
    }
  };

  // Handle clicking outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch notifications on initial load and when login status changes
  useEffect(() => {
    if (isLoggedin) {
      fetchNotifications();
    }
  }, [isLoggedin]);

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    if (!isLoggedin) return;
    
    const intervalId = setInterval(fetchNotifications, 30000);
    
    return () => clearInterval(intervalId);
  }, [isLoggedin]);

  // Format the timestamp to readable format
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'just now';
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString();
  };

  // If user is not logged in, don't show the notification bell
  if (!isLoggedin) return null;

  return (
    <div className="relative" ref={notificationRef}>
      {/* Notification Bell */}
      <button
        className="relative p-1 text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        {/* Notification Counter */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      
      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
          <div className="py-2 px-3 bg-green-950 text-white flex justify-between items-center">
            <h3 className="text-sm font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs bg-green-700 hover:bg-green-600 py-1 px-2 rounded"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="py-3 px-4 text-center text-gray-500">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-3 px-4 text-center text-gray-500">
                No notifications yet
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification._id}
                  className={`border-b border-gray-100 last:border-0 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                  onClick={() => {
                    if (!notification.isRead) {
                      markAsRead(notification._id);
                    }
                    
                    // Navigate to order if it's an order notification
                    if (notification.orderId && notification.type.includes('order')) {
                      console.log('Navigating to order:', notification.orderId);
                      navigate(`/account/orders/${notification.orderId}`);
                    }
                    
                    setIsOpen(false);
                  }}
                >
                  <div className="py-3 px-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-semibold">{notification.title}</h4>
                      <span className="text-xs text-gray-500">{formatTimeAgo(notification.createdAt)}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {notifications.length > 0 && (
            <div className="py-2 px-4 bg-gray-50 text-center">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/account/notifications');
                  setIsOpen(false);
                }}
                className="text-xs text-green-950 hover:underline"
              >
                View all notifications
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
