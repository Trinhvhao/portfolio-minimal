import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";

const TRACK = {
  title: "Midnight Cyber-City",
  artist: "Creative Developer Mix",
  url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
};

const NUM_BARS = 20;

export function FloatingVibeStation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bars, setBars] = useState<number[]>(Array(NUM_BARS).fill(10));

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!isPlaying || !isOpen) {
      setBars(Array(NUM_BARS).fill(10));
      return;
    }

    const intervalId = window.setInterval(() => {
      setBars(
        Array.from({ length: NUM_BARS }, () => {
          return Math.max(10, Math.random() * 100);
        }),
      );
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying, isOpen]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    setProgress(total ? (current / total) * 100 : 0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = x / bounds.width;
    audioRef.current.currentTime = percentage * audioRef.current.duration;
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-72 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full border-2 border-neutral-800 bg-neutral-900 flex items-center justify-center relative overflow-hidden shrink-0"
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="w-1 h-1 bg-black rounded-full" />
                </div>
              </motion.div>
              
              <div className="flex-1 overflow-hidden">
                <p className="text-white font-bold text-sm truncate">{TRACK.title}</p>
                <p className="text-neutral-400 text-xs truncate">VIBE STATION</p>
              </div>
              
              <button onClick={toggleMute} className="text-neutral-400 hover:text-white transition-colors" aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <div className="h-8 flex items-end gap-0.5 w-full">
              {bars.map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-green-400 to-green-600 rounded-t-sm opacity-80"
                  animate={{ height: `${height}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              ))}
            </div>

            <div className="w-full h-1.5 bg-neutral-800 rounded-full cursor-pointer overflow-hidden group" onClick={handleProgressClick}>
              <div className="h-full bg-green-500 group-hover:bg-green-400 transition-colors relative" style={{ width: `${progress}%` }} />
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-[9px] uppercase tracking-widest font-mono ${isPlaying ? "text-green-500" : "text-neutral-500"}`}>
                {isPlaying ? "Now Playing" : "Paused"}
              </span>
              
              <button onClick={togglePlay} className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform" aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all hover:scale-110 relative"
      >
        <Music className={`w-5 h-5 ${isPlaying ? 'text-green-400' : 'text-white'}`} />
        {isPlaying && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-black" />
        )}
      </button>

      <audio ref={audioRef} src={TRACK.url} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} loop />
    </div>
  );
}
