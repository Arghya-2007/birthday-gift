import Hero from './components/Hero'
import Message from './components/Message'
import WhyYoureSpecial from './components/WhyYoureSpecial'
import SecretLetter from './components/SecretLetter'
import Finale from './components/Finale'
import MusicPlayer from './components/MusicPlayer'
import EnterScreen from './components/EnterScreen'
import CursorTrail from './components/CursorTrail'
import AmbientBackground from './components/AmbientBackground'
import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [startMusic, setStartMusic] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    });

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Ensure GSAP ticker drives Lenis for perfect sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    if (!hasEntered) return;
    
    // Global Section Reveal Animations
    // Select all <section> elements after the components mount
    const sections = document.querySelectorAll('section');
    const triggers = [];

    sections.forEach((section) => {
      const trigger = gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      triggers.push(trigger);
    });

    // Background Color Transitions
    const colors = [
      "#fbcfe8", // Hero (pinkish)
      "#f3e8ff", // Message (light purple)
      "#fce7f3", // WhyYoureSpecial (soft pink)
      "#e9d5ff", // SecretLetter (purple-200)
      "#e0e7ff", // Finale (soft indigo/blue for contrast)
    ];

    gsap.set(mainRef.current, { backgroundColor: colors[0] });

    const colorTriggers = [];
    sections.forEach((section, i) => {
      if (i === 0) return;
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 50%', 
        onEnter: () => gsap.to(mainRef.current, { backgroundColor: colors[i], duration: 1.2, ease: "sine.inOut", overwrite: "auto" }),
        onEnterBack: () => gsap.to(mainRef.current, { backgroundColor: colors[i], duration: 1.2, ease: "sine.inOut", overwrite: "auto" }),
        onLeaveBack: () => {
          if (i > 0) gsap.to(mainRef.current, { backgroundColor: colors[i-1], duration: 1.2, ease: "sine.inOut", overwrite: "auto" });
        }
      });
      colorTriggers.push(trigger);
    });

    return () => {
      triggers.forEach(t => t.kill());
      colorTriggers.forEach(t => t.kill());
    };
  }, [hasEntered]);

  return (
    <>
      {!hasEntered && <EnterScreen onEnter={() => setHasEntered(true)} onStartMusic={() => setStartMusic(true)} />}
      
      {/* Render globally so it can start playing immediately on click, but visually hide it until entry */}
      <MusicPlayer forcePlay={startMusic} visible={hasEntered} />

      {hasEntered && (
        <main ref={mainRef} className="font-body overflow-x-hidden min-h-screen relative">
          <CursorTrail />
          <AmbientBackground />
          <Hero />
          <Message />
          <WhyYoureSpecial />
          <SecretLetter />
          <Finale />
        </main>
      )}
    </>
  )
}

export default App
