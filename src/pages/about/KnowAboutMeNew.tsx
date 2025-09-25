import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/navigation/Navigation";

gsap.registerPlugin(ScrollTrigger);

const KnowAboutMeNew = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const milestones = [
    {
      year: "2015",
      title: "Early Beginnings",
      description:
        "The foundation of my journey in technology and cybersecurity began with innovative approaches.",
      image: "/src/assets/images/Know/1.png",
    },
    {
      year: "2016",
      title: "Innovation Phase",
      description:
        "Pioneering new methodologies in cybersecurity and establishing key partnerships.",
      image: "/src/assets/images/Know/2.png",
    },
    {
      year: "2017",
      title: "Growth & Expansion",
      description:
        "Expanding operations and developing cutting-edge solutions for enterprise security challenges.",
      image: "/src/assets/images/Know/3.png",
    },
    {
      year: "2018",
      title: "Strategic Partnerships",
      description:
        "Forming strategic alliances and expanding our global footprint in cybersecurity solutions.",
      image: "/src/assets/images/Know/4.png",
    },
    {
      year: "2019",
      title: "Market Leadership",
      description:
        "Achieving market leadership position and launching revolutionary security platforms.",
      image: "/src/assets/images/Know/5.png",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description:
        "Leading digital transformation initiatives and adapting to the new normal of remote security.",
      image: "/src/assets/images/Know/6.png",
    },
    {
      year: "2021",
      title: "Global Expansion",
      description:
        "Expanding operations globally and establishing presence in key international markets.",
      image: "/src/assets/images/Know/7.png",
    },
    {
      year: "2022",
      title: "Innovation Breakthrough",
      description:
        "Achieving breakthrough innovations in AI-driven security solutions and threat detection.",
      image: "/src/assets/images/Know/8.png",
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description:
        "Receiving industry recognition and awards for outstanding contributions to cybersecurity.",
      image: "/src/assets/images/Know/9.png",
    },
    {
      year: "2024",
      title: "Future Vision",
      description:
        "Setting the vision for the future of cybersecurity and preparing for next-generation challenges.",
      image: "/src/assets/images/Know/10.png",
    },
  ];


  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set up the horizontal scroll sections with right-to-left pass behind the image
      milestones.forEach((_, index) => {
        const section = `.story-section-${index}`;
        const content = `${section} .story-content`;

        // Start off-screen to the right
        gsap.set(content, {
          x: () => window.innerWidth * 0.35,
          opacity: 0,
          willChange: "transform, opacity"
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=120%", // keep section pinned while content crosses
            scrub: true,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            onEnter: () => setCurrentIndex(index),
            onEnterBack: () => setCurrentIndex(index),
          },
        });

        // Move across center (behind fixed image) then exit to the left
        tl.to(content, {
          x: 0,
          opacity: 1,
          ease: "none",
          duration: 0.3,
        })
        .to(content, {
          opacity: 0, // Hide text when behind image
          ease: "none",
          duration: 0.2,
        })
        .to(content, {
          opacity: 1, // Show text again when coming out
          ease: "none",
          duration: 0.1,
        })
        .to(content, {
          x: () => -window.innerWidth * 0.35,
          opacity: 0,
          ease: "none",
          duration: 0.3,
        });
      });

      // Image transitions - instant change
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          const imageIndex = Math.floor(progress * milestones.length);
          
          if (imageRef.current && imageIndex < milestones.length) {
            // Instant image change
            imageRef.current.src = milestones[imageIndex].image;
            imageRef.current.alt = milestones[imageIndex].title;
          }
        }
      });

      // Hide timeline elements when grid view is visible
      ScrollTrigger.create({
        trigger: ".grid-view-section",
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          const timelineElements = document.querySelectorAll('.timeline-elements');
          timelineElements.forEach(el => {
            (el as HTMLElement).style.opacity = '0';
            (el as HTMLElement).style.pointerEvents = 'none';
            (el as HTMLElement).style.visibility = 'hidden';
          });
        },
        onLeave: () => {
          const timelineElements = document.querySelectorAll('.timeline-elements');
          timelineElements.forEach(el => {
            (el as HTMLElement).style.opacity = '1';
            (el as HTMLElement).style.pointerEvents = 'auto';
            (el as HTMLElement).style.visibility = 'visible';
          });
        },
        onEnterBack: () => {
          const timelineElements = document.querySelectorAll('.timeline-elements');
          timelineElements.forEach(el => {
            (el as HTMLElement).style.opacity = '0';
            (el as HTMLElement).style.pointerEvents = 'none';
            (el as HTMLElement).style.visibility = 'hidden';
          });
        },
        onLeaveBack: () => {
          const timelineElements = document.querySelectorAll('.timeline-elements');
          timelineElements.forEach(el => {
            (el as HTMLElement).style.opacity = '1';
            (el as HTMLElement).style.pointerEvents = 'auto';
            (el as HTMLElement).style.visibility = 'visible';
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-blue-950 text-white overflow-hidden">
      <style>{`
        /* Hide timeline elements when grid view is visible */
        .grid-view-section:target ~ .timeline-elements,
        .grid-view-section.in-view ~ .timeline-elements {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s ease-in-out;
        }
        
        /* Show timeline elements by default */
        .timeline-elements {
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
        }
      `}</style>
      <div className="fixed top-0 left-0 right-0 z-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <Navigation />
      </div>
      
      {/* Fixed Header - Hidden by default, visible on hover */}
      <div className="fixed top-0 left-0 right-0 z-30 pt-20 pb-8 bg-blue-950/80 opacity-0 hover:opacity-100 transition-opacity duration-300 group">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-sm font-medium text-white/60 tracking-wider uppercase">
            MY STORY
          </h1>
        </div>
      </div>

      {/* Central Fixed Image - Hidden in grid view */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none timeline-elements">
        <div className="relative">
          <img 
            ref={imageRef}
            src={milestones[currentIndex]?.image}
            alt="Story milestone"
            className="w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-2xl shadow-2xl"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
      </div>

      {/* Story Sections - Hidden in grid view */}
      <div className="relative z-10 timeline-elements">
        {milestones.map((milestone, index) => (
          <section 
            key={index}
            className={`story-section-${index} h-screen flex items-center px-8 lg:px-16`}
          >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-8">
              {/* Left side content */}
              {index % 2 === 0 ? (
                <div className="col-span-12 lg:col-span-5 story-content relative z-10">
                  <div className="space-y-6">
                    <div className="text-sm text-blue-400 font-medium">
                      • {milestone.year}
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-light leading-tight">
                      {milestone.title}
                    </h2>
                    <p className="text-lg text-white/70 leading-relaxed max-w-lg">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="col-span-12 lg:col-span-7"></div>
                <div className="col-span-12 lg:col-span-5 story-content relative z-10">
                    <div className="space-y-6">
                      <div className="text-sm text-blue-400 font-medium text-right">
                        • {milestone.year}
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-light leading-tight text-right">
                        {milestone.title}
                      </h2>
                      <p className="text-lg text-white/70 leading-relaxed max-w-lg ml-auto text-right">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Grid View Section */}
      <section className="closing h-screen flex flex-col bg-blue-950 text-white grid-view-section">
        <div className="w-full px-6 py-8">
          <h2 className="text-4xl font-bold text-center mb-8 text-white">
            Our Journey
          </h2>
        </div>
        
        <div className="flex-1 w-full px-6 pb-6">
          <div className="grid grid-cols-3 gap-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {/* 5th Anniversary */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <img 
                src="/src/assets/images/gridview/5th_anniversery.png" 
                alt="5th Anniversary Celebration"
                className="w-full h-32 object-cover rounded-md mb-3"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <h3 className="text-lg font-semibold mb-2 text-white">5th Anniversary Celebration</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Our CEO Philip Clements Samuelraj, engaged in dynamic business meetings and strategic discussions with visionary founders, industry leaders, and valued clients - all united by one mission: build better, move faster.
              </p>
            </div>

            {/* Eiffel Tower */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <img 
                src="/src/assets/images/gridview/philips_image1.jpeg" 
                alt="Techjays @Europe!"
                className="w-full h-32 object-cover rounded-md mb-3"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <h3 className="text-lg font-semibold mb-2 text-white">Techjays @Europe!</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                These conversations deepened our understanding of client needs and reinforced a core belief at Techjays - proximity builds clarity. By being close to our partners, we unlock opportunities to scale their vision with cutting-edge AI-driven solutions. Visit to the Eiffel Tower reminded us about dreaming big. Together, we're accelerating those big dreams through AI innovation.
              </p>
            </div>

            {/* Office Inauguration */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <img 
                src="/src/assets/images/gridview/Techjays_Office_Inauguration.png" 
                alt="Office Inauguration"
                className="w-full h-32 object-cover rounded-md mb-3"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <h3 className="text-lg font-semibold mb-2 text-white">Office Inauguration</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                This picture was taken during the Techjays Office Inauguration at Coimbatore, where our CEO, Philip, stood alongside the Senior Leadership Team. A moment that reflects not just growth in space, but growth in vision, people, and purpose.
              </p>
            </div>

            {/* Business Meetings 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <img 
                src="/src/assets/images/gridview/philips_image2.jpeg" 
                alt="Business Meetings"
                className="w-full h-32 object-cover rounded-md mb-3"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <h3 className="text-lg font-semibold mb-2 text-white">Strategic Partnerships</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Our CEO Philip Clements Samuelraj, engaged in dynamic business meetings and strategic discussions with visionary founders, industry leaders, and valued clients - all united by one mission: build better, move faster.
              </p>
            </div>

            {/* Business Meetings 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <img 
                src="/src/assets/images/gridview/meeting.HEIC" 
                alt="Business Meetings"
                className="w-full h-32 object-cover rounded-md mb-3"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <h3 className="text-lg font-semibold mb-2 text-white">Industry Leadership</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Our CEO Philip Clements Samuelraj, engaged in dynamic business meetings and strategic discussions with visionary founders, industry leaders, and valued clients - all united by one mission: build better, move faster.
              </p>
            </div>

            {/* Future Vision */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <div className="w-full h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md mb-3 flex items-center justify-center">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Future Vision</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Setting the vision for the future of cybersecurity and preparing for next-generation challenges. Together, we're building a safer digital world through innovation and collaboration.
              </p>
            </div>

            {/* Additional Grid Item 7 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <img 
                src="/src/assets/images/gridview/5th_anniversery.png" 
                alt="Team Collaboration"
                className="w-full h-32 object-cover rounded-md mb-3"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <h3 className="text-lg font-semibold mb-2 text-white">Team Collaboration</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Building strong partnerships and collaborative relationships with industry leaders and technology innovators to drive forward our mission.
              </p>
            </div>

            {/* Additional Grid Item 8 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <img 
                src="/src/assets/images/gridview/philips_image1.jpeg" 
                alt="Global Expansion"
                className="w-full h-32 object-cover rounded-md mb-3"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <h3 className="text-lg font-semibold mb-2 text-white">Global Expansion</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Expanding our reach globally while maintaining our core values and commitment to excellence in cybersecurity solutions.
              </p>
            </div>

            {/* Additional Grid Item 9 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <img 
                src="/src/assets/images/gridview/Techjays_Office_Inauguration.png" 
                alt="Innovation Hub"
                className="w-full h-32 object-cover rounded-md mb-3"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <h3 className="text-lg font-semibold mb-2 text-white">Innovation Hub</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Creating an environment where innovation thrives and cutting-edge solutions are developed to address tomorrow's challenges.
              </p>
            </div>

            {/* Additional Grid Item 10 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <img 
                src="/src/assets/images/gridview/meeting.HEIC" 
                alt="Client Success"
                className="w-full h-32 object-cover rounded-md mb-3"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <h3 className="text-lg font-semibold mb-2 text-white">Client Success</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Delivering exceptional results and building long-term partnerships with our valued clients across various industries.
              </p>
            </div>

            {/* Additional Grid Item 11 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <img 
                src="/src/assets/images/gridview/philips_image2.jpeg" 
                alt="Technology Leadership"
                className="w-full h-32 object-cover rounded-md mb-3"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <h3 className="text-lg font-semibold mb-2 text-white">Technology Leadership</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Leading the way in cybersecurity innovation and setting new standards for technology excellence in the industry.
              </p>
            </div>

            {/* Additional Grid Item 12 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <div className="w-full h-32 bg-gradient-to-br from-green-600 to-blue-600 rounded-md mb-3 flex items-center justify-center">
                <span className="text-white text-2xl">🌐</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Global Reach</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Expanding our services globally while maintaining the highest standards of quality and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-blue-950/80 backdrop-blur-sm timeline-elements">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="h-0.5 bg-white/20 w-full mb-4"></div>
            <div 
              className="absolute top-0 left-0 h-0.5 bg-blue-500 transition-all duration-700 ease-out"
              style={{ 
                width: `${((currentIndex + 1) / milestones.length) * 100}%` 
              }}
            ></div>
            
            {/* Timeline points */}
            <div className="flex justify-between">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col items-center transition-all duration-300 cursor-pointer ${
                    index === currentIndex ? 'scale-110' : ''
                  }`}
                  onClick={() => {
                    document.querySelector(`.story-section-${index}`)?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                >
                  {/* Year Label */}
                  <div className="mb-2">
                    <span className={`text-sm transition-colors duration-300 ${
                      index <= currentIndex ? 'text-blue-400 font-medium' : 'text-white/50'
                    }`}>
                      {milestone.year}
                    </span>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    index <= currentIndex 
                      ? 'bg-blue-500 border-blue-500' 
                      : 'bg-transparent border-white/30'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowAboutMeNew;
