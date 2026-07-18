import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Message.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Letter content — each entry becomes a separately animated paragraph.
 * The `type` key drives a CSS modifier class for visual treatment.
 */
const LETTER_LINES = [
  {
    type: 'greeting',
    text: 'Hey Ankita,',
  },
  {
    type: 'body',
    text:
      "I still remember the first time we talked — it didn't take long to realise " +
      "you're the kind of person who makes everything around them a little brighter. " +
      "That hasn't changed one bit.",
  },
  {
    type: 'body',
    text:
      "You have this rare ability to make people feel genuinely seen and heard. " +
      "Your kindness isn't loud, but it's always there — in the small things, " +
      "the check-ins, the way you show up when it matters most.",
  },
  {
    type: 'closing',
    text: 'Hope your day is as amazing as you are. You deserve every bit of it. 💜',
  },
];

export default function Message() {
  const sectionRef = useRef(null);
  const linesRef = useRef([]);
  const stickerHeartsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Animate each paragraph line on scroll into view */
      gsap.to(linesRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          /* replay on scroll back */
          toggleActions: 'play none none reset',
        },
      });

      /* Sticker animation */
      gsap.fromTo(
        stickerHeartsRef.current,
        { opacity: 0, scale: 0.5, rotation: -15, x: 20 },
        {
          opacity: 1,
          scale: 1,
          rotation: 5,
          x: 0,
          duration: 0.8,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reset',
          },
        }
      );
      /* Idle float loop */
      gsap.to(stickerHeartsRef.current, {
        y: -8,
        rotation: 10,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.8,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="message-section" aria-label="Birthday message">
      <div className="message-card">
        {/* Decorative corner sticker */}
        <div ref={stickerHeartsRef} className="message-sticker message-sticker--hearts" aria-hidden="true">
          <img src="/stickers/hearts.png" alt="" draggable="false" />
        </div>

        {/* Decorative heart SVG at top of card */}
        <div className="message-heart" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Letter lines — each line is a separately animated element */}
        {LETTER_LINES.map((line, i) => (
          <p
            key={i}
            ref={(el) => (linesRef.current[i] = el)}
            className={`message-line${
              line.type === 'greeting'
                ? ' message-line--greeting'
                : line.type === 'closing'
                  ? ' message-line--closing'
                  : ''
            }`}
          >
            {line.text}
          </p>
        ))}
      </div>
    </section>
  );
}
