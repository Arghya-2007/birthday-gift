import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AmbientBackground = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const elements = container.children;
    
    // Ambient floating animation for each particle
    Array.from(elements).forEach((el) => {
      // Randomize initial positions a bit
      const randomX = gsap.utils.random(-20, 20);
      const randomY = gsap.utils.random(-20, 20);
      const randomRot = gsap.utils.random(-15, 15);
      
      gsap.to(el, {
        x: `+=${randomX}vw`,
        y: `+=${randomY}vh`,
        rotation: `+=${randomRot}`,
        duration: gsap.utils.random(15, 30),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      
      gsap.to(el, {
        opacity: gsap.utils.random(0.3, 0.7),
        duration: gsap.utils.random(4, 8),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: gsap.utils.random(0, 5)
      });
    });

    // Scroll parallax effect
    // We move the entire container slightly up when scrolling down
    const scrollAnimation = gsap.to(container, {
      yPercent: -15, // Move up by 15% of its height over the scroll
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrub
      }
    });

    return () => {
      scrollAnimation.kill();
      gsap.killTweensOf(elements);
    };
  }, []);

  // Generate some random particles and soft blobs
  const particles = Array.from({ length: 25 }).map((_, i) => {
    const isBlob = i % 5 === 0;
    
    const style = {
      top: `${gsap.utils.random(-10, 110)}%`,
      left: `${gsap.utils.random(-10, 110)}%`,
      transform: `scale(${gsap.utils.random(0.5, 2)})`,
      opacity: gsap.utils.random(0.2, 0.6)
    };
    
    if (isBlob) {
      // Large blurry blobs
      const size = gsap.utils.random(200, 400);
      const colors = ['bg-purple-500/20', 'bg-pink-500/20', 'bg-indigo-500/20', 'bg-blue-500/20'];
      const color = colors[i % colors.length];
      
      return (
        <div 
          key={i}
          className={`absolute rounded-full blur-3xl mix-blend-screen ${color}`}
          style={{
            ...style,
            width: size,
            height: size,
            marginLeft: -size/2,
            marginTop: -size/2
          }}
        />
      );
    } else {
      // Small stars/sparkles
      const size = gsap.utils.random(4, 12);
      
      return (
        <div
          key={i}
          className="absolute bg-white/40 rounded-full blur-[1px]"
          style={{
            ...style,
            width: size,
            height: size,
            boxShadow: '0 0 10px rgba(255,255,255,0.8)'
          }}
        />
      );
    }
  });

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-10] overflow-visible"
      aria-hidden="true"
    >
      {particles}
    </div>
  );
};

export default AmbientBackground;
