import React, { useEffect } from "react";
import { motion } from "framer-motion";
import missionImage from "../assets/images/back.png";
import storyImage from "../assets/images/front.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";

const fadeInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const OurStory = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-yellow-400 px-15 md:px-56 py-20">
        {/* Mission Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInLeft}
          className="flex flex-col md:flex-row items-center gap-10"
        >
          <div className="flex-1 text-left">
            <h1 className="text-4xl font-bold text-green-700 mb-5"style={{ fontFamily: '"Comic Sans MS", cursive' }}>About Us</h1>
            <p className="text-lg text-green-700 leading-relaxed"style={{ fontFamily: '"Comic Sans MS", cursive' }}>
            There's this notion that to grow a business, you have to be ruthless.
            But we know there's a better way to grow. One where what's good for
            the bottom line is also good for customers. We believe businesses can
            grow with a conscience, and succeed with a soul—and that they can do
            it with inbound.
            </p>
          </div>
          <div className="flex-1 text-center">
            <img
              src={missionImage}
              alt="Mission Founders"
              className="w-full max-w-md rounded-lg shadow-lg transition-transform hover:scale-105 bg-white"
            />
          </div>
        </motion.section>

        {/* Vision & Mission Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInRight}
          className="flex flex-col md:flex-row-reverse items-center gap-10 mt-16"
        >
          <div className="flex-1 text-left">
            <h1 className="text-4xl font-bold text-green-700 mb-5"style={{ fontFamily: '"Comic Sans MS", cursive' }}>Vision & Mission</h1>
            <p className="text-lg text-green-700 leading-relaxed"style={{ fontFamily: '"Comic Sans MS", cursive' }}>
            As fellow graduate students, we noticed a shift in the way people shop
            and buy. Consumers were no longer tolerating interruptive bids for
            their attention. In fact, they'd gotten really good at ignoring them.
            So, we set out to create a new approach.
            </p>
          </div>
          <div className="flex-1 text-center">
            <img
              src={storyImage}
              alt="Our Story"
              className="w-full max-w-md rounded-lg shadow-lg transition-transform hover:scale-105 bg-white"
            />
          </div>
        </motion.section>

        {/* Leadership Team Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInLeft}
          className="flex flex-col md:flex-row items-center gap-10 mt-16"
        >
          <div className="flex-1 text-left">
            <h1 className="text-4xl font-bold text-green-700 mb-5"style={{ fontFamily: '"Comic Sans MS", cursive' }}>Leadership Team</h1>
            <p className="text-lg text-green-700 leading-relaxed"style={{ fontFamily: '"Comic Sans MS", cursive' }}>
            There's this notion that to grow a business, you have to be ruthless.
            But we know there's a better way to grow. One where what's good for
            the bottom line is also good for customers. We believe businesses can
            grow with a conscience, and succeed with a soul—and that they can do
            it with inbound.
            </p>
          </div>
          <div className="flex-1 text-center">
            <img
              src={missionImage}
              alt="Leadership Team"
              className="w-full max-w-md rounded-lg shadow-lg transition-transform hover:scale-105 bg-white"
            />
          </div>
        </motion.section>

        {/* Milestone Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInRight}
          className="flex flex-col md:flex-row-reverse items-center gap-10 mt-16"
        >
          <div className="flex-1 text-left">
            <h1 className="text-4xl font-bold text-green-700 mb-5"style={{ fontFamily: '"Comic Sans MS", cursive' }}>Milestone</h1>
            <p className="text-lg text-green-700 leading-relaxed"style={{ fontFamily: '"Comic Sans MS", cursive' }}>
            As fellow graduate students, we noticed a shift in the way people shop
            and buy. Consumers were no longer tolerating interruptive bids for
            their attention. In fact, they'd gotten really good at ignoring them.
            So, we set out to create a new approach.
            </p>
          </div>
          <div className="flex-1 text-center">
            <img
              src={storyImage}
              alt="Milestone"
              className="w-full max-w-md rounded-lg shadow-lg transition-transform hover:scale-105 bg-white"
            />
          </div>
        </motion.section>

        {/* News and Media Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInLeft}
          className="flex flex-col md:flex-row items-center gap-10 mt-16"
        >
          <div className="flex-1 text-left">
            <h1 className="text-4xl font-bold text-green-700 mb-5"style={{ fontFamily: '"Comic Sans MS", cursive' }}>News and Media</h1>
            <p className="text-lg text-green-700 leading-relaxed"style={{ fontFamily: '"Comic Sans MS", cursive' }}>
            There's this notion that to grow a business, you have to be ruthless.
            But we know there's a better way to grow. One where what's good for
            the bottom line is also good for customers. We believe businesses can
            grow with a conscience, and succeed with a soul—and that they can do
            it with inbound.
            </p>
          </div>
          <div className="flex-1 text-center">
            <img
              src={missionImage}
              alt="News and Media"
              className="w-full max-w-md rounded-lg shadow-lg transition-transform hover:scale-105 bg-white"
            />
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default OurStory;
