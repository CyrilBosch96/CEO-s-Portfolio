import Navigation from "@/navigation/Navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface MediaMention {
  source: string;
  headline: string;
  date: string;
  link: string;
  preview?: string;
  logoUrl?: string; // Optional logo image
}

const mediaMentionsData: MediaMention[] = [
  {
    source: "DIGITAL DIGEST",
    headline: "What Makes Techjays AI Products STAND OUT?",
    date: "2024",
    link: "https://digitaldigest.com/techjays-ai-future-philip-clements-samuelraj/",
    preview: "Exploring the innovative AI solutions and technology leadership that sets Techjays apart in the industry.",
    logoUrl: "https://digitaldigest.com/wp-content/uploads/2023/01/digital-digest-logo.png"
  },
  {
    source: "BOLD JOURNEY",
    headline: "Meet Philip Samuelraj",
    date: "2024",
    link: "https://boldjourney.com/meet-philip-samuelraj/",
    preview: "An in-depth profile of Philip Samuelraj's journey in technology and entrepreneurship.",
    logoUrl: "https://boldjourney.com/wp-content/uploads/2023/01/bold-journey-logo.png"
  },
  {
    source: "MEDIUM",
    headline: "Philip Samuelraj's Vision: Empowering People and Innovating Software Services",
    date: "2024",
    link: "https://medium.com/strtupboost/philip-samuelrajs-vision-empowering-people-and-innovating-software-services-593cab150352",
    preview: "A comprehensive look at Philip Samuelraj's vision for empowering people through innovative software services.",
    logoUrl: "https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
  },
  {
    source: "TOP FIRMS",
    headline: "Founder of Techjays",
    date: "2024",
    link: "https://topfirms.co/interview/founder-of-techjays",
    preview: "An exclusive interview with the founder of Techjays discussing innovation and leadership in technology.",
    logoUrl: "https://topfirms.co/wp-content/uploads/2023/01/topfirms-logo.png"
  }
];

const MediaMentions = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Clean, professional hero animation
      gsap.fromTo(".hero-title", 
        { 
          y: 30, 
          opacity: 0
        },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.8, 
          ease: "power2.out" 
        }
      );
      
      gsap.fromTo(".hero-subtitle", 
        { 
          y: 20, 
          opacity: 0
        },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.8, 
          delay: 0.2, 
          ease: "power2.out" 
        }
      );

      // Subtle card entrance animation
      gsap.fromTo(cardsRef.current, 
        { 
          y: 40, 
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".media-grid",
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Professional hover effects
      cardsRef.current.forEach((card) => {
        if (card) {
          const hoverTl = gsap.timeline({ paused: true });
          
          hoverTl.to(card, {
            y: -8,
            scale: 1.01,
            duration: 0.3,
            ease: "power2.out"
          });

          card.addEventListener("mouseenter", () => hoverTl.play());
          card.addEventListener("mouseleave", () => hoverTl.reverse());
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-blue-950 relative overflow-hidden">
      <Navigation />
      
      {/* Clean Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="hero-title text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Media <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Mentions</span>
          </h1>
          <p className="hero-subtitle text-lg md:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Recent coverage and interviews featuring Philip Samuelraj and Techjays
          </p>
        </div>
      </div>

      {/* Media Grid */}
      <div className="relative z-10 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="media-grid grid grid-cols-1 lg:grid-cols-2 gap-10">
          {mediaMentionsData.map((mention, idx) => (
            <div
              key={mention.link}
              ref={el => (cardsRef.current[idx] = el)}
                className="group relative"
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Compact Professional Card */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/15 hover:shadow-lg">
                  
                  {/* Source Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-blue-300 font-semibold text-xs uppercase tracking-wide">
                        {mention.source}
                      </span>
                    </div>
                    <span className="text-blue-400/80 text-xs font-medium">
                      {mention.date}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-tight">
                    {mention.headline}
                  </h3>

                  {/* Preview */}
                  <p className="text-blue-200/80 text-sm leading-relaxed mb-6">
                    {mention.preview}
                  </p>

                  {/* Read More Button */}
                  <a
                    href={mention.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 text-sm"
                  >
                    <span>Read Article</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
            </div>
        </div>
      </div>

    </div>
  );
};

export default MediaMentions;
