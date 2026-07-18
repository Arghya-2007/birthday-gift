import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import LottiePackage from 'lottie-react';
const Lottie = LottiePackage.default || LottiePackage;
import './Hero.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const gradientRef = useRef(null);
  const headlineRef = useRef(null);
  const nameRef = useRef(null);
  const scrollRef = useRef(null);
  const shapesRef = useRef([]);

  /* Refs for static stickers so GSAP can float them */
  const stickerBalloonRef = useRef(null);
  const stickerCrownRef = useRef(null);
  const stickerCakeRef = useRef(null);

  /* Lottie animation data — loaded at runtime from /public */
  const [sparkleData, setSparkleData] = useState(null);

  useEffect(() => {
    fetch('/stickers/sparkle-spin.json')
      .then((r) => r.json())
      .then(setSparkleData)
      .catch(() => { });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ---- Animated gradient "breathing" effect ---- */
      gsap.to(gradientRef.current, {
        backgroundPosition: '100% 100%',
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      /* ---- Headline: Elastic explosion letter reveal ---- */
      const headlineLetters = headlineRef.current.querySelectorAll('.letter');
      gsap.set(headlineLetters, {
        opacity: 0,
        x: 'random(-200, 200)',
        y: 'random(-200, 200)',
        rotation: 'random(-180, 180)',
        force3D: true,
      });
      gsap.to(headlineLetters, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.6)',
        stagger: 0.04,
        delay: 0.6,
      });

      /* ---- Name: Elastic explosion letter reveal ---- */
      const nameLetters = nameRef.current.querySelectorAll('.letter');
      gsap.set(nameLetters, {
        opacity: 0,
        x: 'random(-200, 200)',
        y: 'random(-200, 200)',
        rotation: 'random(-180, 180)',
        force3D: true,
      });
      gsap.to(nameLetters, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.6)',
        stagger: 0.04,
        delay: 1.6,
      });

      /* ---- Floating shapes: slow drift (yoyo, infinite) ---- */
      shapesRef.current.forEach((el, i) => {
        if (!el) return;
        const direction = i % 2 === 0 ? 1 : -1;
        gsap.to(el, {
          y: direction * (20 + i * 8),
          x: direction * (10 + i * 5),
          rotation: direction * (4 + i * 2),
          duration: 5 + i * 1.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });

      /* ---- Static sticker idle float animations ---- */
      const floatConfigs = [
        { ref: stickerBalloonRef, y: -14, x: 6, rot: 3, dur: 4.5 },
        { ref: stickerCrownRef, y: 10, x: -8, rot: -4, dur: 5.2 },
        { ref: stickerCakeRef, y: -12, x: 5, rot: 2.5, dur: 5.8 },
      ];

      floatConfigs.forEach(({ ref, y, x, rot, dur }) => {
        if (!ref.current) return;
        /* Entrance: fade + scale in */
        gsap.fromTo(
          ref.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)', delay: 2.2 }
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

      /* ---- Scroll indicator fade-in ---- */
      gsap.to(scrollRef.current, {
        opacity: 1,
        duration: 0.8,
        delay: 3,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-section" aria-label="Birthday hero">
      {/* Animated gradient background */}
      <div ref={gradientRef} className="hero-gradient" aria-hidden="true" />

      {/* Floating decorative shapes */}
      <div className="hero-shapes" aria-hidden="true">
        <div
          ref={(el) => (shapesRef.current[0] = el)}
          className="hero-shape hero-shape--1"
        />
        <div
          ref={(el) => (shapesRef.current[1] = el)}
          className="hero-shape hero-shape--2"
        />
        <div
          ref={(el) => (shapesRef.current[2] = el)}
          className="hero-shape hero-shape--3"
        />
        <div
          ref={(el) => (shapesRef.current[3] = el)}
          className="hero-shape hero-shape--4"
        />

        {/* SVG decorative star */}
        <svg
          ref={(el) => (shapesRef.current[4] = el)}
          className="hero-shape--star"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 0L36.18 21.82L58.53 23.82L41.18 37.64L46.18 58.53L30 46.36L13.82 58.53L18.82 37.64L1.47 23.82L23.82 21.82L30 0Z"
            fill="#f9a8d4"
          />
        </svg>
      </div>

      {/* ---- STICKER: Lottie sparkle-spin (top-right) ---- */}
      <div className="hero-sticker-slot">
        {sparkleData && (
          <Lottie
            animationData={sparkleData}
            loop
            autoplay
            style={{ width: '100%', height: '100%' }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* ---- STICKER: Balloons (bottom-left accent) ---- */}
      <div ref={stickerBalloonRef} className="hero-sticker hero-sticker--balloons" aria-hidden="true">
        <img src="/stickers/balloons.png" alt="" draggable="false" />
      </div>

      {/* ---- STICKER: Crown (top-left accent) ---- */}
      <div ref={stickerCrownRef} className="hero-sticker hero-sticker--crown" aria-hidden="true">
        <img src="/stickers/crown.png" alt="" draggable="false" />
      </div>

      {/* ---- STICKER: Cake (bottom-right accent) ---- */}
      <div ref={stickerCakeRef} className="hero-sticker hero-sticker--cake" aria-hidden="true">
        <img src="/stickers/cake.png" alt="" draggable="false" />
      </div>

      {/* Main content */}
      <div className="hero-content">
        <h1 ref={headlineRef} className="hero-headline" aria-label="Happy Birthday">
          {Array.from('Happy Birthday').map((char, i) =>
            char === ' ' ? ' ' : (
              <span className="letter" key={i} aria-hidden="true">
                {char}
              </span>
            )
          )}
        </h1>

        <p ref={nameRef} className="hero-name" aria-label="Ankita 🎉">
          {Array.from('Ankita 🎉').map((char, i) =>
            char === ' ' ? ' ' : (
              <span className="letter" key={i} aria-hidden="true">
                {char}
              </span>
            )
          )}
        </p>
      </div>

      {/* Scroll-down indicator */}
      <div ref={scrollRef} className="hero-scroll-indicator">
        <span className="hero-scroll-text">scroll down for your surprise ↓</span>
        <svg
          className="hero-scroll-chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
