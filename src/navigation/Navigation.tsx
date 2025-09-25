import { Link, useLocation, useNavigate } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import Curtain from "@/components/Curtain";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [curtainVisible, setCurtainVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/know-about-me", label: "Know About Me" },
    { href: "/techjays-overview", label: "Techjays Overview" },
    { href: "/investment-portfolio", label: "Investment Portfolio" },
    { href: "/media-mentions", label: "Media Mentions" },
    { href: "/contact", label: "Contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    console.log('handleNavClick', href, label);
    // Don't show curtain if already on the same page
    if (location.pathname === href) {
      setIsMobileMenuOpen(false);
      return;
    }
    console.log('handleNavClick1111', href, label);
    
    setCurrentSection(label);
    setCurtainVisible(true);
    setIsMobileMenuOpen(false);
    
    // Navigate to new page at 1.5 seconds (after curtain starts sliding up)
    setTimeout(() => {
      navigate(href);
    }, 1500);
  };

  const handleCurtainComplete = () => {
    setCurtainVisible(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition-colors">
              <span className="text-base sm:text-lg font-semibold">Philip Samuelraj</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.label)}
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    location.pathname === item.href
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2 pt-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.label)}
                    className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${
                      location.pathname === item.href
                        ? "text-gray-900 bg-gray-100"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <Curtain 
        isVisible={curtainVisible}
        sectionName={currentSection}
        onComplete={handleCurtainComplete}
      />
    </>
  );
};

export default Navigation;
