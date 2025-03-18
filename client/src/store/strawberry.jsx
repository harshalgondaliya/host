import React, { useRef, useEffect, useState, useContext } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import OptimizedImage, { loadImage } from "../components/ImageOptimizer";
import Nav from "../cart/Nav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import cartData from "../cart/data.json";

// Dynamically import images
const strawberry = loadImage('/assets/images/products/strawberry.webp');
const label = loadImage('/assets/images/products/mango.webp');
const StrawberryS = loadImage('/assets/images/products/StrawberryS.webp');

const Strawberry = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("desc");

  const thumbnailRef = useRef(null);
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useContext(AppContext);
  
  // Memoized image thumbnails array
  const imageThumbnails = React.useMemo(() => [
    { src: strawberry, alt: "strawberry image" },
    { src: label, alt: "label image" },
    { src: StrawberryS, alt: "StrawberryS image" }
  ], [strawberry, label, StrawberryS]);
  
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
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
              {imageThumbnails.map((image, index) => (
                <OptimizedImage
                key={index}
                  src={image.src}
                  alt={image.alt}
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
              Sweet Strawberry Delight : {selectedSize.size} (
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
                src="https://content.dmart.in/website/_next/static/media/veg.fd2bc51a.svg"
                alt="Vegetarian Symbol"
                className="h-10 w-10"
              />
              <span className="text-gray-950 text-sm">Vegetarian</span>
            </div>

            {/* Product Information Tabs */}
            <div>
              <div className="flex border-b">
                <button
                  className={`py-2 px-4 ${
                    activeTab === "desc"
                      ? "text-green-800 border-b-2 border-green-800"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("desc")}
                >
                  Description
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeTab === "specs"
                      ? "text-green-800 border-b-2 border-green-800"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("specs")}
                >
                  Specifications
                </button>
              </div>
              <div className="p-4">
                {activeTab === "desc" ? (
                  <p>
                    Indulge in the sweet sensation of our premium Strawberry Juice. Each sip delivers the authentic taste of ripe strawberries, carefully selected and processed to preserve their natural flavor profile. Our special formulation ensures a balanced sweetness that perfectly captures the essence of this beloved fruit.
                  </p>
                ) : (
                  <div>
                    <h3 className="font-semibold">Technical Specifications</h3>
                    <ul className="list-disc ml-5 mt-2">
                      <li>Shelf Life: 6 months unopened</li>
                      <li>Storage: Keep refrigerated after opening</li>
                      <li>Ingredients: Strawberry extract, purified water, natural sweeteners</li>
                      <li>No artificial colors or preservatives</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Strawberry;
