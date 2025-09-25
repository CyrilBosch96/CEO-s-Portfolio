
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

interface Service {
  icon: string;
  title: string;
  description: string;
  url: string;
}

const ServicesCardDeck = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const services: Service[] = [
    {
      icon: "✨",
      title: "Artificial Intelligence & Data",
      description: "Leverage cutting-edge AI and data analytics to transform your business insights and automate intelligent decision-making processes.",
      url: "https://www.techjays.com/ai-services-company"
    },
    {
      icon: "💻",
      title: "Custom Software Development",
      description: "Build tailored software solutions that perfectly match your business requirements with scalable and maintainable architectures.",
      url: "https://www.techjays.com/custom-software-development-company"
    },
    {
      icon: "🎨",
      title: "Premium Design Services",
      description: "Create stunning user experiences with our expert UI/UX design team, focusing on aesthetics, usability, and brand identity.",
      url: "https://www.techjays.com/web-design-and-development-services"
    },
    {
      icon: "📱",
      title: "Product Development",
      description: "From concept to launch, we guide your product journey with agile methodologies and innovative development practices.",
      url: "https://www.techjays.com/product-development-company"
    },
    {
      icon: "✅",
      title: "Quality Assurance",
      description: "Ensure flawless performance with comprehensive testing strategies, automated workflows, and continuous quality monitoring.",
      url: "https://www.techjays.com/ai-qa-software-testing-services"
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      description: "Migrate and optimize your infrastructure with modern cloud architectures for enhanced scalability, security, and performance.",
      url: "https://www.techjays.com/cloud-based-services"
    }
  ];

  // URL validation function
  const isValidUrl = useCallback((url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'https:' && urlObj.hostname === 'www.techjays.com';
    } catch {
      return false;
    }
  }, []);

  // Safe URL opening with error handling
  const openServiceUrl = useCallback((url: string) => {
    if (!isValidUrl(url)) {
      console.warn('Invalid URL:', url);
      return;
    }
    
    try {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Failed to open URL:', error);
      try {
        window.location.href = url;
      } catch (fallbackError) {
        console.error('Fallback navigation also failed:', fallbackError);
      }
    }
  }, [isValidUrl]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize infinite carousel
  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    
    // Create infinite loop by duplicating the services
    const duplicatedServices = [...services, ...services, ...services];
    
    // Set up infinite scroll animation
    gsap.to(carousel, {
      x: -(services.length * 286), // card width (280px) + gap (6px)
      duration: 20,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        // Reset position seamlessly
        gsap.set(carousel, { x: 0 });
      }
    });

  }, [services.length]);

  return (
    <div className="w-full py-6 sm:py-8 md:py-16 relative bg-transparent">
      <div className="w-full text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-12 md:mb-16 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent px-4 leading-tight">
          Techjays Services
        </h2>

        <div 
          ref={containerRef}
          className="relative h-[280px] sm:h-[320px] md:h-[360px] overflow-hidden w-full bg-transparent"
        >
          <div 
            ref={carouselRef}
            className="flex gap-6 absolute top-0 left-0 h-full"
            style={{ 
              width: `${services.length * 3 * 286}px`, // 3 sets of cards for infinite loop (280px + 6px gap)
              minWidth: '100vw'
            }}
          >
            {/* First set of cards */}
            {services.map((service, index) => (
              <div
                key={`set1-${index}`}
                className="w-[220px] sm:w-[250px] md:w-[280px] h-full flex-shrink-0 cursor-pointer"
                onClick={() => openServiceUrl(service.url)}
              >
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-xl border border-white/50 h-full w-full flex flex-col items-center justify-center text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-purple-100 hover:via-blue-100 hover:to-pink-100 hover:rounded-2xl">
                    <div className="flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-md w-10 h-10 sm:w-12 sm:h-12 text-xl sm:text-2xl mb-2 sm:mb-3 hover:from-purple-500 hover:via-blue-500 hover:to-pink-500 hover:shadow-lg hover:scale-110 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-xs sm:text-sm mb-2 sm:mb-3 flex-1">
                    {service.description}
                  </p>
                    <div className="flex items-center gap-1 text-purple-600 font-medium text-xs sm:text-sm hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:via-blue-500 hover:to-pink-500 hover:bg-clip-text transition-all duration-300">
                    <span>Learn More</span>
                    <svg className="w-3 h-3 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}

            {/* Second set of cards (duplicate for seamless loop) */}
            {services.map((service, index) => (
              <div
                key={`set2-${index}`}
                className="w-[220px] sm:w-[250px] md:w-[280px] h-full flex-shrink-0 cursor-pointer"
                onClick={() => openServiceUrl(service.url)}
              >
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-xl border border-white/50 h-full w-full flex flex-col items-center justify-center text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-purple-100 hover:via-blue-100 hover:to-pink-100 hover:rounded-2xl">
                    <div className="flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-md w-10 h-10 sm:w-12 sm:h-12 text-xl sm:text-2xl mb-2 sm:mb-3 hover:from-purple-500 hover:via-blue-500 hover:to-pink-500 hover:shadow-lg hover:scale-110 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-xs sm:text-sm mb-2 sm:mb-3 flex-1">
                    {service.description}
                  </p>
                    <div className="flex items-center gap-1 text-purple-600 font-medium text-xs sm:text-sm hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:via-blue-500 hover:to-pink-500 hover:bg-clip-text transition-all duration-300">
                    <span>Learn More</span>
                    <svg className="w-3 h-3 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}

            {/* Third set of cards (duplicate for seamless loop) */}
            {services.map((service, index) => (
              <div
                key={`set3-${index}`}
                className="w-[220px] sm:w-[250px] md:w-[280px] h-full flex-shrink-0 cursor-pointer"
                onClick={() => openServiceUrl(service.url)}
              >
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-xl border border-white/50 h-full w-full flex flex-col items-center justify-center text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-purple-100 hover:via-blue-100 hover:to-pink-100 hover:rounded-2xl">
                    <div className="flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-md w-10 h-10 sm:w-12 sm:h-12 text-xl sm:text-2xl mb-2 sm:mb-3 hover:from-purple-500 hover:via-blue-500 hover:to-pink-500 hover:shadow-lg hover:scale-110 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-xs sm:text-sm mb-2 sm:mb-3 flex-1">
                    {service.description}
                  </p>
                    <div className="flex items-center gap-1 text-purple-600 font-medium text-xs sm:text-sm hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:via-blue-500 hover:to-pink-500 hover:bg-clip-text transition-all duration-300">
                    <span>Learn More</span>
                    <svg className="w-3 h-3 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .carousel-container {
            overflow: hidden;
            position: relative;
          }
          
          .carousel-item {
            transition: transform 0.3s ease;
          }
        `}
      </style>
    </div>
  );
};

export default ServicesCardDeck;
