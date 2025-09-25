import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Country {
  id: string;
  name: string;
  emoji: string;
  color: string;
  x: number;
  y: number;
}

interface Node {
  element: HTMLDivElement;
  x: number;
  y: number;
  country: Country;
}

interface Connection {
  element: SVGPathElement;
  start: Node;
  end: Node;
}

const WorldAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<SVGPathElement[]>([]);

  const countries = [
    { id: "usa", name: "USA", emoji: "🇺🇸", color: "#3b82f6", x: 0.25, y: 0.3 },
    {
      id: "canada",
      name: "Canada",
      emoji: "🇨🇦",
      color: "#9333ea",
      x: 0.2,
      y: 0.6,
    },
    { id: "uk", name: "UK", emoji: "🇬🇧", color: "#ec4899", x: 0.5, y: 0.2 },
    { id: "uae", name: "UAE", emoji: "🇦🇪", color: "#f59e0b", x: 0.75, y: 0.35 },
    {
      id: "india",
      name: "India",
      emoji: "🇮🇳",
      color: "#10b981",
      x: 0.8,
      y: 0.65,
    },
    {
      id: "bangladesh",
      name: "Bangladesh",
      emoji: "🇧🇩",
      color: "#ef4444",
      x: 0.65,
      y: 0.8,
    },
    {
      id: "australia",
      name: "Australia",
      emoji: "🇦🇺",
      color: "#6366f1",
      x: 0.35,
      y: 0.75,
    },
  ];

  const createNodes = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const ellipseA = rect.width * 0.36;
    const ellipseB = rect.height * 0.28;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const total = countries.length;

    countries.forEach((country, index) => {
      const node = document.createElement("div");
      node.className =
        "absolute w-[100px] h-[100px] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10";
      node.id = country.id;

      const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
      const x = centerX + ellipseA * Math.cos(angle);
      const y = centerY + ellipseB * Math.sin(angle);

      node.style.left = `${x}px`;
      node.style.top = `${y}px`;

      node.innerHTML = `
        <div class="absolute w-full h-full border-2 rounded-full opacity-0" style="border-color: ${country.color}"></div>
        <div class="absolute w-full h-full border-2 rounded-full opacity-0" style="border-color: ${country.color}"></div>
        <div class="absolute w-full h-full border-2 rounded-full opacity-0" style="border-color: ${country.color}"></div>
        <div class="absolute w-[70px] h-[70px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg flex items-center justify-center text-[32px] transition-all duration-300 hover:scale-110">${country.emoji}</div>
        <div class="absolute -bottom-9 left-1/2 transform -translate-x-1/2 font-semibold text-xs uppercase tracking-wider text-gray-600 opacity-0 whitespace-nowrap">${country.name}</div>
      `;

      container.appendChild(node);
      nodesRef.current.push({ element: node, x, y, country });

      // Animate node entrance
      gsap.from(node, {
        scale: 0,
        opacity: 0,
        duration: 1,
        delay: 0.5 + index * 0.1,
        ease: "back.out(1.7)",
      });

      // Animate rings
      const rings = node.querySelectorAll('div[class*="border-2"]');
      rings.forEach((ring: Element, i) => {
        gsap.set(ring, { scale: 1 + i * 0.3 });
        gsap.to(ring, {
          opacity: 0.3 - i * 0.1,
          scale: 1 + i * 0.5,
          duration: 2,
          repeat: -1,
          delay: i * 0.3,
          ease: "power2.out",
        });
      });

      // Show label
      gsap.to(node.querySelector('div[class*="-bottom-9"]'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 1 + index * 0.1,
      });

      // Add interactions
      node.addEventListener("mouseenter", () =>
        createPulseWave(x, y, country.color)
      );
      node.addEventListener("click", () => sendDataBurst(country));
    });
  };

  const createConnections = () => {
    if (!containerRef.current) return;

    const svg = containerRef.current.querySelector("svg");
    if (!svg) return;

    for (let i = 0; i < nodesRef.current.length; i++) {
      for (let j = i + 1; j < nodesRef.current.length; j++) {
        const nodes = nodesRef.current;
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (
          distance <
          (containerRef.current?.getBoundingClientRect().width || 0) * 0.4
        ) {
          const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          const start = nodes[i];
          const end = nodes[j];

          const cp1x = start.x + (end.x - start.x) * 0.25;
          const cp1y = start.y - 50;
          const cp2x = start.x + (end.x - start.x) * 0.75;
          const cp2y = end.y - 50;

          const curve = `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;

          path.setAttribute("d", curve);
          path.setAttribute("stroke", "url(#gradient1)");
          path.setAttribute("stroke-width", "1.5");
          path.setAttribute("fill", "none");
          path.setAttribute("opacity", "0");
          path.setAttribute("filter", "url(#glow)");

          svg.appendChild(path);
          connectionsRef.current.push(path);

          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

          gsap.to(path, {
            opacity: 0.3,
            strokeDashoffset: 0,
            duration: 2,
            delay: 1.5 + (i * nodesRef.current.length + j) * 0.05,
            ease: "power2.inOut",
          });
        }
      }
    }
  };

  const createPulseWave = (x: number, y: number, color: string) => {
    if (!containerRef.current) return;

    const wave = document.createElement("div");
    wave.className =
      "absolute w-[150px] h-[150px] border-2 rounded-full pointer-events-none opacity-0";
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    wave.style.borderColor = color;
    wave.style.transform = "translate(-50%, -50%)";
    containerRef.current.appendChild(wave);

    gsap.to(wave, {
      scale: 2,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      onComplete: () => wave.remove(),
    });
  };

  const sendDataBurst = (fromCountry: Country) => {
    const fromNode = nodesRef.current.find(
      (n) => n.country.id === fromCountry.id
    );
    if (!fromNode) return;

    nodesRef.current.forEach((node) => {
      if (node.country.id !== fromCountry.id) {
        createDataStream(
          { x: fromNode.x, y: fromNode.y },
          { x: node.x, y: node.y },
          fromCountry.color
        );
      }
    });
  };

  const createDataStream = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    color: string
  ) => {
    if (!containerRef.current) return;

    const stream = document.createElement("div");
    stream.className =
      "absolute w-[3px] h-[30px] pointer-events-none opacity-0";
    stream.style.left = `${start.x}px`;
    stream.style.top = `${start.y}px`;
    stream.style.background = `linear-gradient(to bottom, transparent, ${color}, transparent)`;
    containerRef.current.appendChild(stream);

    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    gsap.set(stream, { rotation: (angle * 180) / Math.PI + 90 });

    gsap.to(stream, {
      x: end.x - start.x,
      y: end.y - start.y,
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(stream, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => stream.remove(),
        });
      },
    });
  };

  const createParticles = () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className =
        "absolute w-[3px] h-[3px] rounded-full pointer-events-none opacity-60";
      particle.style.background = "linear-gradient(45deg, #9333ea, #3b82f6)";
      particle.style.left = `${Math.random() * rect.width}px`;
      particle.style.top = `${Math.random() * rect.height}px`;
      containerRef.current.appendChild(particle);

      gsap.to(particle, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        opacity: `random(0.1, 0.6)`,
        scale: `random(0.5, 1.5)`,
        duration: `random(15, 25)`,
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: `random(0, 5)`,
      });
    }
  };

  const animateTitles = () => {
    const title = containerRef.current?.querySelector("#world-title");
    
    if (!title) return;

    // Set initial state
    gsap.set(title, {
      opacity: 0,
      scale: 0.8
    });

    const tl = gsap.timeline();
    tl.to(title, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
    })
      .to(title, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        delay: 2.5,
        ease: "power2.inOut",
      });
  };

  const autoDataFlow = () => {
    setInterval(() => {
      if (nodesRef.current.length > 0) {
        const randomNode =
          nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
        sendDataBurst(randomNode.country);
      }
    }, 4000);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const init = () => {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        createNodes();
        setTimeout(() => {
          createConnections();
          createParticles();
          // Delay title animation to ensure everything is rendered
          setTimeout(animateTitles, 200);
        }, 500);
        setTimeout(autoDataFlow, 4000);
      });

      const connectionInterval = setInterval(() => {
        connectionsRef.current.forEach((path, index) => {
          gsap.to(path, {
            opacity: 0.1,
            duration: 1,
            delay: index * 0.1,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut",
          });
        });
      }, 5000);

      return () => {
        clearInterval(connectionInterval);
      };
    };

    // Add a small delay to ensure component is fully mounted
    const timeoutId = setTimeout(init, 100);

    return () => {
      clearTimeout(timeoutId);
      nodesRef.current = [];
      connectionsRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 30% 20%, rgba(147, 51, 234, 0.08) 0%, transparent 40%),
          radial-gradient(ellipse at 70% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
          radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.04) 0%, transparent 60%)
        `,
      }}
    >
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-[5]">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#9333ea", stopOpacity: 0.2 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#3b82f6", stopOpacity: 0.6 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#ec4899", stopOpacity: 0.2 }}
            />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      

      <h1
        id="world-title"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl md:text-5xl font-black text-center bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent opacity-0 leading-tight z-30"
      >
        Around the
        <br />
        World with AI
      </h1>
    </div>
  );
};

export default WorldAnimation;
