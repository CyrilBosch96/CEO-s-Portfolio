import { useState, useEffect } from "react";
import Navigation from "@/navigation/Navigation";
import { Globe } from "lucide-react";

const Index = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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
    }, 300); // Change every 300ms to complete cycle in 1.5 seconds

    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 1500); // Reduced from 3000ms to 1500ms

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
  }, [greetings.length]);

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
      <div className="min-h-screen" style={{
        background: `
          radial-gradient(ellipse at 30% 20%, rgba(147, 51, 234, 0.08) 0%, transparent 40%),
          radial-gradient(ellipse at 70% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
          radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.04) 0%, transparent 60%)
        `
      }}>
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
            className="absolute inset-0 transition-transform duration-100 ease-out"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
          >
            <div className="relative w-full h-full">
              <img 
                src="/src/assets/images/coverimage/Philcover.png"
                alt="Philip Samuelraj"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Side Text - Responsive positioning */}
          <div className="absolute top-1/2 right-2 sm:right-4 md:right-6 lg:right-8 xl:right-12 transform -translate-y-1/2 text-right z-10 px-2 sm:px-0">
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light text-white leading-relaxed drop-shadow-lg">
              <div className="mb-1 sm:mb-2">Innovator</div>
              <div className="mb-1 sm:mb-2">Investor</div>
              <div>Leader</div>
            </div>
          </div>

          {/* Bottom Text - Responsive marquee */}
          <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 left-0 right-0 z-10 px-2 sm:px-0">
            <div className="overflow-hidden whitespace-nowrap">
              <div className="animate-marquee inline-block text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[12rem] font-bold text-white tracking-tight drop-shadow-lg">
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
