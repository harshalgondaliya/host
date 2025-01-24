import React from 'react';

const InternshipOpportunities = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Internship Opportunities</h1>
        <p className="text-gray-600 text-center mb-8">
          Join our team and gain valuable experience through our internship programs. We offer a variety of opportunities for students and recent graduates to develop their skills and grow their careers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Software Development Intern</h2>
            <p className="text-gray-600 mb-4">
              Work on real-world projects and learn from experienced developers. Gain hands-on experience with the latest technologies and tools.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Apply Now</button>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Marketing Intern</h2>
            <p className="text-gray-600 mb-4">
              Assist in creating marketing campaigns and strategies. Learn about digital marketing, social media, and content creation.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Apply Now</button>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Design Intern</h2>
            <p className="text-gray-600 mb-4">
              Collaborate with our design team to create visually appealing graphics and layouts. Enhance your skills in UI/UX design.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Apply Now</button>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Analysis Intern</h2>
            <p className="text-gray-600 mb-4">
              Analyze data and generate insights to support business decisions. Learn about data visualization and statistical analysis.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipOpportunities;