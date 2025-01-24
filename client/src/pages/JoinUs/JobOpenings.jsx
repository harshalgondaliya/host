import React from 'react';

const jobOpenings = [
  {
    title: 'Frontend Developer',
    location: 'Remote',
    description: 'We are looking for a skilled frontend developer with experience in React and Tailwind CSS.',
  },
  {
    title: 'Backend Developer',
    location: 'New York, NY',
    description: 'Join our team as a backend developer with expertise in Node.js and Express.',
  },
  {
    title: 'UI/UX Designer',
    location: 'San Francisco, CA',
    description: 'We need a creative UI/UX designer with a strong portfolio in web and mobile design.',
  },
];

const JobOpenings = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Job Openings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobOpenings.map((job, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-600 mb-4">{job.location}</p>
              <p className="text-gray-800 mb-4">{job.description}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobOpenings;