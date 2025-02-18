import React, { useState } from "react";
import grapes from "../assets/images/products/grapes.webp";

const Lay = () => {
  const [zoomImage, setZoomImage] = useState(null);

  const handleMouseEnter = () => {
    setZoomImage(grapes);
  };

  const handleMouseLeave = () => {
    setZoomImage(null);
  };

  return (
    <div className="min-h-screen bg-white flex justify-center py-10">
      {zoomImage && (
          <div className="absolute right-0 top-0 w-96 h-96 border shadow-lg overflow-hidden">
            <img src={zoomImage} alt="Zoomed View" className="w-full h-full object-cover" />
          </div>
        )}
      <div className="max-w-6xl w-full flex">
        {/* Left Section - Image and Thumbnails */}
        <div className="w-1/3">
          <img
            src={grapes}
            alt="Lays Magic Masala"
            className="w-full rounded-lg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <div className="flex space-x-2 mt-4">
            <img
              src="https://www.bigbasket.com/media/uploads/p/m/40201436_2-lays-potato-chips-indias-magic-masala.jpg"
              alt="thumbnail"
              className="w-16 h-16 border rounded-lg cursor-pointer"
            />
            <img
              src="https://www.bigbasket.com/media/uploads/p/m/40201436_2-lays-potato-chips-indias-magic-masala.jpg"
              alt="thumbnail"
              className="w-16 h-16 border rounded-lg cursor-pointer"
            />
            <img
              src="https://www.bigbasket.com/media/uploads/p/m/40201436_2-lays-potato-chips-indias-magic-masala.jpg"
              alt="thumbnail"
              className="w-16 h-16 border rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="w-2/3 pl-10">
          <h1 className="text-2xl font-semibold">Lay's India's Magic Masala Potato Chips: 82 g</h1>
          <p className="text-blue-500 mt-2">Lay's</p>

          <div className="mt-4">
            <button className="border px-6 py-2 rounded-lg text-green-600 border-green-600">
              82 g
            </button>
          </div>

          <div className="mt-4 flex items-center">
            <p className="line-through text-gray-400 mr-2">MRP ₹50</p>
            <p className="text-xl font-semibold">DMart ₹35</p>
            <p className="text-sm text-gray-500 ml-2">₹0.43 / 1 gm</p>
          </div>

          <div className="mt-2">
            <span className="text-green-600 bg-green-100 px-2 py-1 rounded-lg">Save ₹15</span>
          </div>

          <button className="bg-green-500 text-white px-6 py-3 rounded-lg mt-4 hover:bg-green-600">
            ADD TO CART
          </button>

          <div className="mt-4">
            <span className="text-sm border px-2 py-1 rounded-lg">✅ Vegetarian</span>
          </div>

          {/* Description Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold border-b pb-2">DESCRIPTION</h2>

            <div className="mt-4">
              <h3 className="font-semibold">Key Features</h3>
              <p>Grab this crunchy Lays Magic Masala potato chips to experience a unique burst of Indian flavour and spices!</p>

              <h3 className="font-semibold mt-4">How to Use</h3>
              <p>
                It’s a mouth-watering snack to enjoy while watching a movie, working from home, or on a weekend outing.
              </p>

              <h3 className="font-semibold mt-4">Any Other Must-Know Information</h3>
              <p>Made from top-quality potatoes.</p>

              <h3 className="font-semibold mt-4">Shelf Life</h3>
              <p>150 days.</p>

              <h3 className="font-semibold mt-4">About the Brand</h3>
              <h4 className="font-medium">How did they get their start?</h4>
              <p>
                Wherever celebrations and good times happen, the LAY'S brand will be there just as it has been for more than 75 years.
              </p>

              <h4 className="font-medium mt-4">What makes their products unique?</h4>
              <p>
                With flavours almost as rich as their history, they have a chip or crisp flavour guaranteed to bring a smile to your face.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Lay;
