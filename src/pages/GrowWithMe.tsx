import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Curtain from "@/components/Curtain";

const GrowWithMe = () => {
  const [showCurtain, setShowCurtain] = useState(true);

  useEffect(() => {
    // Show curtain on component mount
    setShowCurtain(true);
  }, []);

  const handleCurtainComplete = () => {
    setShowCurtain(false);
  };

  return (
    <>
      <Curtain 
        isVisible={showCurtain} 
        sectionName="Grow With Me" 
        onComplete={handleCurtainComplete} 
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation />
        
        <main className="pt-32">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Grow With Me
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Join me on a journey of innovation, leadership, and continuous growth
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Mentorship Opportunities</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get personalized guidance and insights from years of experience in technology leadership and entrepreneurship.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Investment Partnerships</h3>
                <p className="text-gray-600 leading-relaxed">
                  Explore potential collaborations and investment opportunities in emerging technologies and innovative startups.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Strategic Advisory</h3>
                <p className="text-gray-600 leading-relaxed">
                  Leverage strategic insights and industry expertise to accelerate your business growth and innovation.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Networking Events</h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect with like-minded professionals and thought leaders through exclusive networking opportunities.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default GrowWithMe; 