import React from "react";
import { Card, CardContent, CardHeader } from "../components/ui/Card"; // Ensure this path is correct
import { Button } from "../components/ui/Button";

// Sample cart data with a placeholder image
import pineappleImage from "../assets/images/products/pineapple.jpg";
import MangoImage from "../assets/images/products/mango.jpg";
import grapeImage from "../assets/images/products/grapes.jpg";
import lycheeImage from "../assets/images/products/lychee.jpg";
import strawberryImage from "../assets/images/products/strawberry.jpg";


const cartData = {
  products: {
    Juice: [
      {
        id: 1,
        name: "Pineapple Juice",
        description: "TooMore Pineapple Juice : 250ml",
        vegetarianSymbol: true,
        originalPrice: 50,
        cutoffPrice: 40,
        discount: 10,
        sizes: [
          { size: "Small", price: 10 },
          { size: "Large", price: 40 },
        ],
        image: pineappleImage, // Temporary placeholder
      },
      {
        id: 2,
        name: "Mango Juice",
        description: "TooMore Mango Juice : 250ml",
        vegetarianSymbol: true,
        originalPrice: 60,
        cutoffPrice: 50,
        discount: 10,
        sizes: [
          { size: "Small", price: 10 },
          { size: "Large", price: 40 },
        ],
        image: MangoImage, // Temporary placeholder
      },
      {
        id: 3,
        name: "Grape Juice",
        description: "TooMore Grape Juice : 250ml",
        vegetarianSymbol: true,
        originalPrice: 55,
        cutoffPrice: 45,
        discount: 10,
        sizes: [
          { size: "Small", price: 15 },
          { size: "Large", price: 45 },
        ],
        image: grapeImage, // Temporary placeholder
      },
      {
        id: 4,
        name: "Lychee Juice",
        description: "TooMore Lychee Juice : 250ml",
        vegetarianSymbol: true,
        originalPrice: 65,
        cutoffPrice: 55,
        discount: 10,
        sizes: [
          { size: "Small", price: 15 },
          { size: "Large", price: 55 },
        ],
        image:lycheeImage, // Temporary placeholder
      },
      {
        id: 5,
        name: "Strawberry Juice",
        description: "TooMore Strawberry Juice : 250ml",
        vegetarianSymbol: true,
        originalPrice: 70,
        cutoffPrice: 60,
        discount: 10,
        sizes: [
          { size: "Small", price: 20 },
          { size: "Large", price: 60 },
        ],
        image: strawberryImage, // Temporary placeholder
      },
    ],
  },
};

const Cart = () => {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-xl font-bold mb-4 font-mulish">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(cartData.products).map(([category, items]) => (
          <div key={category} className="w-full">
            <h2 className="text-lg font-semibold mb-2 font-mulish">{category}</h2>
            {items.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-medium font-mulish">{item.description}</h3>
                    {item.vegetarianSymbol && (
                      <img
                        src="https://content.dmart.in/website/_next/static/media/veg.fd2bc51a.svg"
                        alt="Vegetarian Symbol"
                        className="h-6 w-6"
                      />
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex justify-center mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p>
                        <span className="line-through text-gray-500">
                          ₹{item.originalPrice}
                        </span>{" "}
                        <span className="text-red-500">
                          ₹{item.cutoffPrice}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Save ₹{item.discount}
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold">Sizes:</p>
                      <ul>
                        {item.sizes.map((size, idx) => (
                          <li key={idx}>
                            {size.size} - ₹{size.price}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button className="mt-4 w-full font-mulish">Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
