import { useState, useEffect } from "react";
import Navigation from "@/navigation/Navigation";
import TimelineWheel from "@/components/TimelineWheel";

// Philip Samuelraj image path
const philcoverImage = "/src/assets/images/coverimage/Philcover.png";

const KnowAboutMe = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Timeline Wheel as main content */}
      <TimelineWheel />
    </div>
  );
};

export default KnowAboutMe; 