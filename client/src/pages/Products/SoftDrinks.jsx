import React from 'react';

const SoftDrinks = () => {
  const drinks = [
    { name: 'Coca Cola', price: '$1.99' },
    { name: 'Pepsi', price: '$1.89' },
    { name: 'Sprite', price: '$1.79' },
    { name: 'Fanta', price: '$1.69' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Soft Drinks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        {drinks.map((drink, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">{drink.name}</h2>
            <p className="text-lg text-gray-600">{drink.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoftDrinks;