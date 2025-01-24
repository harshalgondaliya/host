import React from 'react';

const Certifications = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="w-full max-w-4xl px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Certifications</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <img src="/path/to/certification1.png" alt="Certification 1" className="w-full h-48 object-cover rounded-t-lg" />
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">Certification 1</h2>
            <p className="text-gray-600 mt-2">Description of certification 1.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <img src="/path/to/certification2.png" alt="Certification 2" className="w-full h-48 object-cover rounded-t-lg" />
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">Certification 2</h2>
            <p className="text-gray-600 mt-2">Description of certification 2.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <img src="/path/to/certification3.png" alt="Certification 3" className="w-full h-48 object-cover rounded-t-lg" />
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">Certification 3</h2>
            <p className="text-gray-600 mt-2">Description of certification 3.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;