import React from 'react';

const SustainabilityReports = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-green-600 text-white text-center py-4">
          <h1 className="text-3xl font-bold">Sustainability Reports</h1>
        </header>
        <main className="p-6 md:p-12">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
            <p className="text-gray-700 leading-relaxed">
              We are committed to sustainability and transparency. Our reports provide detailed insights into our efforts to minimize our environmental impact and promote social responsibility.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Latest Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">2023 Sustainability Report</h3>
                <p className="text-gray-600 mb-4">An overview of our sustainability initiatives and achievements in 2023.</p>
                <a href="#" className="text-green-600 hover:underline">Read more</a>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">2022 Sustainability Report</h3>
                <p className="text-gray-600 mb-4">An overview of our sustainability initiatives and achievements in 2022.</p>
                <a href="#" className="text-green-600 hover:underline">Read more</a>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">2021 Sustainability Report</h3>
                <p className="text-gray-600 mb-4">An overview of our sustainability initiatives and achievements in 2021.</p>
                <a href="#" className="text-green-600 hover:underline">Read more</a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SustainabilityReports;