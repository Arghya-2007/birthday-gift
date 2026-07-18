import React, { useState, useEffect, useRef } from 'react';
import './TypewriterText.css';

export default function TypewriterText({ text, start = false, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!start) return;

    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    let timeoutId;

    const typeChar = () => {
      if (i < text.length) {
        const char = text.charAt(i);
        i++;
        setDisplayedText(text.substring(0, i));

        let delay = Math.random() * 30 + 30; // base delay
        
        if (char === '.' || char === '!' || char === '?') {
          delay += 400;
        } else if (char === ',' || char === ';') {
          delay += 150;
        } else if (char === '\n') {
          delay += 500;
        }

        timeoutId = setTimeout(typeChar, delay);
      } else {
        setIsTyping(false);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    };

    // Start with a small delay
    timeoutId = setTimeout(typeChar, 300);

    return () => clearTimeout(timeoutId);
  }, [start, text]);

  return (
    <div className="typewriter-container">
      <span className="typewriter-text">
        {displayedText}
      </span>
      {isTyping && <span className="typewriter-cursor"></span>}
    </div>
  );
}
