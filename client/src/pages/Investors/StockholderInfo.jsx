import React from 'react';

const StockholderInfo = () => {
  const stockholders = [
    { name: 'John Doe', shares: 1500 },
    { name: 'Jane Smith', shares: 2000 },
    { name: 'Michael Johnson', shares: 1200 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stockholder Information</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Shares</th>
          </tr>
        </thead>
        <tbody>
          {stockholders.map((stockholder, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{stockholder.name}</td>
              <td className="py-2 px-4 border-b">{stockholder.shares}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockholderInfo;