import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import cartData from "../cart/data.json";
import OptimizedImage, {
  loadImage,
  ImageCache,
} from "../components/ImageOptimizer";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";


// Map image paths to product IDs - including both juice and soft drinks
const imagePathsById = {
  1: "../assets/images/products/pineapple.webp",
  2: "../assets/images/products/mango.webp",
  3: "../assets/images/products/grapes.webp",
  4: "../assets/images/products/lychee.webp",
  5: "../assets/images/products/strawberry.webp",
  6: "../assets/images/sb.webp",
  7: "../assets/images/products/Pomegranate.webp",
  // You can add more product images as needed
};

// Custom animation keyframes
const customKeyframes = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes pulse-soft {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  @keyframes fadeInStaggered {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes shimmer {
    0% { background-position: -468px 0; }
    100% { background-position: 468px 0; }
  }
  
  @keyframes slideInFromRight {
    0% { transform: translateX(30px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isVisible, setIsVisible] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("juices"); // Default to juices
  const [animateResults, setAnimateResults] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const searchInputRef = useRef(null);
  const resultsRef = useRef(null);
  const { addToCart } = useContext(AppContext);

  // Schema data for search page
  const searchSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://www.toomorebeverages.in/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.toomorebeverages.in/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Inject custom keyframes once
  useEffect(() => {
    const style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(customKeyframes));
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Hide welcome message when search is performed
  useEffect(() => {
    if (searchResults.length > 0 || searchTerm.trim() !== "") {
      setShowWelcome(false);
    } else if (searchTerm.trim() === "" && selectedCategory === "juices") {
      setShowWelcome(true);
    }
  }, [searchResults, searchTerm, selectedCategory]);

  // Focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Set up Intersection Observer for lazy loading and animations
  useEffect(() => {
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

      document.querySelectorAll(".search-result-item").forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      setIsVisible(
        Array.from(document.querySelectorAll(".search-result-item")).reduce(
          (acc, el) => ({ ...acc, [el.id]: true }),
          {}
        )
      );
    }
  }, [searchResults]);

  // Animate results when they change
  useEffect(() => {
    if (searchResults.length > 0) {
      setAnimateResults(true);
      const timer = setTimeout(() => setAnimateResults(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [searchResults]);

  // Scroll to results when search is performed
  useEffect(() => {
    if (searchResults.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [searchResults]);

  // Preload critical images
  useEffect(() => {
    // Only preload first few images to avoid excessive network usage
    const criticalImagePaths = Object.values(imagePathsById).slice(0, 3);
    ImageCache.preload(criticalImagePaths);
  }, []);

  // Debounce search function for better performance
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Search logic
  const performSearch = useCallback(
    (term, category) => {
      setLoading(true);

      let results = [];

      // Only get juices for searching
      const juices = cartData.products.subJuice || [];

      // Do actual search
      if (term.trim() === "") {
        // If no search term, show all juices
        results = juices;
      } else {
        // Filter juices based on search term
        const normalizedSearchTerm = term.toLowerCase();
        results = juices.filter(
          (product) =>
            product.name.toLowerCase().includes(normalizedSearchTerm) ||
            product.description.toLowerCase().includes(normalizedSearchTerm)
        );

        // Check for exact match - if found, navigate directly to that product page
        const exactMatch = juices.find(
          (product) => product.name.toLowerCase() === normalizedSearchTerm
        );

        if (exactMatch && exactMatch.link) {
          // Clear loading and navigate to the product page
          setLoading(false);
          navigate(exactMatch.link);
          return;
        }
      }

      // Slight delay to allow animation
      setTimeout(() => {
        setSearchResults(results);
        setLoading(false);
      }, 300);
    },
    [navigate]
  );

  // Debounced search function to avoid excessive searches while typing
  const debouncedSearch = useCallback(
    debounce((term, category) => {
      performSearch(term, category);
    }, 300),
    [performSearch]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term, selectedCategory);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch(searchTerm, selectedCategory);
  };

  // View product handler
  const handleViewProduct = (product) => {
    if (product.link) {
      navigate(product.link);
    }
  };

  // Function to stagger animations based on index
  const getAnimationDelay = (index) => {
    return `${100 + index * 50}ms`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Search Too More Products"
        description="Search our extensive collection of premium natural juices and beverages. Find your favorite Too More products including our signature juices, soft drinks, and more."
        type="website"
        schemaData={searchSchema}
      />
      <Navbar />
      <br /><br />
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50 pt-16 pb-10 overflow-x-hidden">
        {/* Custom CSS for animations */}
        <style jsx>{`
          .animate-added-to-cart {
            animation: pulse-soft 0.7s ease;
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          .animate-bounce {
            animation: bounce 2s ease-in-out infinite;
          }

          .animate-spin-slow {
            animation: spin 12s linear infinite;
          }

          .animate-staggered {
            opacity: 0;
            animation: fadeInStaggered 0.5s ease forwards;
          }

          .shimmer-bg {
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.5) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            background-size: 1000px 100%;
            animation: shimmer 2s infinite linear;
          }

          .gradient-move {
            background-size: 200% 200%;
            animation: gradientMove 3s ease infinite;
          }

          .search-container {
            transition: transform 0.3s ease;
          }

          .search-container:focus-within {
            transform: scale(1.01);
          }

          .category-card {
            transition: all 0.3s ease;
          }

          .category-card:hover .category-icon {
            transform: scale(1.15);
          }

          .product-card-hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease,
              outline 0.2s ease;
          }

          .product-card-hover:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
            outline: 2px solid rgba(234, 88, 12, 0.3);
          }

          @media (max-width: 640px) {
            .search-container:focus-within {
              transform: scale(1);
            }
          }
        `}</style>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-8 text-center relative animate-float">
            <span className="inline-block transform transition duration-300 hover:scale-105">
              Find Your Perfect Juice
            </span>
            <div className="absolute -right-2 -top-2 text-xl transform rotate-12 sm:inline-block hidden">
              🍹
            </div>
          </h1>

          {/* Search Form */}
          <div className="relative search-container bg-gradient-to-r from-white to-amber-50 rounded-xl shadow-lg p-4 sm:p-6 mb-10 max-w-4xl mx-auto border border-amber-100">
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 animate-pulse hidden sm:block"></div>
            <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 animate-pulse hidden sm:block"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-amber-100 to-transparent opacity-40 rounded-full -mr-10 -mt-10 z-0"></div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4 relative z-10"
            >
              <div className="relative flex-grow group">
                <input
                  ref={searchInputRef}
                  type="search"
                  className="block w-full p-10 sm:p-4 pl-15 pr-15 text-md text-gray-900 border border-amber-200 rounded-lg bg-white
                           focus:ring-2 focus:ring-orange-400 focus:border-orange-400 focus:bg-white transition-colors 
                           placeholder-gray-400 focus:placeholder-gray-500 shadow-sm"
                  placeholder="Find juices by flavor or fruit..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  aria-label="Search juices"
                />
                {!searchTerm && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg opacity-50 pointer-events-none hidden sm:block">
                    <span className="text-amber-500">🍹</span>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium 
                         rounded-lg hover:from-orange-600 hover:to-red-600 focus:ring-4 focus:ring-orange-300 
                         transition-colors transform active:scale-95 shadow-md hover:shadow-lg relative overflow-hidden group"
              >
                <span
                  className="absolute inset-0 w-full h-full bg-gradient-to-tr from-yellow-400 to-orange-500 opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                ></span>
                <span className="relative flex items-center justify-center">
                  <span>Search</span>
                  <svg
                    className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
              </button>
            </form>

            <div className="absolute -z-10 bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-3 bg-black/5 rounded-full blur-sm"></div>
          </div>

          {/* Welcome Message - Shows only when no search is performed */}
          {showWelcome && (
            <div
              className="max-w-4xl mx-auto mb-16 text-center animate-staggered"
              style={{ animationDelay: "200ms" }}
            >
              <div className="relative py-8 px-6 bg-white rounded-2xl shadow-md border border-amber-100">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-400 to-amber-500 p-3 rounded-full shadow-lg">
                  <div className="bg-white p-1 rounded-full">
                    <div className="text-4xl animate-bounce">🍹</div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <span
                      className="text-3xl animate-float"
                      style={{ animationDelay: "0.2s" }}
                    >
                      🧃
                    </span>
                    <span
                      className="text-3xl animate-float"
                      style={{ animationDelay: "0.5s" }}
                    >
                      🍊
                    </span>
                    <span
                      className="text-3xl animate-float"
                      style={{ animationDelay: "0.8s" }}
                    >
                      🥭
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-green-800 mb-3">
                    Welcome to our Juice Search
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-amber-300 to-orange-400 mx-auto mb-4 rounded-full"></div>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                    Discover our selection of refreshing and healthy fruit
                    juices. Use the search above to find your perfect natural
                    beverage.
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mt-6">
                    <button
                      onClick={() => {
                        setSearchTerm("seasonal");
                        performSearch("seasonal", "juices");
                      }}
                      className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors"
                    >
                      <span className="mr-1">🍂</span> Seasonal Favorites
                    </button>
                    <button
                      onClick={() => {
                        setSearchTerm("bestseller");
                        performSearch("bestseller", "juices");
                      }}
                      className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors"
                    >
                      <span className="mr-1">⭐</span> Best Sellers
                    </button>
                  </div>
                </div>

                <div className="absolute -z-10 bottom-3 left-1/2 transform -translate-x-1/2 w-4/5 h-4 bg-black/5 rounded-full blur-sm"></div>
              </div>
            </div>
          )}

          {/* Search Results - Displayed above categories when there are results */}
          <div
            ref={resultsRef}
            className={`mb-12 ${
              animateResults
                ? "opacity-0"
                : "opacity-100 transition-opacity duration-300"
            }`}
          >
            {(searchResults.length > 0 ||
              loading ||
              (searchTerm && searchResults.length === 0)) && (
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-green-800 relative pl-3">
                  <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-8 bg-green-500 rounded-r-full"></span>
                  {loading
                    ? "Searching..."
                    : searchResults.length > 0
                    ? `Found ${searchResults.length} juices`
                    : searchTerm
                    ? "No juices found"
                    : "All Juices"}
                </h2>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl overflow-hidden shadow animate-pulse"
                  >
                    <div className="h-48 bg-gray-200 shimmer-bg"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded-full w-3/4 shimmer-bg"></div>
                      <div className="h-4 bg-gray-200 rounded-full shimmer-bg"></div>
                      <div className="h-4 bg-gray-200 rounded-full w-1/2 shimmer-bg"></div>
                      <div className="h-8 bg-gray-200 rounded-lg mt-4 shimmer-bg"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {searchResults.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                    {searchResults.map((product, index) => (
                      <div
                        key={product.id}
                        id={`product-${product.id}`}
                        className="search-result-item product-card-hover bg-white rounded-xl overflow-hidden shadow-md animate-staggered cursor-pointer"
                        style={{ animationDelay: getAnimationDelay(index) }}
                        onClick={() => handleViewProduct(product)}
                      >
                        <div className="h-48 relative bg-gray-50 flex items-center justify-center overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          {isVisible[`product-${product.id}`] && (
                            <OptimizedImage
                              src={loadImage(
                                product.image || imagePathsById[product.id]
                              )}
                              alt={product.name}
                              className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                              width={240}
                              height={192}
                              loadingPriority="lazy"
                            />
                          )}
                        </div>
                        <div className="p-4 group-hover:bg-amber-50 transition-colors duration-300">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {product.description}
                          </p>

                          {product.sizes && product.sizes.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="text-gray-500 text-sm line-through">
                                MRP: ₹
                                {product.sizes[0].originalPrice.toFixed(2)}
                              </span>
                              <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-xs font-semibold">
                                ₹
                                {(
                                  product.sizes[0].originalPrice -
                                  product.sizes[0].cutoffPrice
                                ).toFixed(2)}{" "}
                                OFF
                              </span>
                            </div>
                          )}

                          {product.sizes && product.sizes.length > 0 && (
                            <p className="text-green-600 font-bold text-lg">
                              ₹{product.sizes[0].cutoffPrice.toFixed(2)}
                            </p>
                          )}

                          <div className="mt-4">
                            <button
                              className="w-full group bg-gradient-to-r from-green-500 to-green-600 text-white font-medium py-2.5 px-4 
                                     rounded-lg transition-all transform active:scale-95 relative overflow-hidden"
                            >
                              <span
                                className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-green-500 opacity-0 
                                          group-hover:opacity-100 transition-opacity duration-300"
                              ></span>
                              <span className="relative flex items-center justify-center space-x-2">
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  ></path>
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  ></path>
                                </svg>
                                <span>View Details</span>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {searchResults.length === 0 && searchTerm && (
                  <div
                    className="text-center py-12 bg-white rounded-xl shadow-md animate-staggered"
                    style={{ animationDelay: "200ms" }}
                  >
                    <div className="relative mx-auto w-24 h-24 mb-4">
                      <div className="absolute inset-0 bg-amber-100 rounded-full animate-pulse opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl relative z-10 animate-float">
                          🔍
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      No matching juices found
                    </h3>
                    <p className="text-gray-700 mb-2">
                      We couldn't find any juices matching "{searchTerm}"
                    </p>
                    <p className="text-gray-500 mb-6">
                      Please try searching with different keywords or browse our
                      categories
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("juices");
                          performSearch("", "juices");
                        }}
                        className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                          ></path>
                        </svg>
                        View all juices
                      </button>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          searchInputRef.current.focus();
                        }}
                        className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          ></path>
                        </svg>
                        Try new search
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Juice Categories Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-8 text-center relative">
              <span className="inline-block bg-gradient-to-r from-amber-50 to-white px-6 py-2 rounded-full shadow-sm border border-amber-100">
                Browse Juice Types
              </span>
              <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent top-1/2 left-0 -z-10"></div>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div
                className="category-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl cursor-pointer group border border-amber-100"
                onClick={() => {
                  setSearchTerm("citrus");
                  performSearch("citrus", "juices");
                }}
              >
                <div className="h-28 bg-gradient-to-r from-yellow-200 to-orange-300 gradient-move flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="text-4xl category-icon transition-transform duration-300 z-10 drop-shadow-md">
                    🍊
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white/20 to-transparent"></div>
                </div>
                <div className="p-4 text-center relative">
                  <div className="w-12 h-1 bg-gradient-to-r from-orange-300 to-yellow-300 mx-auto -mt-1 mb-3 rounded-full"></div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2 group-hover:text-orange-600 transition-colors">
                    Citrus Juices
                  </h3>
                  <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors">
                    Refreshing citrus juices rich in vitamin C
                  </p>
                </div>
              </div>
              <div
                className="category-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl cursor-pointer group border border-pink-100"
                onClick={() => {
                  setSearchTerm("berry");
                  performSearch("berry", "juices");
                }}
              >
                <div className="h-28 bg-gradient-to-r from-red-200 to-pink-300 gradient-move flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-200 to-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="text-4xl category-icon transition-transform duration-300 z-10 drop-shadow-md">
                    🍓
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white/20 to-transparent"></div>
                </div>
                <div className="p-4 text-center relative">
                  <div className="w-12 h-1 bg-gradient-to-r from-pink-300 to-red-300 mx-auto -mt-1 mb-3 rounded-full"></div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2 group-hover:text-pink-600 transition-colors">
                    Berry Juices
                  </h3>
                  <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors">
                    Antioxidant-rich and delicious berry blends
                  </p>
                </div>
              </div>
              <div
                className="category-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl cursor-pointer group border border-teal-100"
                onClick={() => {
                  setSearchTerm("tropical");
                  performSearch("tropical", "juices");
                }}
              >
                <div className="h-28 bg-gradient-to-r from-green-200 to-teal-300 gradient-move flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-200 to-teal-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="text-4xl category-icon transition-transform duration-300 z-10 drop-shadow-md">
                    🥭
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white/20 to-transparent"></div>
                </div>
                <div className="p-4 text-center relative">
                  <div className="w-12 h-1 bg-gradient-to-r from-teal-300 to-green-300 mx-auto -mt-1 mb-3 rounded-full"></div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2 group-hover:text-teal-600 transition-colors">
                    Tropical Juices
                  </h3>
                  <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors">
                    Exotic tropical fruits packed with flavor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
