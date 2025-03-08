import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';

const FAQs = () => {
  const faqs = [
    {
      question: "What is your return policy?",
      answer: "Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange."
    },
    {
      question: "How do I track my order?",
      answer: "You can track your order by logging into your account and visiting the 'Orders' section."
    },
    {
      question: "Can I purchase items again?",
      answer: "Yes, you can repurchase items by visiting your order history and selecting the items you wish to buy again."
    }
  ];

  return (
    <>
      <Navbar />
      <br /><br />
      <div className="min-h-screen bg-yellow-500 p-4 md:p-8 flex flex-col items-center">
      <br /><br /><br />
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 md:p-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center text-green-950 mb-6">Frequently Asked Questions</h1>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.5, delay: index * 0.1 }} 
                viewport={{ once: true }}
                className="border-b pb-4 last:border-b-0"
              >
                <h2 className="text-lg md:text-xl font-semibold text-green-950 cursor-pointer hover:text-orange-500 transition-all duration-300">{faq.question}</h2>
                <motion.p 
                  className="mt-2 text-gray-600 text-sm md:text-base"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {faq.answer}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default FAQs;