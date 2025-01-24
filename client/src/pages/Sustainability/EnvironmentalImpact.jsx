import React from 'react';

const EnvironmentalImpact = () => {
  return (
    <div className="bg-green-50 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">Environmental Impact</h1>
        <p className="text-gray-700 mb-6 text-center">
          Our commitment to sustainability is at the core of everything we do. We strive to minimize our environmental footprint and promote eco-friendly practices.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Energy Efficiency</h2>
            <p className="text-gray-600">
              We use energy-efficient technologies and renewable energy sources to reduce our carbon footprint.
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Waste Reduction</h2>
            <p className="text-gray-600">
              Our waste reduction programs focus on recycling, composting, and minimizing single-use plastics.
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Water Conservation</h2>
            <p className="text-gray-600">
              We implement water-saving measures and technologies to conserve this precious resource.
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Sustainable Sourcing</h2>
            <p className="text-gray-600">
              We prioritize sourcing materials from sustainable and ethical suppliers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalImpact;