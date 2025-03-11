import React, { useRef, useEffect, useState, useContext } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import LycheeS from "../assets/images/products/LycheeS.webp";
import lychee from "../assets/images/products/lychee.webp";
import label from "../assets/images/products/mango.webp";
import Nav from "../cart/Nav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import cartData from "../cart/data.json";

const LycheeM = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("desc");
  const thumbnailRef = useRef(null);
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useContext(AppContent);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(lychee);

  // Debugging
  console.log("Cart Data:", cartData);
  console.log("Cart Items:", cartItems);

  // Ensure product data is correctly fetched
  const product =
    cartData?.products?.subJuice?.find((item) => item.name === "Lychee Juice") ||
    null;

  if (!product) {
    console.error("Product not found in cartData.");
    return <p className="text-center text-red-600">Product not found!</p>;
  }

  const selectedSize = product.sizes?.[selectedSizeIndex] || null;

  if (!selectedSize) {
    console.error("Sizes not found for the product.");
    return <p className="text-center text-red-600">Size data missing!</p>;
  }

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
            <img
              src={selectedImage}
              alt="Product"
              className="w-full rounded-lg border border-green-700"
            />
          </div>
          <div className="flex overflow-x-auto mt-3 space-x-4">
            {[lychee, label, LycheeS].map((image, index) => (
              <img
                key={index}
                src={image}
                alt="thumbnail"
                className={`w-16 h-16 border cursor-pointer hover:border-green-950 rounded-lg ${
                  selectedImage === image ? "border-green-700" : "border-gray-400"
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full mt-6">
          <h1 className="text-xl font-semibold text-center">
          Lychee Luxe Delight : {selectedSize?.size || "N/A"} (
            {selectedSize?.pricePerUnit || "N/A"})
          </h1>
          <p className="text-gray-500 text-center mt-2">{product.description}</p>

          {/* Size Selection */}
          <div className="flex justify-center space-x-2 mt-3">
            {product.sizes?.map((size, index) => (
              <button
                key={index}
                className={`px-3 py-1 border rounded-lg text-sm ${
                  selectedSizeIndex === index ? "border-green-800 bg-green-100" : "border-gray-400"
                }`}
                onClick={() => handleSizeChange(index)}
              >
                {size.size}
              </button>
            ))}
          </div>

          {/* Pricing */}
          <div className="text-center mt-4">
            <p className="text-gray-500 text-sm line-through">
              MRP: ₹{totalMRP.toFixed(2)}
            </p>
            <p className="text-green-600 text-lg font-bold">
              TooMore: ₹{totalTooMore.toFixed(2)}
            </p>
            <p className="text-sm font-semibold mt-1">
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-sm">
                ₹{totalDiscount.toFixed(2)} OFF
              </span>
            </p>
          </div>

          {/* Cart Actions */}
          <div className="flex justify-center mt-4">
            {!cartItem ? (
              <button
                className="w-48 bg-green-800 text-white py-2 rounded-lg"
                onClick={() => handleCartUpdate(1)}
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center">
                <button
                  className="bg-green-800 text-white px-3 py-1 rounded-lg"
                  onClick={() => handleCartUpdate(cartItem.quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-16 text-center border mx-2 py-1"
                  value={cartItem.quantity}
                  onChange={(e) =>
                    handleCartUpdate(parseInt(e.target.value, 10) || 1)
                  }
                  min="1"
                />
                <button
                  className="bg-green-800 text-white px-3 py-1 rounded-lg"
                  onClick={() => handleCartUpdate(cartItem.quantity + 1)}
                >
                  +
                </button>
              </div>
            )}
          </div>
          <br />
          {/* Tab Buttons */}
          <div className="flex justify-around bg-gray-100 p-3 rounded-t-lg">
              {["desc", "disc", "info"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? "text-green-600 border-b-2 border-green-800"
                      : "text-gray-600 hover:text-green-800"
                  }`}
                >
                  {tab === "desc"
                    ? "Description"
                    : tab === "disc"
                    ? "Disclaimer"
                    : "More Info"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-5 text-gray-900">
              {activeTab === "desc" && (
                <p>
                  Our Refreshing Lychee Juice is a delightful fusion of health
                  and taste. Made from the finest lychees, it is naturally
                  sweet, aromatic, and packed with essential nutrients. Each sip
                  delivers the tropical essence of lychee with a smooth and
                  luscious texture, making it the perfect thirst quencher.
                </p>
              )}
              {activeTab === "disc" && (
                <p>
                  While our Lychee Juice is crafted from premium-quality lychees
                  and contains natural goodness, we recommend consuming it in
                  moderation. Due to its natural sugars, excessive intake may
                  affect sugar levels. If you have any dietary restrictions or
                  health conditions, consult a healthcare professional before
                  consumption.
                </p>
              )}
              {activeTab === "info" && (
                <p>
                  Lychee juice is a refreshing and exotic beverage made from
                  juicy, sun-ripened lychees. It is rich in vitamin C,
                  antioxidants, and essential minerals that support immune
                  health, skin hydration, and digestion. Enjoy it chilled, as a
                  smoothie base, or blended with sparkling water for a
                  revitalizing experience.
                </p>
              )}
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LycheeM;
