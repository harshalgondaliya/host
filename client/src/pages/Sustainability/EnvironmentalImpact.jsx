import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { useEffect } from "react";
const impactData = [
  {
    title: "Energy Efficiency",
    description:
      "We use energy-efficient technologies and renewable energy sources to reduce our carbon footprint.",
    image: "https://images.unsplash.com/photo-1499549549616-57173fc0c15b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "https://www.pexels.com/download/video/856208/",
  },
  {
    title: "Waste Reduction",
    description:
      "Our waste reduction programs focus on recycling, composting, and minimizing single-use plastics.",
    image: "https://storage.googleapis.com/realtyplusmag-news-photo/news-photo/110378.4.jpg",
    video: "https://www.pexels.com/download/video/856187/",
  },
  {
    title: "Water Conservation",
    description:
      "We implement water-saving measures and technologies to conserve this precious resource.",
    image: "https://www.dlf.in/offices/blog/images/1698929033.jpg",
    video: "https://www.pexels.com/download/video/857220/",
  },
  {
    title: "Sustainable Sourcing",
    description:
      "We prioritize sourcing materials from sustainable and ethical suppliers, supporting local communities.",
    image: "https://www.tyasuite.com/uploads/blog/Ethical-and-sustainable-sourcing%20(1).webp",
    video: "https://www.pexels.com/download/video/4802449/",
  },
];

const EnvironmentalImpact = () => {
   useEffect(() => {
      window.scrollTo(0, 0); // This ensures the page always starts from the top
    }, []);

  return (
    <>
      <Navbar />
      <br /><br />
      <div className="bg-yellow-500 min-h-screen flex flex-col items-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl w-full bg-white shadow-lg rounded-3xl p-6 md:p-10"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-green-700 mb-4 text-center">Environmental Impact</h1>
          <p className="text-gray-700 text-base md:text-lg mb-6 text-center">
            Our commitment to sustainability is at the core of everything we do. We strive to minimize our environmental footprint and promote eco-friendly practices.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10">
            {impactData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-green-100 p-5 md:p-7 rounded-2xl shadow-md overflow-hidden flex flex-col items-center text-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 md:h-56 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl md:text-2xl font-semibold text-green-600 mb-2">{item.title}</h2>
                <p className="text-gray-600 text-sm md:text-base mb-4">{item.description}</p>
                <video autoPlay loop muted className="w-full h-40 md:h-56 object-cover rounded-lg">
                  <source src={item.video} type="video/mp4" />
                </video>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default EnvironmentalImpact;