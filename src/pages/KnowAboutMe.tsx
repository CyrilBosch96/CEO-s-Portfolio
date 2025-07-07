import Navigation from "@/components/Navigation";

const KnowAboutMe = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      <main className="pt-32">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Know About Me
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover my journey, values, and vision for the future of technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Professional Journey</h3>
              <p className="text-gray-600 leading-relaxed">
                From founding Techjays to leading innovative ventures, explore my path in technology and entrepreneurship.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Leadership Philosophy</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn about my approach to leadership, innovation, and building successful technology companies.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Vision & Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Understanding the core principles that guide my decisions and shape my vision for the future.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Personal Interests</h3>
              <p className="text-gray-600 leading-relaxed">
                Beyond the boardroom, discover my passions and interests that shape my perspective.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KnowAboutMe; 