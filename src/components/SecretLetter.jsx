import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import TypewriterText from './TypewriterText';
import './SecretLetter.css';

export default function SecretLetter() {
  const [unlocked, setUnlocked] = useState(false);
  const cardRef = useRef(null);
  const lockRef = useRef(null);
  const buttonRef = useRef(null);

  const letterContent = "Okay, this part's just for you.\n\nI don't say this enough, but you're one of the few people I never have to\npretend around. That's rarer than people think.\n\nThank you for being exactly who you are — the good days and the messy ones.\nI hope this year gives you back even half of what you give everyone else.\n\nHappy birthday and Always Be Happy. 🤍";

  useEffect(() => {
    // Idle animation for the lock
    if (!unlocked && lockRef.current) {
      gsap.to(lockRef.current, {
        y: -6,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }
  }, [unlocked]);

  const handleUnlock = () => {
    if (unlocked) return;

    // Stop idle animation
    gsap.killTweensOf(lockRef.current);

    // Elastic unlock animation for the lock icon and button
    const tl = gsap.timeline();

    tl.to([lockRef.current, buttonRef.current], {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "back.in(1.7)",
      stagger: 0.1
    });

    tl.to(cardRef.current, {
      scale: 1.03,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setUnlocked(true);
      }
    }, "-=0.2");
  };

  return (
    <section className="secret-section" aria-label="Secret Letter">
      <div className={`secret-card ${unlocked ? 'is-unlocked' : ''}`} ref={cardRef}>
        {!unlocked && (
          <div className="secret-lock-container">
            <div ref={lockRef} className="secret-lock">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <button ref={buttonRef} className="unlock-button" onClick={handleUnlock}>
              Tap to Unlock
            </button>
          </div>
        )}

        {unlocked && (
          <div className="secret-content">
            <div className="secret-envelope-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <TypewriterText
              text={letterContent}
              start={unlocked}
            />
          </div>
        )}
      </div>
    </section>
  );
}
