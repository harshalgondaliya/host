import React from 'react';

const DistributorSupport = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white shadow-md rounded-lg max-w-4xl w-full p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Distributor Support</h1>
        <p className="text-gray-600 mb-4">
          Welcome to the Distributor Support page. Here you can find resources and contact information to help you with any issues or questions you may have.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Us</h2>
            <p className="text-gray-600 mb-4">If you need immediate assistance, please contact our support team.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">Get in Touch</button>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">FAQs</h2>
            <p className="text-gray-600 mb-4">Find answers to the most frequently asked questions.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">View FAQs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorSupport;