import React from 'react';

const WaterConservation = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">Water Conservation</h1>
        <p className="text-gray-700 mb-6 text-center">
          Water conservation is the practice of using water efficiently to reduce unnecessary water usage. 
          It is important because fresh clean water is a limited resource, as well as a costly one.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-500 mb-2">Why Conserve Water?</h2>
            <p className="text-gray-600">
              Conserving water helps to preserve our environment, reduce energy usage, and save money on utility bills.
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-500 mb-2">How to Conserve Water?</h2>
            <p className="text-gray-600">
              Simple actions like fixing leaks, taking shorter showers, and using water-efficient appliances can make a big difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterConservation;