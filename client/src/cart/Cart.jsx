import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import cartData from "../cart/data.json";
import Nav from "./Nav";
import Aside from "./Aside";
// Import Footer directly instead of lazy loading
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext"; // Import your context

// Updated image imports to use enhanced image optimization
import OptimizedImage, { loadImage, ImageCache } from "../components/ImageOptimizer";

// Image paths - define once to avoid recreating array on each render
const imagePaths = [
  "../assets/images/products/pineapple.webp",
  "../assets/images/products/mango.webp",
  "../assets/images/products/grapes.webp",
  "../assets/images/products/lychee.webp",
  "../assets/images/products/strawberry.webp",
  "../assets/images/sb.webp",
  "../assets/images/products/Pomegranate.webp"
];

// Map image paths to product IDs
const imagePathsById = {
  1: "../assets/images/products/pineapple.webp",
  2: "../assets/images/products/mango.webp",
  3: "../assets/images/products/grapes.webp",
  4: "../assets/images/products/lychee.webp",
  5: "../assets/images/products/strawberry.webp",
  6: "../assets/images/sb.webp",
  7: "../assets/images/products/Pomegranate.webp"
};

const Cart = () => {
  const [isVisible, setIsVisible] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const navigate = useNavigate();

  // Use cart state and functions from context
  const { cartItems, addToCart, removeFromCart } = useContext(AppContext);

  // Use Intersection Observer for lazy loading images
  useEffect(() => {
    // Check if browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting,
            }));
          });
        },
        { 
          rootMargin: '200px', // Load images when they're 200px from viewport
          threshold: 0.1 
        }
      );

      document.querySelectorAll(".product-card").forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      setIsVisible(
        Array.from(document.querySelectorAll(".product-card")).reduce(
          (acc, el) => ({ ...acc, [el.id]: true }),
          {}
        )
      );
    }
  }, []);

  // Preload critical images when component mounts
  useEffect(() => {
    window.scrollTo(0, 0); // Ensure page starts from top
    
    // Preload all product images
    ImageCache.preload(Object.values(imagePathsById));
  }, []);

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

  // Memoize cart item calculations
  const cartItemDetails = React.useMemo(() => {
    return cartData.products.subJuice.map(item => {
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

      return {
        item,
        selectedSizeIndex,
        selectedSize,
        cartItem,
        totalMRP,
        totalTooMore,
        totalDiscount
      };
    });
  }, [cartItems, selectedSizes]);

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
              {cartItemDetails.map(({
                item, 
                selectedSizeIndex, 
                selectedSize, 
                cartItem, 
                totalMRP, 
                totalTooMore, 
                totalDiscount
              }) => (
                <div
                  id={`product-${item.id}`}
                  key={item.id}
                  className="product-card border border-gray-500 rounded-lg shadow p-4 flex flex-col bg-white"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold">
                      {item.description}
                    </h3>
                    {item.vegetarianSymbol && (
                      <div className="flex items-center mt-2">
                        <img
                          src="https://content.dmart.in/website/_next/static/media/veg.fd2bc51a.svg"
                          alt="Vegetarian Symbol"
                          className="h-10 w-10"
                          width="40"
                          height="40"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>

                  <div className="w-48 h-48 mx-auto relative">
                    {isVisible[`product-${item.id}`] && (
                      <OptimizedImage
                        src={loadImage(imagePathsById[item.id])}
                        alt={item.name}
                        className="w-full h-full object-contain rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-125"
                        onClick={() => item.link && navigate(item.link)}
                        width={192}
                        height={192}
                        style={{ cursor: item.link ? "pointer" : "default" }}
                        loadingPriority="lazy"
                      />
                    )}
                  </div>

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
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex justify-between items-center border rounded-lg p-2">
                      <button
                        className="bg-green-800 text-white px-3 py-1 rounded-lg"
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
                        min="1"
                        onChange={(e) =>
                          handleManualQuantityChange(
                            item.id,
                            selectedSizeIndex,
                            e
                          )
                        }
                      />
                      <button
                        className="bg-green-800 text-white px-3 py-1 rounded-lg"
                        onClick={() =>
                          handleIncrement(item.id, selectedSizeIndex)
                        }
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
        <br />
        <br />
        <Footer />
      </div>
    </>
  );
};

export default Cart;
