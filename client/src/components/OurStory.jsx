import React, { useEffect } from "react";
import { motion } from "framer-motion";
import all from "../assets/images/ALL BOTTLES.webp";
import quality from "../assets/images/quality.webp";
import reasearch from "../assets/images/Research.webp";
import news from "../assets/images/Media-News.webp";
import machine from "../assets/images/machine.webp";
import Navbar from "./Navbar";
import Footer from "./Footer";

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const OurStory = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <br /><br />
      <div className="bg-yellow-400 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-56 py-12 md:py-20">
        {/* Mission Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInLeft}
          className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-16"
        >
          <div className="flex-1 text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-3 md:mb-5" style={{ fontFamily: '"Comic Sans MS", cursive' }}>Profiles</h1>
            <p className="text-base md:text-lg text-green-700 leading-relaxed" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
              TooMore Beverages is a complete beverages company, bringing the best of the traditional and contemporary aspects of beverages. Offering more than a dozen brands, we satisfy the requirements of diverse consumers.
            </p>
          </div>
          <div className="flex-1 text-center mt-6 md:mt-0">
            <img
              src={all}
              alt="Mission Founders"
              className="w-full max-w-md mx-auto rounded-lg shadow-xl transition-transform hover:scale-105 bg-white p-2"
            />
          </div>
        </motion.section>

        {/* Vision & Mission Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInRight}
          className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10 mb-16"
        >
          <div className="flex-1 text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-3 md:mb-5" style={{ fontFamily: '"Comic Sans MS", cursive' }}>Quality</h1>
            <p className="text-base md:text-lg text-green-700 leading-relaxed" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
              Right from our inception, we have focused on the highest standards in quality that address customer satisfaction and regulatory compliance.
            </p>
          </div>
          <div className="flex-1 text-center mt-6 md:mt-0">
            <img
              src={quality}
              alt="Our Story"
              className="w-full max-w-md mx-auto rounded-lg shadow-xl transition-transform hover:scale-105 bg-white p-2"
            />
          </div>
        </motion.section>

        {/* Leadership Team Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInLeft}
          className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-16"
        >
          <div className="flex-1 text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-3 md:mb-5" style={{ fontFamily: '"Comic Sans MS", cursive' }}>Research</h1>
            <p className="text-base md:text-lg text-green-700 leading-relaxed" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
              At TooMore, research and development is an integral part of developing newer products and flavors. Our team of highly qualified, competent and experienced professionals include engineers, technicians, quality controllers, sales personnel, analysts and others.
            </p>
          </div>
          <div className="flex-1 text-center mt-6 md:mt-0">
            <img
              src={reasearch}
              alt="Leadership Team"
              className="w-full max-w-md mx-auto rounded-lg shadow-xl transition-transform hover:scale-105 bg-white p-2"
            />
          </div>
        </motion.section>

        {/* Milestone Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInRight}
          className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10 mb-16"
        >
          <div className="flex-1 text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-3 md:mb-5" style={{ fontFamily: '"Comic Sans MS", cursive' }}>Modern Facilities</h1>
            <p className="text-base md:text-lg text-green-700 leading-relaxed" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
              Our modern production facilities, based in Rajkot, Gujarat, are designed with the best infrastructure, technology, machines, and processes to enable high scalability with quality. We provide an engaging, rewarding, and growth-oriented work environment to our skilled workforce.
            </p>
          </div>
          <div className="flex-1 text-center mt-6 md:mt-0">
            <img
              src={machine}
              alt="Milestone"
              className="w-full max-w-md mx-auto rounded-lg shadow-xl transition-transform hover:scale-105 bg-white p-2"
            />
          </div>
        </motion.section>

        {/* News and Media Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row items-center gap-6 md:gap-10"
        >
          <div className="flex-1 text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-3 md:mb-5" style={{ fontFamily: '"Comic Sans MS", cursive' }}>News and Media</h1>
            <p className="text-base md:text-lg text-green-700 leading-relaxed" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
              There's this notion that to grow a business, you have to be ruthless.
              But we know there's a better way to grow. One where what's good for
              the bottom line is also good for customers. We believe businesses can
              grow with a conscience, and succeed with a soul—and that they can do
              it with inbound.
            </p>
          </div>
          <div className="flex-1 text-center mt-6 md:mt-0">
            <img
              src={news}
              alt="News and Media"
              className="w-full max-w-md mx-auto rounded-lg shadow-xl transition-transform hover:scale-105 bg-white p-2"
            />
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default OurStory;
