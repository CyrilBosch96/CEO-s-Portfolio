import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TimelineWheel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".timeline-section",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: ".timeline-container",
        onUpdate: self => {
          updateTimelineState(self.progress);
        }
      }
    });

    function updateTimelineState(progress: number) {
      const markers = document.querySelectorAll('.timeline-marker');
      const panels = document.querySelectorAll('.content-panel');
      const yearDisplay = document.getElementById('yearDisplay') as HTMLElement;
      const wheelTrack = document.querySelector('.wheel-track') as HTMLElement;
      const wheelProgress = document.querySelector('.wheel-progress') as HTMLElement;
      const wheelGlow = document.querySelector('.wheel-glow') as HTMLElement;
      
      let currentYearIndex = Math.floor(progress * 10);
      if (currentYearIndex >= 10) currentYearIndex = 9;
      
      // DRAMATIC SEMI-CIRCLE ANIMATIONS
      if ((window as unknown as { lastActiveYear?: number }).lastActiveYear !== currentYearIndex) {
        
        // 1. Semi-circle SCALE PULSE
        gsap.fromTo([wheelTrack, wheelProgress], 
          { scale: 1 },
          { 
            scale: 1.2,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              gsap.to([wheelTrack, wheelProgress], {
                scale: 1,
                duration: 0.6,
                ease: "elastic.out(1, 0.4)"
              });
            }
          }
        );
        
        // 2. GLOW BURST
        gsap.fromTo(wheelGlow, 
          { scale: 1, opacity: 0.6 },
          { 
            scale: 1.4,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              gsap.to(wheelGlow, {
                scale: 1,
                opacity: 0.6,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          }
        );
        
        // 3. RAINBOW COLORS for semi-circle
        const colors = [
          'rgba(239, 68, 68, 0.8)',   // Red - 2015
          'rgba(245, 158, 11, 0.8)',  // Orange - 2016
          'rgba(251, 191, 36, 0.8)',  // Yellow - 2017
          'rgba(34, 197, 94, 0.8)',   // Green - 2018
          'rgba(20, 184, 166, 0.8)',  // Teal - 2019
          'rgba(59, 130, 246, 0.8)',  // Blue - 2020
          'rgba(99, 102, 241, 0.8)',  // Indigo - 2021
          'rgba(168, 85, 247, 0.8)',  // Purple - 2022
          'rgba(236, 72, 153, 0.8)',  // Pink - 2023
          'rgba(244, 114, 182, 0.8)'  // Rose - 2024
        ];
        
        gsap.to(wheelTrack, {
          filter: `drop-shadow(0 0 80px ${colors[currentYearIndex]}) brightness(1.5)`,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(wheelTrack, {
              filter: `drop-shadow(0 0 40px rgba(99, 102, 241, 0.1)) brightness(1)`,
              duration: 1.2,
              ease: "power2.out"
            });
          }
        });
        
        (window as unknown as { lastActiveYear?: number }).lastActiveYear = currentYearIndex;
        setActiveIndex(currentYearIndex);
      }
      
      // Reset all markers
      markers.forEach((marker, index) => {
        marker.classList.remove('active', 'completed');
        if (index !== currentYearIndex) {
          gsap.to(marker, {
            scale: 0.7,
            opacity: 0.3,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
      
      // Mark completed years
      for (let i = 0; i < currentYearIndex; i++) {
        markers[i].classList.add('completed');
        gsap.to(markers[i], {
          scale: 0.9,
          opacity: 0.8,
          duration: 0.5,
          ease: "elastic.out(1, 0.8)"
        });
      }
      
      // Active year
      if (currentYearIndex < 10) {
        markers[currentYearIndex].classList.add('active');
        
        // Update year display
        if (yearDisplay) {
          yearDisplay.textContent = years[currentYearIndex].toString();
          yearDisplay.classList.add('active');
        }
        
        gsap.fromTo(markers[currentYearIndex], 
          { scale: 0.3, opacity: 0 },
          { 
            scale: 1.8,
            opacity: 1, 
            duration: 0.9,
            ease: "elastic.out(1, 0.5)"
          }
        );
      }
      
      // Show content panels for specific years
      panels.forEach(panel => panel.classList.remove('active'));
      
      if (currentYearIndex >= 0 && currentYearIndex < 10) {
        const panelClass = `panel-${years[currentYearIndex]}`;
        const panel = document.querySelector(`.${panelClass}`);
        console.log(`Looking for panel: ${panelClass}, currentYearIndex: ${currentYearIndex}, year: ${years[currentYearIndex]}`);
        if (panel) {
          panel.classList.add('active');
          console.log(`✅ Activated panel for year ${years[currentYearIndex]}`);
        } else {
          console.warn(`❌ Panel not found for year ${years[currentYearIndex]}`);
          // List all available panels for debugging
          const allPanels = document.querySelectorAll('.content-panel');
          console.log('Available panels:', Array.from(allPanels).map(p => p.className));
        }
      }
    }

    // Semi-circle rotation animation
    tl.to(".wheel-track, .timeline-marker", {
      rotation: -180, // Half rotation for semi-circle
      ease: "none",
      transformOrigin: "center center"
    })
    
    // Progress bar animation
    .fromTo(".wheel-progress", {
      clipPath: "polygon(50% 50%, 50% 0%, 50% 0%, 50% 50%)"
    }, {
      clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 50% 50%)",
      rotation: -180,
      ease: "none"
    }, 0);

    // Hide scroll indicator after scrolling starts
    ScrollTrigger.create({
      trigger: ".timeline-section",
      start: "top top",
      onEnter: () => {
        gsap.to(".scroll-indicator", {
          opacity: 0,
          duration: 0.5
        });
      },
      onLeaveBack: () => {
        gsap.to(".scroll-indicator", {
          opacity: 1,
          duration: 0.5
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="timeline-section">
      <div className="timeline-container">
        {/* Left side - Semi-circle timeline */}
        <div className="timeline-wheel">
          <div className="semi-circle-container">
            {/* Outer glow effect */}
            <div className="wheel-glow"></div>
            
            {/* Wheel tracks */}
            <div className="wheel-track"></div>
            <div className="wheel-progress"></div>
            
            {/* Timeline markers */}
            <div className="timeline-marker marker-2015"></div>
            <div className="timeline-marker marker-2016"></div>
            <div className="timeline-marker marker-2017"></div>
            <div className="timeline-marker marker-2018"></div>
            <div className="timeline-marker marker-2019"></div>
            <div className="timeline-marker marker-2020"></div>
            <div className="timeline-marker marker-2021"></div>
            <div className="timeline-marker marker-2022"></div>
            <div className="timeline-marker marker-2023"></div>
            <div className="timeline-marker marker-2024"></div>
            
            {/* Year display */}
            <div className="year-display" id="yearDisplay">2015</div>
          </div>
        </div>

        {/* Right side - Content area */}
        <div className="content-area">
          {/* Content panels for different years */}
          <div className="content-panel panel-2015">
            <div className="content-image">
              <img src="src/pages/know/1.png" alt="2015 Milestone" onLoad={() => console.log('Image 1 loaded')} onError={(e) => console.error('Failed to load image 1:', e)} />
            </div>
            <div className="content-text">
              <div className="content-title">Early Beginnings</div>
              <div className="content-description">
                The foundation of my journey in technology and cybersecurity began with innovative approaches to digital security challenges.
              </div>
            </div>
          </div>

          <div className="content-panel panel-2016">
            <div className="content-image">
              <img src="src/pages/know/2.png" alt="2016 Milestone" onLoad={() => console.log('Image 2 loaded')} onError={(e) => console.error('Failed to load image 2:', e)} />
            </div>
            <div className="content-text">
              <div className="content-title">Innovation Phase</div>
              <div className="content-description">
                Pioneering new methodologies in cybersecurity and establishing key partnerships in the technology sector.
              </div>
            </div>
          </div>

          <div className="content-panel panel-2017">
            <div className="content-image">
              <img src="src/pages/know/3.png" alt="2017 Milestone" onLoad={() => console.log('Image 3 loaded')} onError={(e) => console.error('Failed to load image 3:', e)} />
            </div>
            <div className="content-text">
              <div className="content-title">Growth & Expansion</div>
              <div className="content-description">
                Expanding operations and developing cutting-edge solutions for enterprise security challenges.
              </div>
            </div>
          </div>

          <div className="content-panel panel-2018">
            <div className="content-image">
              <img src="src/pages/know/4.png" alt="2018 Milestone" onLoad={() => console.log('Image 4 loaded')} onError={(e) => console.error('Failed to load image 4:', e)} />
            </div>
            <div className="content-text">
              <div className="content-title">Strategic Partnerships</div>
              <div className="content-description">
                Forming strategic alliances and partnerships to enhance our cybersecurity capabilities and market reach.
              </div>
            </div>
          </div>

          <div className="content-panel panel-2019">
            <div className="content-image">
              <img src="src/pages/know/5.png" alt="2019 Milestone" onLoad={() => console.log('Image 5 loaded')} onError={(e) => console.error('Failed to load image 5:', e)} />
            </div>
            <div className="content-text">
              <div className="content-title">Techjays Foundation</div>
              <div className="content-description">
                Founded Techjays, a leading technology consulting company focused on innovative cybersecurity solutions.
              </div>
            </div>
          </div>

          <div className="content-panel panel-2020">
            <div className="content-image">
              <img src="src/pages/know/6.png" alt="2020 Milestone" onLoad={() => console.log('Image 6 loaded')} onError={(e) => console.error('Failed to load image 6:', e)} />
            </div>
            <div className="content-text">
              <div className="content-title">Digital Transformation</div>
              <div className="content-description">
                Leading digital transformation initiatives and adapting to the evolving cybersecurity landscape.
              </div>
            </div>
          </div>

          <div className="content-panel panel-2021">
            <div className="content-image">
              <img src="src/pages/know/7.png" alt="2021 Milestone" onLoad={() => console.log('Image 7 loaded')} onError={(e) => console.error('Failed to load image 7:', e)} />
            </div>
            <div className="content-text">
              <div className="content-title">Seela Launch</div>
              <div className="content-description">
                Launched Seela, the pioneering online platform that trains teams in technical and cybersecurity skills.
              </div>
            </div>
          </div>

          <div className="content-panel panel-2022">
            <div className="content-image">
              <img src="src/pages/know/8.png" alt="2022 Milestone" onLoad={() => console.log('Image 8 loaded')} onError={(e) => console.error('Failed to load image 8:', e)} />
            </div>
            <div className="content-text">
              <div className="content-title">Global Recognition</div>
              <div className="content-description">
                Achieving global recognition for innovative cybersecurity solutions and thought leadership in the industry.
              </div>
            </div>
          </div>

          <div className="content-panel panel-2023">
            <div className="content-image">
              <img src="src/pages/know/9.png" alt="2023 Milestone" onLoad={() => console.log('Image 9 loaded')} onError={(e) => console.error('Failed to load image 9:', e)} />
            </div>
            <div className="content-text">
              <div className="content-title">NEVERHACK Rebranding</div>
              <div className="content-description">
                In May 2023, the recently rebranded group NEVERHACK unified its strategy and reaffirmed its commitment to clients by securing a substantial investment of 100 million euros to support its external growth initiatives.
              </div>
            </div>
          </div>

          <div className="content-panel panel-2024">
            <div className="content-image">
              <img src="src/pages/know/10.png" alt="2024 Milestone" onLoad={() => console.log('Image 10 loaded')} onError={(e) => console.error('Failed to load image 10:', e)} />
            </div>
            <div className="content-text">
              <div className="content-title">Cybersecurity Integration</div>
              <div className="content-description">
                Cybers, a renowned cybersecurity company based in Estonia, joins NEVERHACK, enhancing the group's expertise with its SOC and expanding its operations in Northern Europe.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span>Scroll to explore timeline</span>
        <div className="scroll-line"></div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .timeline-section {
          height: 600vh; /* Extended from 400vh to 600vh for more scrolling */
          position: relative;
          background: linear-gradient(135deg, #ffffff 0%, #f8faff 25%, #f0f4ff 50%, #e8f0ff 75%, #e0ecff 100%);
          color: #1f2937;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow-x: hidden;
        }

        .timeline-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
        }

        /* Left side - Semi-circle timeline */
        .timeline-wheel {
          position: relative;
          width: 40vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-right: 40px;
          z-index: 20; /* Higher z-index to stay on top */
        }

        .semi-circle-container {
          position: relative;
          width: 450px;
          height: 450px;
          overflow: visible;
        }

        /* Outer glow ring - half circle */
        .wheel-glow {
          position: absolute;
          width: 120%;
          height: 120%;
          top: -10%;
          left: -10%;
          border-radius: 50%;
          background: conic-gradient(from 0deg, 
              rgba(139, 92, 246, 0.1) 0deg,
              rgba(168, 85, 247, 0.15) 90deg,
              rgba(236, 72, 153, 0.1) 180deg,
              rgba(59, 130, 246, 0.15) 270deg,
              rgba(139, 92, 246, 0.1) 360deg);
          animation: rotate 20s linear infinite;
          opacity: 0.6;
          clip-path: polygon(50% 50%, 100% 0%, 100% 100%);
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Main semi-circular timeline track */
        .wheel-track {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 4px solid transparent;
          border-radius: 50%;
          background: linear-gradient(#8b5cf6, #a855f7) padding-box,
                      conic-gradient(from 0deg, 
                          rgba(139, 92, 246, 0.8) 0deg,
                          rgba(168, 85, 247, 0.6) 90deg,
                          rgba(236, 72, 153, 0.8) 180deg,
                          rgba(59, 130, 246, 0.6) 270deg,
                          rgba(139, 92, 246, 0.8) 360deg) border-box;
          transform-origin: center center;
          box-shadow: 
              inset 0 0 30px rgba(139, 92, 246, 0.2),
              0 0 40px rgba(139, 92, 246, 0.1);
          clip-path: polygon(50% 50%, 100% 0%, 100% 100%);
        }

        .wheel-progress {
          position: absolute;
          width: 104%;
          height: 104%;
          top: -2%;
          left: -2%;
          border: 6px solid transparent;
          border-radius: 50%;
          background: linear-gradient(#8b5cf6, #a855f7) padding-box,
                      linear-gradient(90deg, 
                          #8b5cf6 0%, 
                          #a855f7 25%, 
                          #ec4899 50%, 
                          #3b82f6 75%, 
                          #8b5cf6 100%) border-box;
          transform: rotate(-90deg);
          transform-origin: center center;
          filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.6));
          clip-path: polygon(50% 50%, 50% 0%, 50% 0%, 50% 50%);
        }

        /* Timeline markers positioned on the right side of semi-circle */
        .timeline-marker {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
          border: 3px solid #4b5563;
          transform: translate(-50%, -50%);
          opacity: 0.7;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
              0 4px 15px rgba(0, 0, 0, 0.3),
              inset 0 1px 2px rgba(255, 255, 255, 0.1);
        }

        .timeline-marker.active {
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          border: 4px solid #c084fc;
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.6);
          box-shadow: 
              0 0 40px rgba(139, 92, 246, 1),
              0 0 80px rgba(139, 92, 246, 0.6),
              0 0 120px rgba(139, 92, 246, 0.3),
              inset 0 2px 4px rgba(255, 255, 255, 0.4);
          animation: superPulse 1.5s ease-in-out infinite;
          z-index: 10;
        }

        .timeline-marker.completed {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border: 3px solid #34d399;
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 
              0 0 20px rgba(16, 185, 129, 0.6),
              inset 0 1px 2px rgba(255, 255, 255, 0.2);
        }

        @keyframes superPulse {
          0%, 100% { 
            box-shadow: 
                0 0 40px rgba(139, 92, 246, 1),
                0 0 80px rgba(139, 92, 246, 0.6),
                0 0 120px rgba(139, 92, 246, 0.3),
                inset 0 2px 4px rgba(255, 255, 255, 0.4);
            transform: translate(-50%, -50%) scale(1.6);
          }
          50% { 
            box-shadow: 
                0 0 60px rgba(139, 92, 246, 1),
                0 0 120px rgba(139, 92, 246, 0.8),
                0 0 180px rgba(139, 92, 246, 0.5),
                inset 0 2px 4px rgba(255, 255, 255, 0.4);
            transform: translate(-50%, -50%) scale(1.8);
          }
        }

        /* Position markers along the right arc of the semi-circle */
        .marker-2015 { top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(0deg) translateY(-290px); }
        .marker-2016 { top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(20deg) translateY(-290px); }
        .marker-2017 { top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(40deg) translateY(-290px); }
        .marker-2018 { top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(60deg) translateY(-290px); }
        .marker-2019 { top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(80deg) translateY(-290px); }
        .marker-2020 { top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(100deg) translateY(-290px); }
        .marker-2021 { top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(120deg) translateY(-290px); }
        .marker-2022 { top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(140deg) translateY(-290px); }
        .marker-2023 { top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(160deg) translateY(-290px); }
        .marker-2024 { top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(180deg) translateY(-290px); }

        /* Right side - Content area */
        .content-area {
          width: 55vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 20px;
          padding-right: 20px;
          position: relative;
          z-index: 10; /* Lower z-index to appear behind the wheel */
        }

        .content-panel {
          opacity: 0;
          transform: translateX(50px);
          max-width: 700px;
          width: 100%;
          transition: all 0.5s ease;
          display: flex;
          align-items: center;
          gap: 30px;
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 5; /* Even lower z-index for content panels */
        }

        .content-panel.active {
          opacity: 1;
          transform: translateX(0);
          position: relative;
          pointer-events: auto;
        }

        .content-image {
          flex: 0 0 300px;
          height: 300px;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
          box-shadow: 0 12px 35px rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.1);
          backdrop-filter: blur(10px); /* Add blur effect for behind effect */
        }

        .content-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          filter: brightness(0.9) contrast(1.1); /* Slightly dimmed for behind effect */
        }

        .content-image:hover img {
          transform: scale(1.05);
          filter: brightness(1) contrast(1); /* Normal brightness on hover */
        }

        .content-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 300px;
          padding: 20px 0;
          backdrop-filter: blur(5px); /* Add blur effect */
        }

        .content-icon {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 24px;
        }

        .icon-neverhack { background: #6366f1; color: white; }
        .icon-expertline { background: #374151; color: white; border: 2px solid #6b7280; }
        .icon-cybers { background: #dc2626; color: white; }

        .content-title {
          color: #9ca3af;
          font-size: 16px;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 500;
          opacity: 0.8; /* Slightly dimmed for behind effect */
        }

        .content-description {
          color: #374151;
          font-size: 20px;
          line-height: 1.7;
          font-weight: 300;
          opacity: 0.9; /* Slightly dimmed for behind effect */
        }

        /* Year display */
        .year-display {
          position: absolute;
          top: 50%;
          right: -100px;
          transform: translateY(-50%);
          font-size: 48px;
          font-weight: 900;
          color: #9ca3af;
          opacity: 0;
          transition: all 0.5s ease;
          transform-origin: center center;
          z-index: 5;
          white-space: nowrap;
        }

        .year-display.active {
          opacity: 1;
          color: #6b7280;
          text-shadow: 0 0 40px rgba(107, 114, 128, 0.5);
        }

        /* Scroll indicator */
        .scroll-indicator {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          color: #666;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }

        .scroll-line {
          width: 2px;
          height: 30px;
          background: linear-gradient(180deg, transparent, #666, transparent);
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
};

export default TimelineWheel; 