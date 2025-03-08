import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Careers = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-yellow-500 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-green-950">Join Our Team</h2>
            <p className="mt-3 text-lg text-gray-700">Be a part of our refreshing journey! We’re looking for passionate individuals who love sustainability and healthy living.</p>
          </div>
          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                  Upload Resume
                </label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded-lg text-white bg-green-950 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Careers;