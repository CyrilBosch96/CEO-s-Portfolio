import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import WorldAnimation from "@/components/WorldAnimation";
import ServicesCardDeck from "@/components/ServicesCardDeck";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Target, Globe, Users, UsersRound, Cloud, Award, Briefcase, Lightbulb, HandHeart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TechjaysOverview = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  const companyDetails = [
    {
      title: "Founded",
      content: "2020, Menlo Park, California",
      icon: Building2
    }, {
      title: "Mission",
      content: "Build the world's best AI products, apps, and solutions",
      icon: Target
    }, {
      title: "Global Reach",
      content: "Delivered 150+ projects across 7 countries",
      icon: Globe
    }, {
      title: "Client Trust",
      content: "65+ satisfied clients served across 15+ industries",
      icon: HandHeart
    }, {
      title: "Team Strength",
      content: "170+ skilled professionals",
      icon: UsersRound
    }, {
      title: "Strategic Partnerships",
      content: "Google Cloud, AWS, IBM",
      icon: Cloud,
      isPartnership: true
    }, {
      title: "Certifications",
      content: "ISO 27001, ISO 9001",
      icon: Award
    }, {
      title: "Industry Coverage",
      content: "Deep domain knowledge across healthcare, finance, retail, logistics, and more",
      icon: Briefcase
    }, {
      title: "Value Proposition",
      content: "Combining cutting-edge technology with industry insight to deliver real business impact",
      icon: Lightbulb
    }, {
      title: "Client Approach",
      content: "Agile, transparent, and centered on long-term success",
      icon: Users
    }
  ];

  // Duplicate cards for seamless marquee effect
  const duplicatedCards = [...companyDetails, ...companyDetails];

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll('.company-card');
    gsap.fromTo(cards, {
      x: 100,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cardsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const PartnershipIcons = () => (
    <div className="flex gap-3 mt-2">
      {/* Google Cloud */}
      <div className="w-8 h-8 bg-white rounded p-1.5 shadow-sm">
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="#4285F4" d="M12.5 8.5l3 3v5.5c0 .8-.7 1.5-1.5 1.5H6c-.8 0-1.5-.7-1.5-1.5V9c0-.8.7-1.5 1.5-1.5h6.5z" />
          <path fill="#34A853" d="M20 12.5l-3-3H12.5l3 3v4.5h3c.8 0 1.5-.7 1.5-1.5v-3z" />
          <path fill="#FBBC04" d="M4.5 12.5v-3h6l-3-3H6c-.8 0-1.5.7-1.5 1.5v4.5z" />
          <path fill="#EA4335" d="M12.5 6.5v2h3l3-3V4c0-.8-.7-1.5-1.5-1.5h-4.5z" />
        </svg>
      </div>
      
      {/* AWS */}
      <div className="w-8 h-8 bg-white rounded p-1.5 shadow-sm">
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="#FF9900" d="M6.5 14.5c0 .5.4 1 1 1h9c.6 0 1-.5 1-1s-.4-1-1-1h-9c-.6 0-1 .5-1 1zm11.5-2.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5-1.5.7-1.5 1.5.7 1.5 1.5 1.5zm-12 0c.8 0 1.5-.7 1.5-1.5S6.8 9 6 9s-1.5.7-1.5 1.5.7 1.5 1.5 1.5zm6-6c2.8 0 5.1 2.3 5.1 5.1 0 .6-.1 1.2-.3 1.7l1.8 1.8c.6-1.1.9-2.3.9-3.5 0-4.1-3.4-7.5-7.5-7.5S4 7.5 4 11.6c0 1.2.3 2.4.9 3.5l1.8-1.8c-.2-.5-.3-1.1-.3-1.7C6.4 9.8 8.7 7.5 11.5 7.5z" />
        </svg>
      </div>
      
      {/* IBM */}
      <div className="w-8 h-8 bg-white rounded p-1.5 shadow-sm">
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="#1261FE" d="M0 9h4v1H0V9zm0 2h4v1H0v-1zm0 2h4v1H0v-1zm5-4h6v1H5V9zm0 2h6v1H5v-1zm0 2h6v1H5v-1zm7-4h6v1h-6V9zm0 2h6v1h-6v-1zm0 2h6v1h-6v-1zm7-4h5v1h-5V9zm0 2h5v1h-5v-1zm0 2h5v1h-5v-1z" />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden" style={{
      background: `
        radial-gradient(ellipse at 30% 20%, rgba(147, 51, 234, 0.08) 0%, transparent 40%),
        radial-gradient(ellipse at 70% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
        radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.04) 0%, transparent 60%)
      `
    }}>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
      
      <Navigation />
      
      <main className="pt-16">
        <div className="text-center py-8 px-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            Techjays Overview
          </h1>
        </div>
        
        <div className="flex-shrink-0" style={{ height: '60vh' }}>
          <WorldAnimation />
        </div>

        <div className="w-full py-8 px-6">
          <div className="marquee-container overflow-hidden relative">
            <div 
              ref={cardsRef} 
              className="marquee-content flex gap-6 animate-marquee"
            >
              {duplicatedCards.map((detail, index) => {
                const IconComponent = detail.icon;
                return (
                  <Card 
                    key={`${detail.title}-${index}`} 
                    className="company-card flex-shrink-0 w-80 h-64 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow border-0" 
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                          <IconComponent size={18} />
                        </div>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {detail.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col">
                      <p className="text-gray-600 leading-relaxed mb-3 text-sm flex-1">
                        {detail.content}
                      </p>
                      {detail.isPartnership && <PartnershipIcons />}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <ServicesCardDeck />
      </main>
    </div>
  );
};

export default TechjaysOverview;
