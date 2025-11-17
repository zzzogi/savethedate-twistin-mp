import React, { useState, useRef, useEffect, useCallback } from "react";
import "./MusicPlayer.css";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Handle first user interaction to start music
  const handleFirstInteraction = useCallback(async () => {
    if (autoplayBlocked && audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);

        // Remove listeners after successful play
        document.removeEventListener("click", handleFirstInteraction);
        document.removeEventListener("touchstart", handleFirstInteraction);
      } catch (error) {
        console.log("Failed to play on interaction:", error);
      }
    }
  }, [autoplayBlocked]);

  // Auto play on mount
  useEffect(() => {
    const attemptAutoplay = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = volume;

          // Try to play
          await audioRef.current.play();
          setIsPlaying(true);
          setAutoplayBlocked(false);
        }
      } catch (error) {
        // Autoplay was blocked by browser
        console.log("Autoplay blocked by browser:", error);
        setIsPlaying(false);
        setAutoplayBlocked(true);

        // Add click listener to start on first interaction
        document.addEventListener("click", handleFirstInteraction);
        document.addEventListener("touchstart", handleFirstInteraction);
      }
    };

    attemptAutoplay();

    // Cleanup
    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [handleFirstInteraction, volume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/bg-music.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        loop
        preload="auto"
      />

      {/* Autoplay notification (if blocked) */}
      {autoplayBlocked && (
        <div className="autoplay-notice">
          <span className="notice-icon">🎵</span>
          <span className="notice-text">
            Phát nhạc để có trải nghiệm tốt nhất
          </span>
        </div>
      )}

      {/* Pill-Shaped Floating Player */}
      <div
        className={`music-player-pill ${isExpanded ? "expanded" : "collapsed"}`}
      >
        {/* Collapsed View - Pill Button */}
        <div className="pill-collapsed" onClick={toggleExpand}>
          <button
            className="pill-play-btn"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
          >
            {isPlaying ? (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <div className="pill-info">
            <span className="pill-text">
              If I Ain't Got You (Piano)- Henry Smith
            </span>
          </div>
        </div>

        {/* Expanded View - Full Player */}
        <div className="pill-expanded">
          <div className="pill-header">
            <div className="pill-track-info">
              <div className="pill-album-icon">🎵</div>
              <div className="pill-track-text">
                <div className="pill-title">If I Ain't Got You (Piano)</div>
                <div className="pill-artist">Henry Smith</div>
              </div>
            </div>
            <button className="pill-close-btn" onClick={toggleExpand}>
              ×
            </button>
          </div>

          <div className="pill-controls">
            <button className="pill-control-btn" onClick={togglePlay}>
              {isPlaying ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="28"
                  height="28"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="28"
                  height="28"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          <div className="pill-progress">
            <span className="pill-time">{formatTime(currentTime)}</span>
            <input
              type="range"
              className="pill-progress-bar"
              min="0"
              max="100"
              value={(currentTime / duration) * 100 || 0}
              onChange={handleSeek}
            />
            <span className="pill-time">{formatTime(duration)}</span>
          </div>

          <div className="pill-volume">
            <button className="pill-volume-icon">
              {volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
            </button>
            <input
              type="range"
              className="pill-volume-bar"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
