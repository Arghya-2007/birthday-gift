import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CursorTrail = () => {
  const trailRef = useRef(null);

  useEffect(() => {
    // Check if device is touch-enabled
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const trailElements = trailRef.current.children;
    const numElements = trailElements.length;

    // Array to store positions and setters for each element
    const trailData = [];
    
    // Initialize elements and create quickSetters
    for (let i = 0; i < numElements; i++) {
      trailData.push({
        el: trailElements[i],
        x: 0,
        y: 0,
        setX: gsap.quickSetter(trailElements[i], 'x', 'px'),
        setY: gsap.quickSetter(trailElements[i], 'y', 'px'),
        setScale: gsap.quickSetter(trailElements[i], 'scale'),
        setOpacity: gsap.quickSetter(trailElements[i], 'opacity'),
      });
      
      // Initial state
      gsap.set(trailElements[i], { scale: 0, opacity: 0 });
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);
    
    // Custom GSAP ticker function to animate the trail
    const renderTrail = () => {
      for (let i = 0; i < numElements; i++) {
        const data = trailData[i];
        
        // The first element follows the mouse closely, others follow the previous element
        const targetX = i === 0 ? mouseX : trailData[i - 1].x;
        const targetY = i === 0 ? mouseY : trailData[i - 1].y;
        
        // Adjust lerp factor to create a trail effect
        const ease = i === 0 ? 0.8 : 0.4; 
        
        data.x += (targetX - data.x) * ease;
        data.y += (targetY - data.y) * ease;
        
        data.setX(data.x);
        data.setY(data.y);
        
        // Calculate velocity or distance moved to affect scale/opacity
        const dx = targetX - data.x;
        const dy = targetY - data.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Show particles when moving, fade when still
        const targetScale = Math.min(dist * 0.05, 1) * (1 - i / numElements);
        const targetOpacity = Math.min(dist * 0.1, 0.8) * (1 - i / numElements);
        
        // Current values are approximated to save reading DOM
        const currentScale = gsap.getProperty(data.el, 'scale') || 0;
        const currentOpacity = gsap.getProperty(data.el, 'opacity') || 0;
        
        const newScale = currentScale + (targetScale - currentScale) * 0.15;
        const newOpacity = currentOpacity + (targetOpacity - currentOpacity) * 0.15;
        
        data.setScale(newScale);
        data.setOpacity(newOpacity);
      }
    };

    gsap.ticker.add(renderTrail);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(renderTrail);
    };
  }, []);

  return (
    <div 
      ref={trailRef} 
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    >
      {/* Create 15 trail elements */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 text-yellow-300/80 mix-blend-screen drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]"
          style={{ 
            width: '12px', 
            height: '12px',
            marginLeft: '-6px', // center horizontally
            marginTop: '-6px', // center vertically
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3 3-9z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default CursorTrail;
