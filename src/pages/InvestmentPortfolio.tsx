import { useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./InvestmentPortfolio.module.css";

// Import images
import viaImage from "../Images for investment/Via.webp";
import pushImage from "../Images for investment/Push.png";
import pepcareImage from "../Images for investment/Pepcare.png";
import orbcommImage from "../Images for investment/Orbcomm.jpg";
import operatioraiImage from "../Images for investment/Operatiorai.png";
import midalloyImage from "../Images for investment/Midalloy.png";
import hawxImage from "../Images for investment/Hawx.png";
import decernaImage from "../Images for investment/Decerna.png";
import bracketologyImage from "../Images for investment/Bracketology.jpg";
import belonglyImage from "../Images for investment/Belongly.png";
import aquacyclImage from "../Images for investment/Aquacycl.png";
import ameyaImage from "../Images for investment/Ameya.webp";
import aervivoImage from "../Images for investment/Aervivo.jpg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface InvestmentCard {
  name: string;
  description: string;
  industry: string;
  year: number;
  logo: string;
  image: string;
  caseStudyUrl: string;
}

const investments: InvestmentCard[] = [
  {
    name: "Via Analytics",
    description: "Via Analytics is an innovative Generative AI solution designed to enhance business decision-making through advanced data analysis.",
    industry: "Artificial Intelligence",
    year: 2023,
    logo: "👁️",
    image: viaImage,
    caseStudyUrl: "https://www.techjays.com/case-studies/qa-case-study-via-analytics"
  },
  {
    name: "Push",
    description: "Created an interactive and map-enabled network to literally open doors — particularly on university campuses — for people with disabilities.",
    industry: "Clean Energy",
    year: 2023,
    logo: "🌱",
    image: pushImage,
    caseStudyUrl: "https://www.techjays.com/case-studies/push"
  },
  {
    name: "Pepcare",
    description: "Built a web HIPPA-compliant platform to streamline scheduling, referral, and consultation services for dental practitioners.",
    industry: "Healthcare",
    year: 2022,
    logo: "⚛️",
    image: pepcareImage,
    caseStudyUrl: "https://www.techjays.com/case-studies/pepcare"
  },
  {
    name: "Orbcomm",
    description: "In today's dynamic business environment, efficient and reliable reporting is crucial. To meet our client's needs for an advanced automation framework, we developed a solution utilizing Java, Playwright, and Cucumber.",
    industry: "Blockchain",
    year: 2022,
    logo: "🔒",
    image: orbcommImage,
    caseStudyUrl: "https://www.techjays.com/case-studies/qa-case-study-automation-testing-for-orbcomm"
  },
  {
    name: "Operator AI",
    description: "AI-powered functional testing that reduces manual effort, enhances accuracy, and speeds up software delivery.",
    industry: "Healthcare Tech",
    year: 2023,
    logo: "🤖",
    image: operatioraiImage,
    caseStudyUrl: "https://www.techjays.com/case-studies/ai-powered-testing-transformation-with-operator-ai"
  },
  {
    name: "Midalloy",
    description: "The AI Chatbot for Midalloy Products is designed to provide instant and accurate answers related to midalloy products, welding products, and metallurgy.",
    industry: "Cloud Computing",
    year: 2022,
    logo: "☁️",
    image: midalloyImage,
    caseStudyUrl: "https://www.techjays.com/case-studies/qa-case-study-midalloy"
  },
  {
    name: "Hawx",
    description: "Our pros created a fully-integrated and user-friendly platform for pest control booking via desktop, mobile, and tablet.",
    industry: "Data Science",
    year: 2023,
    logo: "📊",
    image: hawxImage,
    caseStudyUrl: "https://www.techjays.com/case-studies/hawx"
  },
  {
    name: "Decerna",
    description: "Our team created a cutting-edge emission calculation tool with multiple data interface options and instant shareability.",
    industry: "Cybersecurity",
    year: 2022,
    logo: "🛡️",
    image: decernaImage,
    caseStudyUrl: "https://www.techjays.com/case-studies/decerna"
  },
  {
    name: "Bracketology",
    description: "We took an app with unrealized potential and rebuilt it from the ground up — delivering a brand new design and user-friendly UX.",
    industry: "IoT",
    year: 2023,
    logo: "🔌",
    image: bracketologyImage,
    caseStudyUrl: "https://www.techjays.com/case-studies/bracketology"
  },
  {
    name: "Belongly",
    description: "A HIPAA-compliant AI matching solution that streamlines therapist connections, enhances accuracy, and accelerates user onboarding.",
    industry: "AR/VR",
    year: 2022,
    logo: "👓",
    image: belonglyImage,
    caseStudyUrl: "https://www.techjays.com/case-studies/belongly"
  },
  {
    name: "Aquacycl",
    description: "We engineered a hyper-secure and dynamic web portal to ensure secure authentication, password management, and seamless integration into existing systems.",
    industry: "Biotechnology",
    year: 2023,
    logo: "🧬",
    image: aquacyclImage,
    caseStudyUrl: "https://www.techjays.com/case-studies/aquacycl"
  },
  {
    name: "Ameya",
    description: "Ameya is a dual-platform healthcare application designed to connect healthcare providers with patients through an integrated digital platform.",
    industry: "FinTech",
    year: 2022,
    logo: "💳",
    image: ameyaImage,
    caseStudyUrl: "https://www.techjays.com/case-studies/qa-case-study-ameya"
  },
  {
    name: "Aervivo",
    description: "Aervivo's Connectivity Platform offers scalable, fiber-grade hybrid network solutions designed for efficient ISP deployment.",
    industry: "Edge Computing",
    year: 2023,
    logo: "🌐",
    image: aervivoImage,
    caseStudyUrl: "https://www.techjays.com/case-studies/qa-case-study-aervivo"
  }
];

