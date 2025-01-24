import React from 'react';

const PressReleases = () => {
  const pressReleases = [
    {
      id: 1,
      title: 'Press Release 1',
      date: '2023-10-01',
      content: 'Content of press release 1...',
    },
    {
      id: 2,
      title: 'Press Release 2',
      date: '2023-09-15',
      content: 'Content of press release 2...',
    },
    // Add more press releases as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Press Releases</h1>
      <div className="space-y-4">
        {pressReleases.map((release) => (
          <div key={release.id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">{release.title}</h2>
            <p className="text-gray-500">{release.date}</p>
            <p className="mt-2">{release.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PressReleases;