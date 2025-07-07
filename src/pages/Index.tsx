import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";

const Index = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showOptions, setShowOptions] = useState(false);
  
  const navigate = useNavigate();

  const greetings = [
    "Hello",      // English
    "Bonjour",    // French
    "Hallo",      // German
    "வணக்கம்",    // Tamil
    "Hola"        // Spanish
  ];

  useEffect(() => {
    const greetingInterval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 600); // Change every 600ms to complete cycle in 3 seconds

    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10 to 10
      const y = (e.clientY / window.innerHeight - 0.5) * 20; // -10 to 10
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(greetingInterval);
      clearTimeout(loaderTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <div 
        className={`fixed inset-0 bg-black z-[100] flex items-center justify-center transition-transform duration-1000 ${
          showLoader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <h1 className="text-white text-4xl sm:text-6xl md:text-8xl font-light tracking-wide px-4 text-center">
          {greetings[currentGreeting]}
        </h1>
      </div>

      {/* Main Content */}
      <div className="min-h-screen" style={{ background: 'linear-gradient(to right, white, #a8b2d1, #c4b5fd)' }}>
        <Navigation />
        
        {/* Location Text */}
        <div className="fixed bottom-4 left-4 z-50">
          <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-full text-xs sm:text-sm">
            <Globe size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Located in Menlo Park, CA</span>
            <span className="sm:hidden">Menlo Park, CA</span>
          </div>
        </div>
        
        <main className="pt-16 sm:pt-20 min-h-screen flex flex-col relative overflow-hidden">
          {/* Hero Image positioned with parallax effect */}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-0 transition-transform duration-100 ease-out sm:bottom-0"
            style={{
              transform: `translate(-50%, 0) translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              height: '75vh'
            }}
          >
            <div className="relative">
              <img 
                src="/lovable-uploads/3c091176-f9d0-4e0e-8d95-d505ba340543.png"
                alt="Philip Samuelraj"
                className="w-[300px] h-[334px] sm:w-[500px] sm:h-[556px] md:w-[600px] md:h-[668px] lg:w-[700px] lg:h-[779px] xl:w-[800px] xl:h-[890px] object-cover object-top cursor-pointer"
                onClick={() => setShowOptions(!showOptions)}
              />
              
              {/* Left Option */}
              <div 
                className={`absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 transition-all duration-300 ${
                  showOptions ? 'opacity-100 translate-x-2 sm:translate-x-4' : 'opacity-0 -translate-x-4 sm:-translate-x-8'
                }`}
                style={{ left: '-80px' }}
              >
                <button 
                  className="bg-white/90 backdrop-blur-sm px-3 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg hover:bg-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/grow-with-me');
                  }}
                >
                  <span className="text-gray-900 font-medium text-sm sm:text-base">Grow with me</span>
                </button>
              </div>

              {/* Right Option */}
              <div 
                className={`absolute right-0 top-1/2 translate-x-full -translate-y-1/2 transition-all duration-300 ${
                  showOptions ? 'opacity-100 -translate-x-2 sm:-translate-x-4' : 'opacity-0 translate-x-4 sm:translate-x-8'
                }`}
              >
                <button 
                  className="bg-white/90 backdrop-blur-sm px-3 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg hover:bg-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/know-about-me');
                  }}
                >
                  <span className="text-gray-900 font-medium text-sm sm:text-base">Know About me</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Text */}
          <div className="absolute top-1/2 right-2 sm:right-4 md:right-8 transform -translate-y-1/2 text-right">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-gray-500 leading-relaxed">
              <div>Innovator</div>
              <div>Investor</div>
              <div>Leader</div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="absolute bottom-4 sm:bottom-8 left-0 right-0">
            <div className="overflow-hidden whitespace-nowrap">
              <div className="animate-marquee inline-block text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-gray-500 tracking-tight">
                Philip Samuelraj — Philip Samuelraj — Philip Samuelraj — Philip Samuelraj — Philip Samuelraj — Philip Samuelraj — 
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;
