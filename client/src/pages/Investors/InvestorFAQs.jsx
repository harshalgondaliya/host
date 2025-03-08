import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const faqs = [
  {
    question: "What is an investor?",
    answer: "An investor is an individual or entity that allocates capital with the expectation of a future financial return."
  },
  {
    question: "How do I become an investor?",
    answer: "To become an investor, you typically need to have some capital to invest and a basic understanding of the markets or assets you are investing in."
  },
  {
    question: "What are the different types of investments?",
    answer: "Investments include stocks, bonds, real estate, mutual funds, and cryptocurrencies, among others."
  },
  {
    question: "Is investing risky?",
    answer: "Yes, all investments carry some level of risk, but diversification and informed decision-making can help manage risk."
  }
];

const InvestorFAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <br /><br />
      <div className="min-h-screen bg-gradient-to-b from-green-950 via-white to-green-950 flex flex-col items-center p-8">
        <br /><br /><br /><br />
        <div className="max-w-4xl w-full p-6 bg-white rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 animate-fadeIn">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Investor FAQs</h1>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="p-4 border rounded-lg shadow-sm transition-all duration-300 hover:bg-blue-50 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h2 className="text-xl font-semibold flex justify-between items-center">
                  {faq.question}
                  <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                    ▼
                  </span>
                </h2>
                <p 
                  className={`mt-2 text-gray-700 overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InvestorFAQs;
