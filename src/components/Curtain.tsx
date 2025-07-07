import { useState, useEffect, useRef } from "react";

interface CurtainProps {
  isVisible: boolean;
  sectionName: string;
  onComplete: () => void;
}

const Curtain = ({ isVisible, sectionName, onComplete }: CurtainProps) => {
  const [showText, setShowText] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'hidden' | 'sliding-down' | 'visible' | 'sliding-up'>('hidden');
  const [shouldRender, setShouldRender] = useState(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    console.log('[Curtain] useEffect - isVisible:', isVisible);
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];

    if (isVisible) {
      if (isFirstRender.current) {
      setShouldRender(true);
      setShowText(false);
      setAnimationPhase('hidden');
        isFirstRender.current = false;
        const initialTimer = setTimeout(() => {
          setAnimationPhase('sliding-down');
          console.log('[Curtain] Animation phase: sliding-down (first render)');
        }, 50);
        timersRef.current.push(initialTimer);
      } else {
        setShouldRender(true);
        setShowText(false);
        setAnimationPhase('sliding-down');
        console.log('[Curtain] Animation phase: sliding-down');
      }

      const showTextTimer = setTimeout(() => {
        setAnimationPhase('visible');
        setShowText(true);
        console.log('[Curtain] Animation phase: visible, showText: true');
      }, 1000);
      timersRef.current.push(showTextTimer);

      const slideUpTimer = setTimeout(() => {
        setShowText(false);
        setAnimationPhase('sliding-up');
        console.log('[Curtain] Animation phase: sliding-up, showText: false');
      }, 2500);
      timersRef.current.push(slideUpTimer);

      const completeTimer = setTimeout(() => {
        setAnimationPhase('hidden');
        setShouldRender(false);
        onComplete();
        console.log('[Curtain] Animation phase: hidden, shouldRender: false');
      }, 3500);
      timersRef.current.push(completeTimer);

      return () => {
        timersRef.current.forEach(timer => clearTimeout(timer));
        timersRef.current = [];
      };
    } else {
      setShouldRender(false);
      setShowText(false);
      setAnimationPhase('hidden');
      console.log('[Curtain] Reset to hidden');
    }
  }, [isVisible, onComplete]);

  useEffect(() => {
    console.log('[Curtain] animationPhase:', animationPhase, 'shouldRender:', shouldRender, 'showText:', showText);
  }, [animationPhase, shouldRender, showText]);

  if (!shouldRender) {
    return null;
  }

  const getTransform = () => {
    switch (animationPhase) {
      case 'hidden':
        return 'translateY(-100%)';
      case 'sliding-down':
      case 'visible':
        return 'translateY(0%)';
      case 'sliding-up':
        return 'translateY(-100%)';
      default:
        return 'translateY(-100%)';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black z-[200] flex items-center justify-center"
      style={{
        transform: getTransform(),
        transition: animationPhase === 'hidden' ? 'none' : 'transform 1000ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        willChange: 'transform',
        transformOrigin: 'top',
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 200
      }}
    >
      <h1 
        className="text-white text-4xl md:text-6xl font-light tracking-wide"
        style={{
          opacity: showText ? 1 : 0,
          transition: 'opacity 300ms ease-in-out',
          willChange: 'opacity'
        }}
      >
        {sectionName}
      </h1>
    </div>
  );
};

export default Curtain;
