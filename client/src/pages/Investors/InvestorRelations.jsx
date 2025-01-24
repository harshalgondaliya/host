import React from 'react';

const InvestorRelations = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Investor Relations</h1>
        <p className="text-gray-700 mb-4">
          Welcome to our Investor Relations page. Here you will find all the information you need about our company's financial performance, governance, and shareholder services.
        </p>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Financial Reports</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Annual Reports</li>
            <li>Quarterly Reports</li>
            <li>SEC Filings</li>
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Corporate Governance</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Board of Directors</li>
            <li>Committees</li>
            <li>Code of Conduct</li>
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Shareholder Services</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Stock Information</li>
            <li>Dividend Information</li>
            <li>Investor FAQs</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InvestorRelations;