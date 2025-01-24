import React from 'react';

const juices = [
  { id: 1, name: 'Apple Juice', price: '$3.99', image: 'apple-juice.jpg' },
  { id: 2, name: 'Orange Juice', price: '$4.99', image: 'orange-juice.jpg' },
  { id: 3, name: 'Grape Juice', price: '$5.99', image: 'grape-juice.jpg' },
];

const Juices = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Our Juices</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {juices.map((juice) => (
          <div key={juice.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={juice.image} alt={juice.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{juice.name}</h2>
              <p className="text-gray-600">{juice.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Juices;