import { useState, useEffect } from "react";
import Navigation from "@/navigation/Navigation";

const GrowWithMe = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      <main className="pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Grow With Me
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Join me on a journey of innovation, leadership, and continuous growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Mentorship Opportunities</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Get personalized guidance and insights from years of experience in technology leadership and entrepreneurship.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Investment Partnerships</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Explore potential collaborations and investment opportunities in emerging technologies and innovative startups.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Strategic Advisory</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Leverage strategic insights and industry expertise to accelerate your business growth and innovation.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Networking Events</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Connect with like-minded professionals and thought leaders through exclusive networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GrowWithMe; 