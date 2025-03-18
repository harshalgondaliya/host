import React, { useRef, useEffect, useState, useContext } from "react";
import OptimizedImage, { loadImage } from "../components/ImageOptimizer";
import { ChevronUp, ChevronDown } from "lucide-react";
import Nav from "../cart/Nav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import cartData from "../cart/data.json";
// Dynamically import label
const label = loadImage('../assets/images/products/strawberry.webp');
// Dynamically import mango
const mango = loadImage('../assets/images/products/mango.webp');
// Dynamically import MangoS
const MangoS = loadImage('../assets/images/products/MangoS.webp');

const Mango = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("desc");

  const thumbnailRef = useRef(null);
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useContext(AppContent);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(mango); // Default main image

  // Scroll Functions
  const scrollUp = () =>
    thumbnailRef.current?.scrollBy({ top: -80, behavior: "smooth" });
  const scrollDown = () =>
    thumbnailRef.current?.scrollBy({ top: 80, behavior: "smooth" });

  // Get product from `cartData`, or use fallback
  const product =
    cartData?.products?.subJuice?.find((item) => item.name === "Mango Juice") ||
    {};

  // Ensure `sizes` exist before accessing index
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

  // Memoized image thumbnails array
  const imageThumbnails = React.useMemo(() => [
    { src: label, alt: "label image" },
    { src: mango, alt: "mango image" },
    { src: MangoS, alt: "MangoS image" }
  ], [label, mango, MangoS]);


  return (
    <>
      <Nav totalItems={totalItems} totalPrice={subtotalPrice} />
      <br />
      <br />
      <br />
      <br />
      <div className="min-h-screen bg-white flex justify-center py-10">
        <div className="max-w-6xl w-full flex space-x-8">
          {/* Left Section - Thumbnails */}
          <div className="flex flex-col items-center rounded-lg p-0 shadow-sm bg-white">
            <button
              onClick={scrollUp}
              className="bg-white text-black p-2 rounded-lg mb-2 hover:bg-gray-400 transition"
            >
              <ChevronUp size={30} />
            </button>
            <div
              ref={thumbnailRef}
              className="overflow-hidden max-h-[255px] flex flex-col p-3"
            >
              {[mango, label, MangoS].map((image, index) => (
                <OptimizedImage
                key={index}
                  src={image}
                  alt="thumbnail"
                  className={`w-20 h-20 border cursor-pointer hover:border-green-950 ${
                    selectedImage === image.src ? "border-green-700"
                      : "border-gray-400"
                  }`}
                  onClick={() => setSelectedImage(image.src)} // Update main image
                />
              ))}
            </div>
            <button
              onClick={scrollDown}
              className="bg-white text-black p-2 rounded-lg mb-2 hover:bg-gray-400 transition"
            >
              <ChevronDown size={30} />
            </button>
          </div>

          {/* Center Section - Main Image */}
          <div className="w-1/3">
            <OptimizedImage
              src={selectedImage}
              alt="Product"
              className="w-full border border-green-700"
            />
          </div>

          {/* Right Section - Product Details */}
          <div className="w-2/3 pl-6">
            <h1 className="text-2xl font-semibold">
              Sun-Kissed Mango Bliss : {selectedSize.size} (
              {selectedSize.pricePerUnit})
            </h1>
            <p className="text-gray-500 mt-2">{product.description}</p>
            <p className="text-gray-500 mt-2">Variant</p>

            {/* Size Selection */}
            <div className="flex space-x-4 mt-2">
              {product.sizes?.map((size, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedSizeIndex === index
                      ? "border-green-800 bg-green-100"
                      : "border-gray-400"
                  }`}
                  onClick={() => handleSizeChange(index)}
                >
                  {size.size}
                </button>
              ))}
            </div>

            <div className="border-t border-gray-800 mt-4 pt-4"></div>

            {/* Pricing */}
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

            {/* Add to Cart Button */}
            {!cartItem ? (
              <div className="flex justify-end">
                <button
                  className="w-56 bg-green-800 text-white py-2 mt-1"
                  onClick={() => handleCartUpdate(1)}
                >
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
                  &nbsp;Add to Cart
                </button>
              </div>
            ) : (
              <div className="flex items-center rounded-lg p-0 justify-end mx-0">
                <button
                  className="bg-green-800 text-white px-4 py-1.5"
                  onClick={() => handleCartUpdate(cartItem.quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-[130px] text-center border my-1 py-1.5"
                  value={cartItem.quantity}
                  onChange={(e) =>
                    handleCartUpdate(parseInt(e.target.value, 10) || 1)
                  }
                  min="1"
                />
                <button
                  className="bg-green-800 text-white px-4 py-1.5"
                  onClick={() => handleCartUpdate(cartItem.quantity + 1)}
                >
                  +
                </button>
              </div>
            )}
            <div className="border-t border-gray-800 mt-4 pt-4"></div>
            <div className="flex items-center mt-2">
              <img
                src="/assets/images/icons/vegetarian.svg"
                alt="Vegetarian Symbol"
                className="h-10 w-10"
              />
              <span className="text-gray-950 text-sm">Vegetarian</span>
            </div>
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
                  Our Exotic Mango Juice is a tropical delight bursting with the
                  rich, velvety sweetness of sun-ripened mangoes. Packed with
                  essential nutrients and the authentic taste of real mango
                  pulp, every sip is a refreshing escape to paradise. Enjoy the
                  smooth, luscious texture and natural goodness of mangoes in
                  every drop.
                </p>
              )}
              {activeTab === "disc" && (
                <p>
                  While our Mango Juice is made from the finest mangoes and
                  naturally rich in vitamins, it should be consumed in
                  moderation. Mangoes contain natural sugars, so excessive
                  intake may impact sugar levels. If you have dietary concerns,
                  consult a healthcare professional before consumption. Best
                  enjoyed chilled for a truly refreshing experience.
                </p>
              )}
              {activeTab === "info" && (
                <p>
                  Mango juice is a powerhouse of flavor and nutrition, loaded
                  with vitamin A, vitamin C, and antioxidants. It supports
                  immunity, promotes glowing skin, and aids digestion. Enjoy it
                  as a revitalizing drink, blend it into smoothies, or mix with
                  sparkling water for a tropical twist. Savor the king of fruits
                  in every sip!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Mango;
