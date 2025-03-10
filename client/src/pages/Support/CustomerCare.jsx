import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const CustomerCare = () => {

  useEffect(() => {
      window.scrollTo(0, 0); // This ensures the page always starts from the top
    }, []);
    

  return (
    <>
      <Navbar />
      <br /><br />
      <div className="min-h-screen bg-gradient-to-b from-green-950 via-white to-green-950 flex items-center justify-center px-6 py-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-xl w-full text-center"
        >
          <motion.h2 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold text-green-950 mb-6"
          >
            Customer Care
          </motion.h2>
          <p className="text-green-950 mb-6">We are here to help you. Reach out to us with your queries.</p>
          <form className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <label className="block text-gray-700 text-left font-medium">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Your Name"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            >
              <label className="block text-gray-700 text-left font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Your Email"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            >
              <label className="block text-gray-700 text-left font-medium">Message</label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Your Message"
                rows="4"
              ></textarea>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.08 }} 
              whileTap={{ scale: 0.95 }} 
              transition={{ duration: 0.2 }}
              className="w-full bg-green-950 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300"
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerCare;