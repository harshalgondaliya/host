import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect } from "react";

const InvestorRelations = () => {
  useEffect(() => {
      window.scrollTo(0, 0); // This ensures the page always starts from the top
    }, []);


  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="flex flex-col items-center justify-center w-full h-full bg-yellow-400 p-0 overflow-y-auto">
      <div className="min-h-screen bg-gradient-to-b from-green-950 via-white to-green-950 flex flex-col items-center p-8">
          <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 max-w-4xl w-full transition-transform duration-300 hover:scale-105">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 animate-fadeIn">
              Investor Relations
            </h1>
            <p className="text-gray-700 text-center mb-6">
              Stay updated with our company's financial performance, governance
              policies, and shareholder information.
            </p>

            <div className="space-y-8">
              <section className="bg-gradient-to-r from-green-100 to-green-200 p-4 md:p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  Financial Reports
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Annual & Quarterly Reports</li>
                  <li>Regulatory Filings</li>
                  <li>Investor Presentations</li>
                </ul>
              </section>

              <section className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 md:p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  Corporate Governance
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Board of Directors & Leadership</li>
                  <li>Ethical Standards & Compliance</li>
                  <li>Governance Policies</li>
                </ul>
              </section>

              <section className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 md:p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  Shareholder Services
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Stock Information & Performance</li>
                  <li>Dividend & Earnings Announcements</li>
                  <li>FAQs & Investor Contact</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InvestorRelations;
