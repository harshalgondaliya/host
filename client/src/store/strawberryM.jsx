import React, { useRef, useEffect, useState, useContext } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import OptimizedImage, { loadImage } from "../components/ImageOptimizer";
const strawberry = loadImage('/assets/images/products/strawberry.webp');
const label = loadImage('/assets/images/StrawberryMo.webp');
const StrawberryS = loadImage('/assets/images/products/StrawberryS.webp');
import Nav from "../cart/Nav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import cartData from "../cart/data.json";

const StrawberryM = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("desc");
  const thumbnailRef = useRef(null);
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useContext(AppContext);
  
  // Memoized image thumbnails array
  const imageThumbnails = React.useMemo(() => [
    { src: strawberry, alt: "Strawberry juice" },
    { src: label, alt: "Strawberry label" },
    { src: StrawberryS, alt: "Strawberry small" }
  ], [strawberry, label, StrawberryS]);
  
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(imageThumbnails[0].src);

  // Debugging
  console.log("Cart Data:", cartData);
  console.log("Cart Items:", cartItems);

  // Get product from cartData
  const product =
    cartData?.products?.subJuice?.find((item) => item.name === "Strawberry Juice") ||
    {};

  // Ensure sizes exist before accessing index
  const selectedSize = product.sizes?.[selectedSizeIndex] || {};

  // Find cart item matching selected size
  const cartItem = cartItems.find(
    (item) => item.id === `${product.id}-${selectedSizeIndex}`
  );

  // Handle Size Change
  const handleSizeChange = (index) => setSelectedSizeIndex(index);

  // Handle Cart Operations
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

  // Price Calculations
  const totalMRP =
    selectedSize.originalPrice * (cartItem ? cartItem.quantity : 1);
  const totalTooMore =
    selectedSize.cutoffPrice * (cartItem ? cartItem.quantity : 1);
  const totalDiscount = totalMRP - totalTooMore;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalPrice = cartItems.reduce(
    (sum, item) =>
      item.size ? sum + item.quantity * item.size.cutoffPrice : sum,
    0
  );

  return (
    <>
      <Nav totalItems={totalItems} totalPrice={subtotalPrice} />
      <br /><br /><br />
      <div className="min-h-screen bg-white flex flex-col items-center py-6 px-4">
        
        {/* Main Image & Thumbnails */}
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full">
            <OptimizedImage
              src={selectedImage}
              alt="Product"
              className="w-full rounded-lg border border-green-700"
            />
          </div>
          <div className="flex overflow-x-auto mt-3 space-x-4">
            {imageThumbnails.map((image, index) => (
              <OptimizedImage
                key={index}
                src={image.src}
                alt={image.alt}
                className={`w-16 h-16 border cursor-pointer hover:border-green-950 rounded-lg ${
                  selectedImage === image.src ? "border-green-700" : "border-gray-400"
                }`}
                onClick={() => setSelectedImage(image.src)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full mt-6">
          <h1 className="text-xl font-semibold text-center">
            Sweet Strawberry Delight : {selectedSize?.size || "N/A"} (
            {selectedSize?.pricePerUnit || "N/A"})
          </h1>
          <p className="text-gray-500 text-center mt-2">{product.description}</p>

          {/* Size Selection */}
          <div className="mt-6">
            <p className="text-sm font-semibold mb-2 text-center">Select Size:</p>
            <div className="flex justify-center flex-wrap gap-2">
              {product.sizes?.map((size, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedSizeIndex === index
                      ? "border-green-700 bg-green-50 text-green-700"
                      : "border-gray-300 text-gray-700"
                  }`}
                  onClick={() => handleSizeChange(index)}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Details */}
          <div className="mt-6 bg-green-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm line-through text-center">
              MRP: ₹{totalMRP.toFixed(2)}
            </p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-green-700 text-lg font-bold">
                TooMore: ₹{totalTooMore.toFixed(2)}
              </p>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-sm text-sm font-medium">
                ₹{totalDiscount.toFixed(2)} OFF
              </span>
            </div>
            <p className="text-gray-500 text-xs text-center mt-2">
              (Inclusive of all taxes)
            </p>
          </div>

          {/* Add to Cart Section */}
          <div className="mt-6">
            {!cartItem ? (
              <button
                onClick={() => handleCartUpdate(1)}
                className="w-full bg-green-700 text-white py-3 rounded-lg font-medium text-lg"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  className="bg-green-700 text-white px-4 py-2 text-xl"
                  onClick={() => handleCartUpdate(cartItem.quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-full text-center py-2 text-lg border-none focus:outline-none"
                  value={cartItem.quantity}
                  onChange={(e) => handleCartUpdate(parseInt(e.target.value, 10) || 1)}
                  min="1"
                />
                <button
                  className="bg-green-700 text-white px-4 py-2 text-xl"
                  onClick={() => handleCartUpdate(cartItem.quantity + 1)}
                >
                  +
                </button>
              </div>
            )}
          </div>

          {/* Product Tabs */}
          <div className="mt-8 border rounded-lg overflow-hidden">
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === "desc"
                    ? "bg-green-50 text-green-700"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => setActiveTab("desc")}
              >
                Description
              </button>
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === "disc"
                    ? "bg-green-50 text-green-700"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => setActiveTab("disc")}
              >
                Disclaimer
              </button>
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === "info"
                    ? "bg-green-50 text-green-700"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => setActiveTab("info")}
              >
                Info
              </button>
            </div>
            <div className="p-5 text-gray-900">
              {activeTab === "desc" && (
                <p>
                  Indulge in the rich and vibrant taste of our Strawberry Juice.
                  Made from carefully selected, ripe strawberries, this
                  refreshing drink brings you the perfect balance of natural
                  sweetness and tangy goodness. A delightful way to enjoy
                  nature's best flavors!
                </p>
              )}
              {activeTab === "disc" && (
                <p>
                  Our Strawberry Juice is naturally rich in vitamins and
                  antioxidants. While delicious and nutritious, it should be
                  consumed in moderation, as it contains natural sugars. If you
                  have dietary restrictions, consult a healthcare expert. Best
                  served chilled for maximum refreshment.
                </p>
              )}
              {activeTab === "info" && (
                <p>
                  Packed with vitamin C, folate, and antioxidants, strawberry
                  juice promotes glowing skin, strengthens immunity, and
                  supports heart health. Enjoy it straight, blend it into
                  smoothies, or mix with sparkling water for a refreshing twist.
                </p>
              )}
            </div>

            <div className="flex items-center mt-2 p-4">
              <img
                src="https://content.dmart.in/website/_next/static/media/veg.fd2bc51a.svg"
                alt="Vegetarian Symbol"
                className="h-7 w-7"
              />
              <span className="text-gray-950 text-sm ml-2">Vegetarian</span>
            </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default StrawberryM;
