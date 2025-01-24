import React from 'react';

const faqs = [
  {
    question: "What is an investor?",
    answer: "An investor is an individual or entity that allocates capital with the expectation of a future financial return."
  },
  {
    question: "How do I become an investor?",
    answer: "To become an investor, you typically need to have some capital to invest and a basic understanding of the markets or assets you are investing in."
  },
  // Add more FAQs as needed
];

const InvestorFAQs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Investor FAQs</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{faq.question}</h2>
            <p className="mt-2 text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestorFAQs;