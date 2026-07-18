import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import './EnterScreen.css';

export default function EnterScreen({ onEnter, onStartMusic }) {
  const overlayRef = useRef(null);
  const flapClosedRef = useRef(null);
  const flapOpenRef = useRef(null);
  const cardRef = useRef(null);
  const envelopeRef = useRef(null);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // Initial setup for the flap rotation origins
    gsap.set(flapClosedRef.current, { transformOrigin: '150px 100px' });
    gsap.set(flapOpenRef.current, { transformOrigin: '150px 100px', opacity: 0 });
    gsap.set(cardRef.current, { y: 0 });
    
    // Slight float animation for the envelope to invite interaction
    gsap.to(envelopeRef.current, {
      y: -10,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    if (onStartMusic) onStartMusic(); // Start music immediately on click

    // Stop the floating animation smoothly
    gsap.killTweensOf(envelopeRef.current);
    gsap.to(envelopeRef.current, { y: 0, duration: 0.3 });

    const tl = gsap.timeline();

    // 1. Open the flap using scaleY trick for a pseudo-3D flip effect
    tl.to(flapClosedRef.current, { scaleY: 0, duration: 0.25, ease: 'power1.in' })
      .set(flapClosedRef.current, { opacity: 0 })
      .set(flapOpenRef.current, { opacity: 1, scaleY: 0 })
      .to(flapOpenRef.current, { scaleY: 1, duration: 0.25, ease: 'power1.out' })
      // 2. Slide the card out
      .to(cardRef.current, { y: -60, duration: 0.6, ease: 'back.out(1.2)' }, "-=0.1")
      // 3. Fade out the whole screen and trigger onEnter
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: onEnter
      }, "+=0.3");
  };

  return (
    <div ref={overlayRef} className="enter-screen">
      <div className="enter-content" onClick={handleOpen}>
        <h1 className="tap-text">{isOpening ? 'Opening...' : 'Tap to Open'}</h1>
        
        <div className="envelope-container" ref={envelopeRef}>
          <svg viewBox="0 0 300 250" className="envelope-svg">
            {/* Back of envelope */}
            <path d="M0,100 L300,100 L300,250 L0,250 Z" fill="#e2e8f0" />
            
            {/* Flap Open (rendered behind Card, folded up) */}
            <path 
              ref={flapOpenRef}
              d="M0,100 L150,10 L300,100 Z" 
              fill="#e2e8f0" 
              stroke="#cbd5e1" 
              strokeWidth="1"
            />

            {/* The Card inside */}
            <g ref={cardRef} className="card-group">
              <rect x="20" y="110" width="260" height="130" rx="8" fill="#fff" stroke="#f472b6" strokeWidth="2" />
              <text x="150" y="180" textAnchor="middle" fill="#f472b6" fontSize="24" fontFamily="serif" fontWeight="bold">For You ❤️</text>
            </g>

            {/* Front of envelope - sides and bottom */}
            <path d="M0,100 L150,190 L300,100 L300,250 L0,250 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <path d="M0,250 L150,190 L300,250" fill="none" stroke="#cbd5e1" strokeWidth="2" />

            {/* Top Flap (Starts closed, folded down over front) */}
            <path 
              ref={flapClosedRef}
              d="M0,100 L150,190 L300,100 Z" 
              fill="#f1f5f9" 
              stroke="#cbd5e1" 
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
