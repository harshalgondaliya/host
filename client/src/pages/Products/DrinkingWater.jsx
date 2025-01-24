import React from 'react';

const DrinkingWater = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Drinking Water Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-blue-600 font-bold">${product.price}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const products = [
  {
    id: 1,
    name: 'Pure Spring Water',
    description: 'Fresh and pure spring water sourced from the mountains.',
    price: 10.99,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Mineral Water',
    description: 'Rich in minerals and perfect for hydration.',
    price: 12.99,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    name: 'Sparkling Water',
    description: 'Refreshing sparkling water with a hint of flavor.',
    price: 8.99,
    image: 'https://via.placeholder.com/150'
  }
];

export default DrinkingWater;