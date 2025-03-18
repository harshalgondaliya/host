import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cartData from "../cart/data.json";
import Nav from "./Nav";
import { AppContext } from "../context/AppContext";
// Import Footer directly instead of lazy loading
import Footer from "../components/Footer";

// Updated image imports to use enhanced image optimization
import OptimizedImage, {
  loadImage,
  ImageCache,
} from "../components/ImageOptimizer";

// Image paths mapped to IDs for consistent reference
const imagePathsById = {
  1: "../assets/images/products/pineapple.webp",
  2: "../assets/images/products/mango.webp",
  3: "../assets/images/products/grapes.webp",
  4: "../assets/images/products/lychee.webp",
  5: "../assets/images/products/strawberry.webp",
  6: "../assets/images/sb.webp",
  7: "../assets/images/products/Pomegranate.webp",
};

const CartM = () => {
  const [isVisible, setIsVisible] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useContext(AppContext);

  // Set up Intersection Observer for lazy loading images
  useEffect(() => {
    window.scrollTo(0, 0);

    // Check if browser supports IntersectionObserver
    if ("IntersectionObserver" in window) {
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
          rootMargin: "200px", // Load images when they're 200px from viewport
          threshold: 0.1,
        }
      );

      document.querySelectorAll(".product-card-mobile").forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      setIsVisible(
        Array.from(document.querySelectorAll(".product-card-mobile")).reduce(
          (acc, el) => ({ ...acc, [el.id]: true }),
          {}
        )
      );
    }
  }, []);

  // Preload critical images
  useEffect(() => {
    // Preload images that will be visible in the initial viewport
    const firstVisibleImages = Object.values(imagePathsById).slice(0, 2);
    ImageCache.preload(firstVisibleImages).then(() => {
      // After initial images are loaded, preload the rest in the background
      ImageCache.preload(Object.values(imagePathsById).slice(2));
    });
  }, []);

  const handleSizeChange = (itemId, sizeIndex) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [itemId]: sizeIndex,
    }));

    const cartId = `${itemId}-${sizeIndex}`;
    const existingItem = cartItems.find((item) => item.productId === itemId);

    if (existingItem) {
      removeFromCart(existingItem.id); // Remove old size selection
      handleAddToCart(itemId, existingItem.quantity, sizeIndex); // Add new size
    }
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

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.size.cutoffPrice,
    0
  );

  // Memoize cart item calculations for better performance
  const cartItemDetails = React.useMemo(() => {
    return cartData.products.subJuice.map((item) => {
      const selectedSizeIndex = selectedSizes[item.id] || 0;
      const selectedSize = item.sizes[selectedSizeIndex];
      const cartItem = cartItems.find(
        (i) => i.id === `${item.id}-${selectedSizeIndex}`
      );

      const totalMRP =
        selectedSize.originalPrice * (cartItem ? cartItem.quantity : 1);
      const totalTooMore =
        selectedSize.cutoffPrice * (cartItem ? cartItem.quantity : 1);
      const totalDiscount = totalMRP - totalTooMore;

      return {
        item,
        selectedSizeIndex,
        selectedSize,
        cartItem,
        totalMRP,
        totalTooMore,
        totalDiscount,
      };
    });
  }, [cartItems, selectedSizes]);

  return (
    <>
      <div className="bg-yellow-400 min-h-screen p-2 md:p-4">
        <Nav
          totalItems={totalItems}
          totalPrice={totalPrice}
          onClick={() => navigate("/shopping-cart", { state: { cartItems } })}
        />
        <div className="mt-4">
          <h2 className="text-lg font-bold text-center">Shopping Cart</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {cartItemDetails.map(
              ({
                item,
                selectedSizeIndex,
                selectedSize,
                cartItem,
                totalMRP,
                totalTooMore,
                totalDiscount,
              }) => (
                <div
                  id={`mobile-product-${item.id}`}
                  key={`${item.id}-${selectedSizeIndex}`}
                  className="product-card-mobile border border-gray-500 bg-white p-3 rounded-lg shadow-md flex flex-row items-center justify-between max-w-sm w-full mx-auto"
                >
                  {/* Image (Right Side) */}
                  <div className="relative ml-2">
                    {isVisible[`mobile-product-${item.id}`] && (
                      <OptimizedImage
                        src={loadImage(imagePathsById[item.id])}
                        alt={item.name}
                        className="w-36 h-48 sm:w-48 sm:h-56 object-contain rounded-lg"
                        onClick={() => item.link && navigate(item.link)}
                        style={{ cursor: item.link ? "pointer" : "default" }}
                        loadingPriority={item.id <= 2 ? "eager" : "lazy"}
                        width={144}
                        height={192}
                      />
                    )}
                    <div className="flex items-center mt-2">
                      <img
                        src="https://content.dmart.in/website/_next/static/media/veg.fd2bc51a.svg"
                        alt="Vegetarian Symbol"
                        className="h-7 w-7"
                        width="28"
                        height="28"
                        loading="lazy"
                      />
                      <span className="text-gray-950 text-sm">Vegetarian</span>
                    </div>
                  </div>
                  {/* Content (Left Side) */}
                  <div className="flex-1 bg-sky-100 rounded-lg shadow-md p-2 sm:p-4">
                    <div onClick={() => item.link && navigate(item.link)}>
                      <h3 className="text-sm font-semibold">
                        {item.description}
                      </h3>
                      <p className="text-xs text-gray-500 line-through">
                        MRP: ₹{totalMRP.toFixed(2)}
                      </p>
                      <p className="text-sm text-green-600 font-bold">
                        TooMore: ₹{totalTooMore.toFixed(2)}
                      </p>
                      <p className="text-xs font-semibold bg-green-100 text-green-600 px-2 py-1 rounded-sm w-fit">
                        ₹{totalDiscount.toFixed(2)} OFF
                      </p>
                    </div>
                    <label className="text-xs font-semibold mt-2 block">
                      Select Size:
                    </label>
                    <select
                      className="border p-2 w-full text-xs mt-1 rounded-lg"
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
                    {!cartItem || cartItem.quantity === 0 ? (
                      <button
                        className="mt-2 w-full bg-green-500 text-white py-2 text-sm rounded-lg hover:bg-green-600"
                        onClick={() =>
                          handleAddToCart(item.id, 1, selectedSizeIndex)
                        }
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="mt-2 flex items-center justify-between border p-2 rounded-lg w-full">
                        <button
                          className="bg-green-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-green-600"
                          onClick={() =>
                            handleDecrement(item.id, selectedSizeIndex)
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-12 text-center border rounded-lg mx-1"
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
                          className="bg-green-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-green-600"
                          onClick={() =>
                            handleIncrement(item.id, selectedSizeIndex)
                          }
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
};

export default CartM;
