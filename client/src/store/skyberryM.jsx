import React, { useRef, useEffect, useState, useContext } from "react";
import OptimizedImage, { loadImage } from "../components/ImageOptimizer";
import { ChevronUp, ChevronDown } from "lucide-react";
// Dynamically import skyberry
const skyberry = loadImage('../assets/images/products/SkyBerry.webp');
// Dynamically import label
const label = loadImage('../assets/images/SkyBerryLabel.webp');
// Dynamically import Small
const Small = loadImage('../assets/images/SkyBerryS.webp');
import Nav from "../cart/Nav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import cartData from "../cart/data.json";

const SkyberryM = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("desc");
  const thumbnailRef = useRef(null);
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useContext(AppContext);
  
  // Memoized image thumbnails array
  const imageThumbnails = React.useMemo(() => [
    { src: skyberry, alt: "skyberry image" },
    { src: label, alt: "label image" },
    { src: Small, alt: "Small image" }
  ], [skyberry, label, Small]);
  
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(imageThumbnails[0].src);

  // Debugging
  console.log("Cart Data:", cartData);
  console.log("Cart Items:", cartItems);

  // Ensure product data is correctly fetched
  const product =
    cartData?.products?.subJuice?.find((item) => item.name === "SkyBerry Juice") ||
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
      <br /><br />
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
              <div
                key={index}
                className={`cursor-pointer p-1 rounded ${
                  selectedImage === image.src
                    ? "border-2 border-green-700"
                    : "border border-gray-300"
                }`}
                onClick={() => setSelectedImage(image.src)}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  className="w-16 h-16 object-cover"
                  threshold={200}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full mt-6">
          <h1 className="text-xl font-semibold text-center">
          Celestial Skyberry Essence : {selectedSize?.size || "N/A"} (
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
                  Discover the magic of Skyberry Juice – a refreshing blend of
                  rare, juicy berries with a smooth and sweet taste. Packed with
                  natural flavors and essential nutrients, it's the perfect
                  drink to lift your mood and energize your day!
                </p>
              )}
              {activeTab === "disc" && (
                <p>
                  Our Skyberry Juice is crafted from nature's best berries,
                  containing natural sugars and antioxidants. Enjoy in
                  moderation, as excessive intake may affect sugar levels. If
                  you have dietary concerns, consult a doctor. Best served
                  chilled for a delightful experience!
                </p>
              )}
              {activeTab === "info" && (
                <p>
                  Skyberry Juice is rich in vitamins, antioxidants, and minerals
                  that help boost immunity, support heart health, and keep your
                  skin glowing. Enjoy it as a refreshing drink, mix it in
                  smoothies, or add a splash to sparkling water for a fun twist!
                </p>
              )}
            </div>

            <div className="flex items-center mt-2">
              <img
                src="https://content.dmart.in/website/_next/static/media/veg.fd2bc51a.svg"
                alt="Vegetarian Symbol"
                className="h-10 w-10"
              />
              <span className="text-gray-950 text-sm">Vegetarian</span>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SkyberryM;
