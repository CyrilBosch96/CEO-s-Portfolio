import Navigation from "@/components/Navigation";
import { useEffect, useRef } from "react";
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

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Set up skew animation
    let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"),
        clamp = gsap.utils.clamp(-20, 20);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0, 
            duration: 0.8, 
            ease: "power3", 
            overwrite: true, 
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }
    });

    // Set transform origin for skew elements
    gsap.set(".skewElem", { transformOrigin: "right center", force3D: true });

    // Original card animation
    if (!cardsRef.current) return;
    gsap.set(cardsRef.current, { opacity: 0, y: 40 });
    gsap.to(cardsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cardsRef.current[0]?.parentElement,
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  return (
    <>
      <style>
        {`
          .skewElem {
            transition: transform 0.3s ease;
          }
          .skewElem:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
          
          .animated-gradient {
            background: linear-gradient(-45deg, #ffffff, #e0e7ff, #c7d2fe, #a5b4fc, #818cf8, #6366f1, #4f46e5, #4338ca);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
          }
          
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          
          .gradient-overlay {
            background: radial-gradient(ellipse at 30% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                        radial-gradient(ellipse at 70% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 60%);
          }
        `}
      </style>
      <div className="min-h-screen animated-gradient gradient-overlay">
        <Navigation />
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 drop-shadow-sm">
            Media Mentions
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto drop-shadow-sm">
            Recent coverage and interviews featuring Philip Samuelraj and Techjays
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mediaMentionsData.map((mention, idx) => (
            <div
              key={mention.link}
              ref={el => (cardsRef.current[idx] = el)}
              className="skewElem bg-white/90 backdrop-blur-sm shadow-lg rounded-xl p-6 flex flex-col h-full border border-white/20"
            >
              {/* Removed logo/initials section */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">{mention.headline}</h3>
                <p className="text-lg text-gray-600 mb-6 flex-1">{mention.preview}</p>
                <a
                  href={mention.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block px-8 py-3 rounded bg-gray-400 text-white font-semibold text-base hover:bg-gray-700 transition-colors"
                >
                  READ AT {mention.source}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default MediaMentions;
