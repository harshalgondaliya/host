import React from 'react';

const energyDrinks = [
  { id: 1, name: 'Red Bull', description: 'Gives you wings', price: '$2.99' },
  { id: 2, name: 'Monster', description: 'Unleash the beast', price: '$3.49' },
  { id: 3, name: 'Rockstar', description: 'Party like a rockstar', price: '$2.79' },
];

const EnergyDrinks = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Energy Drinks</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {energyDrinks.map((drink) => (
            <div key={drink.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{drink.name}</h2>
              <p className="text-gray-600 mb-4">{drink.description}</p>
              <p className="text-xl font-bold text-gray-900">{drink.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnergyDrinks;