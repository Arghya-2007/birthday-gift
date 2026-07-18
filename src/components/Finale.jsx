import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LottiePackage from 'lottie-react';
const Lottie = LottiePackage.default || LottiePackage;
import './Finale.css';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Confetti configuration                                             */
/* ------------------------------------------------------------------ */

const CONFETTI_COUNT = 55;

/** Palette of celebratory colors */
const CONFETTI_COLORS = [
  '#f472b6', // pink
  '#c084fc', // purple
  '#fbbf24', // amber
  '#fb923c', // orange
  '#34d399', // emerald
  '#60a5fa', // blue
  '#f87171', // red
  '#a78bfa', // violet
  '#fcd34d', // yellow
];

/** Possible shapes: 'rect' | 'circle' | 'star' */
const SHAPES = ['rect', 'rect', 'circle', 'circle', 'star'];

/**
 * Tiny SVG star markup — used for star-shaped confetti pieces.
 * Kept as a raw string so we can inject via innerHTML without extra deps.
 */
const STAR_SVG =
  '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">' +
  '<polygon points="10,0 12.9,6.9 20,7.6 14.7,12.5 16.2,20 10,16.2 3.8,20 5.3,12.5 0,7.6 7.1,6.9" />' +
  '</svg>';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Random number between min and max */
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

/** Pick a random item from an array */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Finale() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const signoffRef = useRef(null);
  const signoffCharsRef = useRef([]);
  const penIconRef = useRef(null);
  const stickerRef = useRef(null);
  const confettiRef = useRef(null);
  const confettiFired = useRef(false);

  /* Refs for accent stickers */
  const stickerPartyRef = useRef(null);
  const stickerCelebrationRef = useRef(null);
  const stickerHeartsRef = useRef(null);
  const stickerGiftRef = useRef(null);
  const stickerSparklesRef = useRef(null);

  /* Lottie animation data — loaded at runtime from /public */
  const [confettiData, setConfettiData] = useState(null);

  useEffect(() => {
    fetch('/stickers/confetti-burst.json')
      .then((r) => r.json())
      .then(setConfettiData)
      .catch(() => {});
  }, []);

  /**
   * Build confetti pieces dynamically and animate them outward
   * with randomised trajectories, rotation, and fade-out.
   */
  const fireConfetti = useCallback(() => {
    if (confettiFired.current) return;
    confettiFired.current = true;

    const container = confettiRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    const cx = width / 2;
    const cy = height / 2;

    const pieces = [];

    for (let i = 0; i < CONFETTI_COUNT; i++) {
      const el = document.createElement('div');
      const shape = pick(SHAPES);
      const color = pick(CONFETTI_COLORS);
      const size = rand(6, 14);

      el.className = 'finale-confetti__piece';

      if (shape === 'circle') {
        el.classList.add('finale-confetti__piece--circle');
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.background = color;
      } else if (shape === 'star') {
        el.classList.add('finale-confetti__piece--star');
        el.style.width = `${size + 4}px`;
        el.style.height = `${size + 4}px`;
        el.innerHTML = STAR_SVG;
        el.querySelector('svg').style.fill = color;
      } else {
        // rect (default)
        const w = rand(5, 12);
        const h = rand(8, 16);
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
        el.style.background = color;
      }

      // Start at centre
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      el.style.opacity = '1';

      container.appendChild(el);
      pieces.push(el);
    }

    // Animate each piece outward
    pieces.forEach((el) => {
      const angle = rand(0, Math.PI * 2);
      const distance = rand(120, Math.max(width, height) * 0.6);
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - rand(40, 160); // bias upward

      gsap.to(el, {
        x: dx,
        y: dy,
        rotation: rand(-540, 540),
        scale: rand(0.4, 1.2),
        opacity: 0,
        duration: rand(1.2, 2.4),
        ease: 'power3.out',
        delay: rand(0, 0.3),
        onComplete: () => el.remove(),
      });
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ---- Headline entrance (scale + fade) ---- */
      gsap.to(headlineRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reset',
          onEnter: () => {
            // After entrance animation completes, add the glow class
            gsap.delayedCall(0.9, () => {
              headlineRef.current?.classList.add('finale-headline--glowing');
            });
          },
          onLeaveBack: () => {
            headlineRef.current?.classList.remove('finale-headline--glowing');
          }
        },
      });

      /* ---- Sign-off character-by-character typing ---- */
      gsap.set(penIconRef.current, { opacity: 0, left: 0, rotation: 0 });
      gsap.set(signoffCharsRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reset',
        }
      });

      tl.to(penIconRef.current, { opacity: 1, duration: 0.2 })
        .to(signoffCharsRef.current, {
          opacity: 1,
          stagger: 0.05,
          duration: 0.01,
          ease: "none",
        })
        .to(penIconRef.current, {
          left: "100%",
          rotation: 20,
          duration: signoffCharsRef.current.length * 0.05,
          ease: "none",
        }, "<")
        .to(penIconRef.current, { opacity: 0, duration: 0.3 });

      /* ---- Lottie sticker slot entrance ---- */
      gsap.to(stickerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
          toggleActions: 'play none none reset',
        },
      });

      /* ---- Accent sticker entrances + idle floats ---- */
      const accentStickers = [
        { ref: stickerPartyRef, y: -12, x: 8, rot: 5, dur: 4.2, delay: 0.3 },
        { ref: stickerCelebrationRef, y: 10, x: -6, rot: -3, dur: 5.0, delay: 0.5 },
        { ref: stickerHeartsRef, y: -10, x: 5, rot: 3, dur: 4.8, delay: 0.4 },
        { ref: stickerGiftRef, y: 8, x: -7, rot: -2.5, dur: 5.5, delay: 0.6 },
        { ref: stickerSparklesRef, y: -8, x: 6, rot: 4, dur: 4.0, delay: 0.2 },
      ];

      accentStickers.forEach(({ ref, y, x, rot, dur, delay }) => {
        if (!ref.current) return;

        /* Entrance: pop in from scroll */
        gsap.fromTo(
          ref.current,
          { opacity: 0, scale: 0.3, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 55%',
              toggleActions: 'play none none reset',
            },
            delay,
          }
        );

        /* Idle float loop */
        gsap.to(ref.current, {
          y,
          x,
          rotation: rot,
          duration: dur,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });

      /* ---- Confetti burst (fires on enter, resets on leave back) ---- */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: fireConfetti,
        onLeaveBack: () => {
          confettiFired.current = false;
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [fireConfetti]);

  return (
    <section
      ref={sectionRef}
      className="finale-section"
      aria-label="Birthday finale"
    >
      {/* Confetti layer */}
      <div ref={confettiRef} className="finale-confetti" aria-hidden="true" />

      {/* ---- Accent stickers positioned around the section ---- */}

      {/* Party popper — top-left */}
      <div ref={stickerPartyRef} className="finale-sticker finale-sticker--party" aria-hidden="true">
        <img src="/stickers/party-popper.png" alt="" draggable="false" />
      </div>

      {/* Celebration — top-right */}
      <div ref={stickerCelebrationRef} className="finale-sticker finale-sticker--celebration" aria-hidden="true">
        <img src="/stickers/celebration.png" alt="" draggable="false" />
      </div>

      {/* Hearts — bottom-left */}
      <div ref={stickerHeartsRef} className="finale-sticker finale-sticker--hearts" aria-hidden="true">
        <img src="/stickers/hearts.png" alt="" draggable="false" />
      </div>

      {/* Gift box — small accent bottom-right */}
      <div ref={stickerGiftRef} className="finale-sticker finale-sticker--gift" aria-hidden="true">
        <img src="/stickers/gift-box.png" alt="" draggable="false" />
      </div>

      {/* Sparkles — small accent top-center */}
      <div ref={stickerSparklesRef} className="finale-sticker finale-sticker--sparkles" aria-hidden="true">
        <img src="/stickers/sparkles.png" alt="" draggable="false" />
      </div>

      {/* Main content */}
      <div className="finale-content">
        <h2 ref={headlineRef} className="finale-headline">
          Happy Birthday, Ankita! 🎂
        </h2>

        {/* ---- STICKER: Lottie confetti-burst (central celebration) ---- */}
        <div ref={stickerRef} className="finale-sticker-slot">
          {confettiData && (
            <Lottie
              animationData={confettiData}
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
              aria-hidden="true"
            />
          )}
        </div>

        <div className="finale-signoff-wrapper" ref={signoffRef}>
          <p className="finale-signoff">
            {Array.from("— with all my thoughts 💜").map((char, i) => (
              <span key={i} ref={(el) => (signoffCharsRef.current[i] = el)}>{char}</span>
            ))}
          </p>
          <div ref={penIconRef} className="finale-pen-icon" aria-hidden="true">
            ✨
          </div>
        </div>
      </div>
    </section>
  );
}