const InvestmentCard = ({ investment, index }: { investment: InvestmentCard; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !innerRef.current || !imageRef.current || !imageContainerRef.current) return;

    const card = cardRef.current;
    const inner = innerRef.current;
    const image = imageRef.current;
    const imageContainer = imageContainerRef.current;

    // Magnetic effect variables
    let mouseX = 0;
    let mouseY = 0;
    let cardX = 0;
    let cardY = 0;

    // Entrance animation with alternating rotation
    gsap.set(card, {
      opacity: 0,
      scale: 0.8,
      rotationY: index % 2 === 0 ? 90 : -90,
      transformOrigin: "center center"
    });

    // Staggered entrance animation
    gsap.to(card, {
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power2.out"
    });

    // Parallax effect on scroll
    ScrollTrigger.create({
      trigger: card,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(card, {
          y: -100 * progress,
          rotationX: 5 * progress,
          duration: 0.1,
          ease: "none"
        });
      }
    });

    // Magnetic effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width / 2;
      mouseY = e.clientY - rect.top - rect.height / 2;
      
      // Calculate magnetic effect
      cardX += (mouseX * 0.1 - cardX) * 0.1;
      cardY += (mouseY * 0.1 - cardY) * 0.1;
      
      gsap.to(card, {
        x: cardX,
        y: cardY,
        rotationY: cardX * 0.02,
        rotationX: -cardY * 0.02,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    // Enhanced hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        boxShadow: "0 30px 80px rgba(59, 130, 246, 0.3), 0 20px 40px rgba(147, 51, 234, 0.2)",
        duration: 0.3,
        ease: "power2.out"
      });

      // Image zoom effect
      gsap.to(imageContainer, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });

      // Enhanced image animation
      gsap.to(image, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
        duration: 0.3,
        ease: "power2.out"
      });

      // Reset image animations
      gsap.to(imageContainer, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(image, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleClick = () => {
      window.open(investment.caseStudyUrl, '_blank');
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("click", handleClick);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("click", handleClick);
    };
  }, [investment.caseStudyUrl, index]);

  return (
    <div ref={cardRef} className={`${styles["flip-card"]} cursor-pointer`}>
      <div ref={innerRef} className={styles["flip-card-inner"]}>
        <div className={styles["flip-card-front"]}>
          <div ref={imageContainerRef} className={styles["image-container"]}>
            <img 
              ref={imageRef}
              src={investment.image} 
              alt={investment.name}
              className={styles["company-image"]}
            />
          </div>
          <div className={styles["company-info"]}>
            <h3 className={`${styles["gradient-title"]} text-2xl font-bold mb-2`}>{investment.name}</h3>
            <p className="text-gray-600 mb-2">{investment.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500">{investment.industry}</span>
              <span className="text-sm text-gray-500">{investment.year}</span>
            </div>
          </div>
        </div>
        <div className={styles["flip-card-back"]}>
          <div className={styles["back-content"]}>
            <h3 className={`${styles["gradient-title"]} text-2xl font-bold mb-4`}>
              {investment.name}
            </h3>
            <p className="text-gray-600 mb-4">{investment.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{investment.industry}</span>
              <span className="text-sm text-gray-500">{investment.year}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InvestmentPortfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !subtitleRef.current || !backgroundRef.current) return;

    const tl = gsap.timeline();

    // Initial state: hide elements before animation
    gsap.set([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 30
    });

    // Timeline for entry animation (cards have their own entrance animations)
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8"); // Start subtitle animation slightly before title finishes

    // Animated background gradient
    gsap.to(backgroundRef.current, {
      background: "linear-gradient(135deg, rgba(196, 181, 253, 0.3) 0%, rgba(147, 197, 253, 0.2) 50%, rgba(196, 181, 253, 0.1) 100%)",
      duration: 2,
      ease: "power1.inOut"
    });

  }, []);

  return (
    <div ref={backgroundRef} className={`${styles["glass-morphism-bg"]} min-h-screen relative overflow-hidden`}>
      <Navigation />
      
      <main className="pt-32 relative z-10">
        <div ref={containerRef} className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 ref={titleRef} className={`${styles["gradient-title"]} text-5xl md:text-6xl font-bold mb-6`}>
              Investment Portfolio
            </h1>
            <p ref={subtitleRef} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Strategic investments in emerging technologies and high-growth ventures
            </p>
          </div>

          <div className={`${styles["cards-container"]} grid grid-cols-1 md:grid-cols-2 gap-8 mb-16`}>
            {investments.map((investment, index) => (
              <div key={index} className={`${styles["card-wrapper"]} flex flex-col items-center`}>
                <InvestmentCard investment={investment} index={index} />
              </div>
            ))}
          </div>

          {/* Removed Investment Focus Areas and Portfolio Highlights section */}

        </div>
      </main>
    </div>
  );
};

export default InvestmentPortfolio;
