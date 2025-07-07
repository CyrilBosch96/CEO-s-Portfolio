import Navigation from "@/components/Navigation";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ForwardedRef, forwardRef } from 'react';

interface MediaMention {
  source: string;
  headline: string;
  date: string;
  link: string;
  preview?: string;
}

const mediaMentionsData: MediaMention[] = [
  {
    source: "YOUTUBE",
    headline: "Techjays AI: Standing Out in 2024",
    date: "DECEMBER 2024",
    link: "https://www.youtube.com/watch?v=dlD9yiJs070",
    preview: "An in-depth look at how Techjays is revolutionizing the AI industry with innovative solutions and cutting-edge technology."
  },
  {
    source: "DIGITAL DIGEST",
    headline: "Philip Clements Samuelraj on AI's Future",
    date: "APRIL 2025",
    link: "https://digitaldigest.com/techjays-ai-future-philip-clements-samuelraj/",
    preview: "Philip Samuelraj shares his insights on the future of AI and how Techjays is positioning itself at the forefront of technological innovation."
  },
  {
    source: "BOLD JOURNEY",
    headline: "Philip Samuelraj: Building Techjays",
    date: "FEBRUARY 2025",
    link: "https://boldjourney.com/meet-philip-samuelraj/",
    preview: "The inspiring journey of Philip Samuelraj and his vision for building Techjays into a global technology leader."
  },
  {
    source: "MEDIUM",
    headline: "Philip Samuelraj's Vision: Empowering People and Innovating Software Services",
    date: "NOVEMBER 2024",
    link: "https://medium.com/strtupboost/philip-samuelrajs-vision-empowering-people-and-innovating-software-services-593cab150352",
    preview: "Exploring Philip Samuelraj's vision for empowering people through innovative software services and technological advancement."
  },
  {
    source: "TOPFIRMS.CO",
    headline: "Philip Samuelraj on Techjays' Mission",
    date: "OCTOBER 2024",
    link: "https://topfirms.co/interview/founder-of-techjays",
    preview: "An exclusive interview with Philip Samuelraj discussing Techjays' mission and its impact on the technology industry."
  }
];

const PreviewCard = forwardRef<HTMLDivElement, { mention: MediaMention }>(({ mention }, ref) => {
  return (
    <div 
      ref={ref}
      className="fixed bg-white p-4 sm:p-8 rounded-2xl shadow-xl pointer-events-none opacity-0"
      style={{ 
        width: '350px',
        height: '220px',
        zIndex: 1000,
        transform: 'translate(10px, 10px)'
      }}
    >
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">{mention.headline}</h3>
      <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">{mention.preview}</p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-gray-500">
        <span>{mention.source}</span>
        <span>{mention.date}</span>
      </div>
    </div>
  );
});

PreviewCard.displayName = 'PreviewCard';

const MediaMentionCard = forwardRef<HTMLDivElement, { mention: MediaMention }>(({ mention }, ref) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open(mention.link, '_blank');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (previewRef.current && isHovered) {
      const x = e.clientX;
      const y = e.clientY;

      gsap.to(previewRef.current, {
        left: x,
        top: y,
        duration: 0.1,
        ease: "power2.out"
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (previewRef.current) {
      gsap.fromTo(previewRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 20
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.7)"
        }
      );
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (previewRef.current && isHovered) {
        const x = e.clientX;
        const y = e.clientY;

        gsap.to(previewRef.current, {
          left: x,
          top: y,
          duration: 0.1,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [isHovered]);

  return (
    <div 
      ref={cardRef}
      className="relative w-full h-full flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      <div 
        ref={ref} 
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col items-center justify-center p-8 md:p-16 bg-white shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
        style={{
          width: '95%',
          height: '85vh',
          maxWidth: '900px',
          maxHeight: '700px',
          borderRadius: '80px'
        }}
      >
        <p className="text-base md:text-xl text-gray-500 uppercase tracking-widest mb-4 md:mb-8">{mention.source}</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 text-center leading-tight mb-6 md:mb-10">{mention.headline}</h2>
        <p className="text-base md:text-2xl text-gray-500 uppercase tracking-wide">{mention.date}</p>
      </div>
      <PreviewCard ref={previewRef} mention={mention} />
    </div>
  );
});

MediaMentionCard.displayName = 'MediaMentionCard';

const NewspaperBackground = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!bgRef.current) return;
    gsap.to(bgRef.current, {
      backgroundPosition: '400px 200px',
      duration: 20,
      repeat: -1,
      ease: 'linear',
    });
  }, []);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, #e5e7eb 0px, #e5e7eb 2px, transparent 2px, transparent 24px), repeating-linear-gradient(90deg, #e5e7eb 0px, #e5e7eb 2px, transparent 2px, transparent 24px), repeating-linear-gradient(0deg, #f3f4f6 0px, #f3f4f6 1px, transparent 1px, transparent 8px)`,
        backgroundSize: '40px 24px, 40px 24px, 8px 8px',
        backgroundPosition: '0px 0px',
        opacity: 0.5,
      }}
    />
  );
};

const MediaMentions = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (!backgroundRef.current || !cardRef.current || !prevButtonRef.current || !nextButtonRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1 }
    });

    // Initial state (hidden)
    gsap.set([cardRef.current, prevButtonRef.current, nextButtonRef.current], {
      opacity: 0,
      y: 30
    });

    // Intro animation
    tl.to(cardRef.current, { opacity: 1, y: 0 }, "+=0.5")
      .to(prevButtonRef.current, { opacity: 1, y: 0 }, "-=0.8")
      .to(nextButtonRef.current, { opacity: 1, y: 0 }, "<0.1");

    // Background animation
    gsap.to(backgroundRef.current, {
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
      duration: 2,
      ease: "power2.inOut"
    });

    return () => {
      // Cleanup animations if needed
    };
  }, [currentIndex]);

  const nextCard = () => {
    if (isFlipping) return;
    setIsFlipping(true);

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotationY: 90,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaMentionsData.length);
          gsap.set(cardRef.current, { rotationY: -90 });
          gsap.to(cardRef.current, {
            rotationY: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => setIsFlipping(false)
          });
        }
      });
    }
  };

  const prevCard = () => {
    if (isFlipping) return;
    setIsFlipping(true);

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotationY: -90,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? mediaMentionsData.length - 1 : prevIndex - 1
          );
          gsap.set(cardRef.current, { rotationY: 90 });
          gsap.to(cardRef.current, {
            rotationY: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => setIsFlipping(false)
          });
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navigation />
      <NewspaperBackground />
      <div 
        ref={backgroundRef}
        className="fixed inset-0 bg-gradient-to-br from-blue-50 to-blue-100 transition-colors duration-1000 z-0"
      />
      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-16">
        <div className="flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[80vh]">
          <div className="relative perspective-1000 w-full flex justify-center items-center">
            <MediaMentionCard 
              ref={cardRef}
              mention={mediaMentionsData[currentIndex]} 
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-8">
            <button
              ref={prevButtonRef}
              onClick={prevCard}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              Previous
            </button>
            <button
              ref={nextButtonRef}
              onClick={nextCard}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaMentions;
