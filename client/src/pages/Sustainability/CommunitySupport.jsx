import React from 'react';

const CommunitySupport = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Community Support</h1>
        <p className="text-gray-600 text-lg mb-4">
          Our community support initiatives are designed to help and uplift the local communities. We believe in giving back and making a positive impact.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Education Programs</h2>
            <p className="text-gray-600">
              We offer various educational programs to help individuals gain new skills and knowledge.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Health Initiatives</h2>
            <p className="text-gray-600">
              Our health initiatives focus on providing essential healthcare services to those in need.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Environmental Efforts</h2>
            <p className="text-gray-600">
              We are committed to protecting the environment through various sustainability projects.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Volunteer Opportunities</h2>
            <p className="text-gray-600">
              Join us in our volunteer programs and make a difference in the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySupport;