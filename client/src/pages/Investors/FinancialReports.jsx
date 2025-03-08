import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const FinancialReports = () => {
  const reports = [
    { id: 1, title: 'Q1 2023 Report', date: '2023-04-15', link: '#' },
    { id: 2, title: 'Q2 2023 Report', date: '2023-07-15', link: '#' },
    { id: 3, title: 'Q3 2023 Report', date: '2023-10-15', link: '#' },
  ];

  return (
    <>
    <Navbar />
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Financial Reports</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <ul>
          {reports.map((report) => (
            <li key={report.id} className="mb-4">
              <a href={report.link} className="text-blue-500 hover:underline">
                <h2 className="text-xl font-semibold">{report.title}</h2>
                <p className="text-gray-600">{report.date}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default FinancialReports;