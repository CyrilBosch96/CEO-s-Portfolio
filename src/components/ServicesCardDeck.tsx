
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ServicesCardDeck = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const services = [
    {
      icon: "✨",
      title: "Artificial Intelligence & Data",
      description: "Leverage cutting-edge AI and data analytics to transform your business insights and automate intelligent decision-making processes."
    },
    {
      icon: "💻",
      title: "Custom Software Development",
      description: "Build tailored software solutions that perfectly match your business requirements with scalable and maintainable architectures."
    },
    {
      icon: "🎨",
      title: "Premium Design Services",
      description: "Create stunning user experiences with our expert UI/UX design team, focusing on aesthetics, usability, and brand identity."
    },
    {
      icon: "📱",
      title: "Product Development",
      description: "From concept to launch, we guide your product journey with agile methodologies and innovative development practices."
    },
    {
      icon: "✅",
      title: "Quality Assurance",
      description: "Ensure flawless performance with comprehensive testing strategies, automated workflows, and continuous quality monitoring."
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      description: "Migrate and optimize your infrastructure with modern cloud architectures for enhanced scalability, security, and performance."
    }
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateDeck = () => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      let offset = index - currentIndex;
      if (offset > services.length / 2) {
        offset -= services.length;
      } else if (offset < -services.length / 2) {
        offset += services.length;
      }
      
      const absOffset = Math.abs(offset);
      
      // Responsive positioning
      const cardSpacing = isMobile ? 100 : 170;
      const depthSpacing = isMobile ? 80 : 120;
      const rotationAmount = isMobile ? -5 : -10;
      
      const x = offset * cardSpacing;
      const z = -absOffset * depthSpacing;
      const rotateY = offset * rotationAmount;
      const scale = Math.max(0.7, 1 - (absOffset * (isMobile ? 0.15 : 0.13)));
      let opacity = Math.max(0, 1 - (absOffset * 0.32));
      
      if (absOffset > (isMobile ? 1 : 2)) {
        opacity = 0;
      }
      
      gsap.to(card, {
        x: x,
        z: z,
        rotateY: rotateY,
        scale: scale,
        opacity: opacity,
        duration: 0.8,
        ease: "power2.out",
        force3D: true,
        transformOrigin: "center center"
      });
      
      card.style.zIndex = (services.length - absOffset).toString();
    });
  };

  const nextCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % services.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const prevCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const goToCard = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextCard();
    } else if (isRightSwipe) {
      prevCard();
    }
  };

  useEffect(() => {
    updateDeck();
  }, [currentIndex, isMobile]);

  useEffect(() => {
    // Initialize animations
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }

    // Auto-play (slower on mobile)
    const autoPlayInterval = setInterval(() => {
      nextCard();
    }, isMobile ? 5000 : 4000);

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextCard();
      if (e.key === 'ArrowLeft') prevCard();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(autoPlayInterval);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobile]);

  return (
    <div className="w-full py-8 md:py-16 px-4 md:px-6 relative">
      {/* Background particles - fewer on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: isMobile ? 15 : 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.6), rgba(59, 130, 246, 0.6))',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animation: 'float 20s infinite linear'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-16 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent px-4">
          Techjays Services
        </h2>

        <div 
          ref={containerRef}
          className="relative h-[400px] sm:h-[450px] md:h-[500px] flex items-center justify-center"
          style={{ perspective: isMobile ? '1000px' : '2000px' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className={`absolute bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl border border-white/50 cursor-pointer flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 ${
                isMobile 
                  ? 'w-[300px] h-[350px] flex-col text-center' 
                  : 'w-[350px] sm:w-[500px] md:w-[600px] lg:w-[700px] h-[300px] sm:h-[350px] md:h-[400px]'
              }`}
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                willChange: 'transform, opacity'
              }}
              onMouseEnter={() => {
                const card = cardsRef.current[index];
                if (card && index === currentIndex && !isAnimating && !isMobile) {
                  gsap.to(card, { 
                    scale: 1.05, 
                    boxShadow: "0 30px 80px rgba(102,126,234,0.25)", 
                    duration: 0.3, 
                    ease: "power2.out" 
                  });
                }
              }}
              onMouseLeave={() => {
                const card = cardsRef.current[index];
                if (card && index === currentIndex && !isAnimating && !isMobile) {
                  gsap.to(card, { 
                    scale: 1, 
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)", 
                    duration: 0.3, 
                    ease: "power2.out" 
                  });
                }
              }}
            >
              <div className={`flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl md:rounded-3xl shadow-lg ${
                isMobile 
                  ? 'w-16 h-16 text-3xl' 
                  : 'w-20 sm:w-24 md:w-28 lg:w-[120px] h-20 sm:h-24 md:h-28 lg:h-[120px] text-4xl sm:text-5xl md:text-6xl'
              }`}>
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-gray-900 mb-2 md:mb-3 lg:mb-5 leading-tight ${
                  isMobile 
                    ? 'text-xl' 
                    : 'text-xl sm:text-2xl md:text-2xl lg:text-3xl'
                }`}>
                  {service.title}
                </h3>
                <p className={`text-gray-600 leading-relaxed ${
                  isMobile 
                    ? 'text-sm' 
                    : 'text-sm sm:text-base md:text-lg'
                }`}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mt-8 md:mt-16">
          <button
            onClick={prevCard}
            disabled={isAnimating}
            className={`bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 ${
              isMobile ? 'w-12 h-12' : 'w-14 h-14 md:w-16 md:h-16'
            }`}
          >
            <svg className={`${isMobile ? 'w-6 h-6' : 'w-7 h-7 md:w-8 md:h-8'}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          
          <div className="flex gap-2 md:gap-3">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                disabled={isAnimating}
                className={`rounded-full transition-all duration-300 disabled:opacity-50 ${
                  isMobile ? 'h-2' : 'h-3'
                } ${
                  index === currentIndex 
                    ? `${isMobile ? 'w-6' : 'w-8 md:w-10'} bg-gradient-to-r from-purple-500 to-blue-500` 
                    : `${isMobile ? 'w-2' : 'w-3'} bg-gray-300 hover:bg-gray-400`
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextCard}
            disabled={isAnimating}
            className={`bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 ${
              isMobile ? 'w-12 h-12' : 'w-14 h-14 md:w-16 md:h-16'
            }`}
          >
            <svg className={`${isMobile ? 'w-6 h-6' : 'w-7 h-7 md:w-8 md:h-8'}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </div>
      </div>

      <style>
        {`
        @keyframes float {
          from {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          to {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }
        `}
      </style>
    </div>
  );
};

export default ServicesCardDeck;
