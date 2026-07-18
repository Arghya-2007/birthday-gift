import { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

export default function MusicPlayer({ forcePlay, visible = true }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (forcePlay && audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  }, [forcePlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div 
      className="music-player" 
      style={{ 
        opacity: visible ? 1 : 0, 
        pointerEvents: visible ? 'auto' : 'none', 
        transition: 'opacity 1s ease' 
      }}
    >
      <audio
        ref={audioRef}
        src="/audio/background-music.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button 
        className={`music-btn ${isPlaying ? 'playing' : 'invite-pulse'}`}
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <span className="music-icon">{isPlaying ? '🎶' : '🎵'}</span>
      </button>
    </div>
  );
}
