import React, { useRef, useEffect, useState, useContext } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import OptimizedImage, { loadImage } from "../components/ImageOptimizer";

// Update image paths to ensure they're using the correct format
const strawberry = loadImage('../assets/images/products/strawberry.webp');
const label = loadImage('../assets/images/products/mango.webp');
const StrawberryS = loadImage('../assets/images/products/StrawberryS.webp');

import Nav from "../cart/Nav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import cartData from "../cart/data.json";

// Add debugging to troubleshoot image loading
console.log('Strawberry Image Path:', strawberry);
console.log('Label Image Path:', label);
console.log('StrawberryS Image Path:', StrawberryS);

const Strawberry = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("desc");

  const thumbnailRef = useRef(null);
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useContext(AppContent);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  
  // Memoized image thumbnails array
  const imageThumbnails = React.useMemo(() => [
    { src: strawberry, alt: "strawberry image" },
    { src: label, alt: "label image" },
    { src: StrawberryS, alt: "StrawberryS small" }
  ], [strawberry, label, StrawberryS]);
  
  const [selectedImage, setSelectedImage] = useState(imageThumbnails[0].src);

  // Scroll Functions
  const scrollUp = () =>
    thumbnailRef.current?.scrollBy({ top: -80, behavior: "smooth" });
  const scrollDown = () =>
    thumbnailRef.current?.scrollBy({ top: 80, behavior: "smooth" });

  // Get product from `cartData`, or use fallback
  const product =
    cartData?.products?.subJuice?.find(
      (item) => item.name === "Strawberry Juice"
    ) || {};

  // Ensure `sizes` exist before accessing index
  const selectedSize = product.sizes?.[selectedSizeIndex] || {};
  
  const cartItem = cartItems.find(
    (item) => item.id === `${product.id}-${selectedSizeIndex}`
  );

  const handleSizeChange = (index) => setSelectedSizeIndex(index);

  const handleCartUpdate = (newQuantity) => {
    const cartId = `${product.id}-${selectedSizeIndex}`;
    if (newQuantity <= 0) {
      removeFromCart(cartId);
    } else {
      const item = {
        id: cartId,
        productId: product.id,
        name: product.name,
        description: product.description,
        image: selectedImage,
        quantity: newQuantity,
        size: selectedSize,
      };
      removeFromCart(cartId);
      addToCart(item);
    }
  };

  const totalMRP = selectedSize.originalPrice || 0;
  const totalTooMore = selectedSize.cutoffPrice || 0;
  const totalDiscount = totalMRP - totalTooMore;

  return (
    <div className="flex flex-col min-h-screen bg-yellow-400">
      <Nav />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Image Gallery */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md mb-4">
              <OptimizedImage
                src={selectedImage}
                alt="Selected product image"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="relative w-full max-w-md">
              <div
                ref={thumbnailRef}
                className="flex flex-col gap-4 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
              >
                {imageThumbnails.map((image, index) => (
                  <OptimizedImage
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedImage === image.src
                        ? "ring-2 ring-green-600"
                        : "hover:ring-2 hover:ring-green-400"
                    }`}
                    onClick={() => setSelectedImage(image.src)}
                  />
                ))}
              </div>
              <button
                onClick={scrollUp}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              >
                <ChevronUp className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={scrollDown}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              >
                <ChevronDown className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-green-800 mb-4">
              {product.name || "Strawberry Juice"}
            </h1>
            <p className="text-xl text-green-700 mb-6">
              {product.description || "Fresh and delicious strawberry juice"}
            </p>
            <div className="flex gap-4 mb-6">
              {product.sizes?.map((size, index) => (
                <button
                  key={index}
                  onClick={() => handleSizeChange(index)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedSizeIndex === index
                      ? "bg-green-600 text-white"
                      : "bg-white text-green-600 hover:bg-green-50"
                  }`}
                >
                  {size.size}
                </button>
              ))}
            </div>
            <div className="mb-6">
              <p className="text-gray-500 text-sm line-through">
                MRP: ₹{totalMRP.toFixed(2)}
              </p>
              <p className="text-2xl font-bold text-green-800">
                TooMore: ₹{totalTooMore.toFixed(2)}
              </p>
              <p className="text-sm font-semibold mt-1">
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-sm">
                  ₹{totalDiscount.toFixed(2)} OFF
                </span>
              </p>
            </div>
            
            {!cartItem ? (
              <button
                onClick={() => handleCartUpdate(1)}
                className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center">
                <button
                  className="bg-green-600 text-white px-5 py-2 rounded-l-full text-lg font-semibold"
                  onClick={() => handleCartUpdate(cartItem.quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-20 text-center border-t border-b py-2 text-lg"
                  value={cartItem.quantity}
                  onChange={(e) =>
                    handleCartUpdate(parseInt(e.target.value, 10) || 1)
                  }
                  min="1"
                />
                <button
                  className="bg-green-600 text-white px-5 py-2 rounded-r-full text-lg font-semibold"
                  onClick={() => handleCartUpdate(cartItem.quantity + 1)}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Strawberry;
