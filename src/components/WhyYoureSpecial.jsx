import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhyYoureSpecial.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Card data — emoji + title + one-liner.
 * Placeholders from 03-CONTENT.md filled with warm fallback text.
 */
const CARDS = [
  {
    emoji: '🌟',
    title: 'Your Warmth',
    text: "You make everyone around you feel like they belong — that's a rare and beautiful thing.",
  },
  {
    emoji: '😄',
    title: 'That Laugh',
    text: 'Your laugh is ridiculously contagious. One giggle from you and the whole room lights up.',
  },
  {
    emoji: '🎈',
    title: 'Always There',
    text: 'Rain or shine, 3 AM or noon — you show up for the people you love, no questions asked.',
  },
  {
    emoji: '💫',
    title: 'Quiet Strength',
    text: "You handle life's curveballs with a grace most people can only dream of.",
  },
  {
    emoji: '🎂',
    title: 'Joy-Bringer',
    text: 'You have this gift of turning even the most ordinary moment into a small celebration.',
  },
  {
    emoji: '❤️',
    title: 'Golden Heart',
    text: "Your kindness isn't loud, but it's always felt — and it means the world.",
  },
];

export default function WhyYoureSpecial() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const stickerSparklesRef = useRef(null);
  const stickerCrownRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ---- Heading fade-in ---- */
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reset',
        },
      });

      /* ---- Staggered card entrance: fade + scale ---- */
      gsap.to(cardsRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reset',
        },
      });

      /* ---- Sticker animations ---- */
      const stickers = [
        { ref: stickerSparklesRef, x: -20, y: 0, rot: -10, floatY: -10, dur: 4 },
        { ref: stickerCrownRef, x: 20, y: 0, rot: 10, floatY: -15, dur: 5 },
      ];
      stickers.forEach(({ ref, x, y, rot, floatY, dur }) => {
        gsap.fromTo(
          ref.current,
          { opacity: 0, scale: 0.4, x, y, rotation: rot },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.8,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reset',
            },
          }
        );
        gsap.to(ref.current, {
          y: floatY,
          rotation: rot / 2,
          duration: dur,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 0.8,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="special-section"
      aria-label="Why you're special"
    >
      {/* Decorative background stickers */}
      <div ref={stickerSparklesRef} className="special-sticker special-sticker--sparkles" aria-hidden="true">
        <img src="/stickers/sparkles.png" alt="" draggable="false" />
      </div>
      <div ref={stickerCrownRef} className="special-sticker special-sticker--crown" aria-hidden="true">
        {/* spot for a small crown or another sticker */}
        <img src="/stickers/crown.png" alt="" draggable="false" />
      </div>

      <h2 ref={headingRef} className="special-heading">
        Just some of the things I love about you ✨
      </h2>

      <div className="special-grid">
        {CARDS.map((card, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="special-card"
          >
            <div className="special-card__emoji" aria-hidden="true">
              {card.emoji}
            </div>
            <h3 className="special-card__title">{card.title}</h3>
            <p className="special-card__text">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
