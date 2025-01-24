import React from 'react';

const OurStory = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Our Story</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#about" className="text-gray-600 hover:text-gray-800 transition duration-300">About</a></li>
              <li><a href="#mission" className="text-gray-600 hover:text-gray-800 transition duration-300">Mission</a></li>
              <li><a href="#team" className="text-gray-600 hover:text-gray-800 transition duration-300">Team</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-gray-800 transition duration-300">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-8">
        <section id="about" className="py-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
          </div>
        </section>

        <section id="mission" className="py-12 bg-white shadow-md rounded-lg mt-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
          </div>
        </section>

        <section id="team" className="py-12 mt-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Team</h2>
            <div className="flex flex-wrap justify-center">
              <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
                <div className="bg-white shadow-md rounded-lg p-6">
                  <img src="https://via.placeholder.com/150" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4"/>
                  <h3 className="text-xl font-bold text-gray-800">John Doe</h3>
                  <p className="text-gray-600">CEO</p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
                <div className="bg-white shadow-md rounded-lg p-6">
                  <img src="https://via.placeholder.com/150" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4"/>
                  <h3 className="text-xl font-bold text-gray-800">Jane Smith</h3>
                  <p className="text-gray-600">CTO</p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
                <div className="bg-white shadow-md rounded-lg p-6">
                  <img src="https://via.placeholder.com/150" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4"/>
                  <h3 className="text-xl font-bold text-gray-800">Mike Johnson</h3>
                  <p className="text-gray-600">CFO</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-12 bg-white shadow-md rounded-lg mt-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            <form className="mt-8 max-w-lg mx-auto">
              <div className="mb-4">
                <input type="text" placeholder="Name" className="w-full p-3 border border-gray-300 rounded-lg"/>
              </div>
              <div className="mb-4">
                <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg"/>
              </div>
              <div className="mb-4">
                <textarea placeholder="Message" className="w-full p-3 border border-gray-300 rounded-lg"></textarea>
              </div>
              <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">Send Message</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Our Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default OurStory;