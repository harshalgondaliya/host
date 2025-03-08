import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PressReleases = () => {
  const pressReleases = [
    {
      id: 1,
      title: 'Company Expansion Announcement',
      date: '2026-10-01',
      content: 'We are excited to announce the opening of our new offices in multiple locations...'
    },
    {
      id: 2,
      title: 'New Product Launch',
      date: '2025-09-15',
      content: 'Introducing our latest innovation that redefines the industry standards...'
    },
    {
      id: 3,
      title: 'Partnership with Global Leaders',
      date: '2027-08-28',
      content: 'We have partnered with top industry leaders to drive innovation forward...'
    }
  ];

  return (
    <>
    <Navbar />
    <br /><br />
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-white to-green-950 flex flex-col items-center p-8">
      <div className="max-w-4xl w-full p-6 bg-yellow-500 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 animate-fadeIn">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Press Releases</h1>
        <div className="space-y-6">
          {pressReleases.map((release, index) => (
            <div 
              key={release.id} 
              className="p-6 border rounded-lg shadow-md bg-white transition-all duration-300 hover:shadow-xl hover:scale-105 animate-slideIn"
              style={{ animationDelay: `${index * 0.2}s` }} // Staggered animation effect
            >
              <h2 className="text-2xl font-semibold text-gray-800">{release.title}</h2>
              <p className="text-gray-500 italic">{release.date}</p>
              <p className="mt-2 text-gray-700">{release.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default PressReleases;
