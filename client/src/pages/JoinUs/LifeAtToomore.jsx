import React from 'react';

const LifeAtToomore = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white text-center py-4">
          <h1 className="text-3xl font-bold">Life at Toomore</h1>
        </div>
        <div className="p-6">
          <p className="text-gray-700 text-lg mb-4">
            At Toomore, we believe in fostering a culture of innovation, collaboration, and growth. Our team is dedicated to creating an environment where everyone can thrive and achieve their best.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-200 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Innovative Projects</h2>
              <p className="text-gray-600">
                Work on cutting-edge projects that push the boundaries of technology and creativity.
              </p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Collaborative Environment</h2>
              <p className="text-gray-600">
                Join a team of passionate professionals who are always ready to support and inspire each other.
              </p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Growth Opportunities</h2>
              <p className="text-gray-600">
                Take advantage of numerous opportunities for personal and professional development.
              </p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Work-Life Balance</h2>
              <p className="text-gray-600">
                Enjoy a healthy work-life balance with flexible working hours and remote work options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeAtToomore;