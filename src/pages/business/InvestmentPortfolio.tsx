import { useEffect, useRef, useState } from "react";
import Navigation from "@/navigation/Navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../styles/InvestmentPortfolio.module.css";

// Import images using dynamic imports to ensure they load correctly
const viaImage = new URL("../../assets/images/Images for investment/Via.webp", import.meta.url).href;
const pushImage = new URL("../../assets/images/Images for investment/Push.png", import.meta.url).href;
const pepcareImage = new URL("../../assets/images/Images for investment/Pepcare.png", import.meta.url).href;
const orbcommImage = new URL("../../assets/images/Images for investment/Orbcomm.jpg", import.meta.url).href;
const operatioraiImage = new URL("../../assets/images/Images for investment/Operatiorai.png", import.meta.url).href;
const midalloyImage = new URL("../../assets/images/Images for investment/Midalloy.png", import.meta.url).href;
const hawxImage = new URL("../../assets/images/Images for investment/Hawx.png", import.meta.url).href;
const decernaImage = new URL("../../assets/images/Images for investment/Decerna.png", import.meta.url).href;
const bracketologyImage = new URL("../../assets/images/Images for investment/Bracketology.jpg", import.meta.url).href;
const belonglyImage = new URL("../../assets/images/Images for investment/Belongly.png", import.meta.url).href;
const aquacyclImage = new URL("../../assets/images/Images for investment/Aquacycl.png", import.meta.url).href;
const ameyaImage = new URL("../../assets/images/Images for investment/Ameya.webp", import.meta.url).href;
const aervivoImage = new URL("../../assets/images/Images for investment/Aervivo.jpg", import.meta.url).href;

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



  useEffect(() => {
    if (!cardRef.current || !innerRef.current || !imageRef.current) return;

    const card = cardRef.current;
    const inner = innerRef.current;
    const image = imageRef.current;

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -5,
        boxShadow: "0 30px 60px rgba(0, 0, 0, 0.12)",
        duration: 0.3,
        ease: "power2.out"
      });

      // Subtle image animation on hover
      gsap.to(image, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
        duration: 0.3,
        ease: "power2.out"
      });

      // Reset image animation
      gsap.to(image, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleClick = () => {
      window.open(investment.caseStudyUrl, '_blank');
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("click", handleClick);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("click", handleClick);
    };
  }, [investment.caseStudyUrl]);

  return (
    <div ref={cardRef} className={`${styles["flip-card"]} cursor-pointer`}>
      <div ref={innerRef} className={styles["flip-card-inner"]}>
        <div className={styles["flip-card-front"]}>
          <img 
            ref={imageRef}
            src={investment.image} 
            alt={investment.name}
            className={styles["company-image"]}
          />
        </div>
        <div className={styles["flip-card-back"]}>
          <div className={styles["back-content"]}>
            <h3 className="text-2xl font-bold mb-4">{investment.name}</h3>
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
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !subtitleRef.current || !backgroundRef.current) return;

    const tl = gsap.timeline();

    // Initial state: hide elements before animation
    gsap.set([titleRef.current, subtitleRef.current, ".flip-card"], {
      opacity: 0,
      y: 30
    });

    // Timeline for entry animation
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
    }, "-=0.8") // Start subtitle animation slightly before title finishes
    .from(".flip-card", {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotationX: 15,
      transformOrigin: "center bottom",
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1 // Stagger the animation for each card
    }, "-=0.6"); // Start card animation before subtitle finishes

    // Animated background gradient
    gsap.to(backgroundRef.current, {
      background: "linear-gradient(135deg, rgba(196, 181, 253, 0.3) 0%, rgba(147, 197, 253, 0.2) 50%, rgba(196, 181, 253, 0.1) 100%)",
      duration: 2,
      ease: "power1.inOut"
    });

  }, []);

  return (
    <>
      <div ref={backgroundRef} className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation />
        <main className="pt-20 sm:pt-24 md:pt-28 lg:pt-32">
          <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
            <div className="text-center mb-12 sm:mb-16">
              <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                Investment Portfolio
              </h1>
              <p ref={subtitleRef} className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                Strategic investments in emerging technologies and high-growth ventures
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {investments.map((investment, index) => (
                <div key={index} className="flex flex-col items-center">
                  <InvestmentCard investment={investment} index={index} />
                  <h2 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-gray-900 text-center px-2">{investment.name}</h2>
                  <p className="mt-2 text-sm sm:text-base text-gray-600 text-center max-w-md px-4">{investment.description}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default InvestmentPortfolio;
