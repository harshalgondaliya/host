import { createContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { i18n } = useTranslation();

  // Language state
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or use browser's language
    return localStorage.getItem('i18nextLng') || 'en';
  });

  // Function to change language
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem('i18nextLng', lang);

    // For RTL languages like Arabic and Hebrew
    if (lang === 'ar' || lang === 'he') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = lang;
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lang;
    }
  };

  // Set initial language direction
  useEffect(() => {
    if (language === 'ar' || language === 'he') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = language;
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  // Existing state for authentication and user data
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  // New state for cart functionality
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // If the item already exists, update its quantity
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        // If the item doesn't exist, add it to the cart
        return [...prevItems, item];
      }
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Existing function to check authentication state
  const getAuthState = async () => {
    try {
      console.log("Checking authentication state...");
      
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
        withCredentials: true,
        timeout: 8000 // Add timeout to prevent long-hanging requests
      });
      
      console.log("Auth check response:", data);

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      } else {
        setIsLoggedin(false);
        setUserData(null);
        console.log("Auth check failed:", data.message);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      // Don't change isLoggedin state on connection errors
      // Only set to false for auth failures
      if (error.response && error.response.status === 401) {
        setIsLoggedin(false);
        setUserData(null);
      }
    }
  };

  // Existing function to fetch user data
  const getUserData = async () => {
    try {
      console.log("Fetching user data...");
      
      const { data } = await axios.get(backendUrl + '/api/user/data', {
        withCredentials: true,
        timeout: 8000 // Add timeout to prevent long-hanging requests
      });
      
      console.log("User data response:", data);
      
      if (data.success) {
        setUserData(data.userData);
      } else {
        console.error("Failed to fetch user data:", data.message);
        setUserData(null);
      }
    } catch (error) {
      console.error("User data fetch error:", error);
      setUserData(null);
    }
  };

  // Fetch authentication state on component mount
  useEffect(() => {
    getAuthState();
  }, []);

  // Value object to provide to the context
  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    // Cart-related state and functions
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    // Language-related state and functions
    language,
    changeLanguage
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};