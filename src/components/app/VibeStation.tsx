import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Play, Pause, Volume2, VolumeX, FastForward, Rewind } from "lucide-react";

const TRACK = {
  title: "Midnight Cyber-City",
  artist: "Creative Developer Mix",
  url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
};

const NUM_BARS = 40;

export function VibeStation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bars, setBars] = useState<number[]>(Array(NUM_BARS).fill(10));

  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isInView = useInView(containerRef, { margin: "-100px" });

  useEffect(() => {
    if (!isPlaying || !isInView) {
      setBars(Array(NUM_BARS).fill(10));
      return;
    }

    const intervalId = window.setInterval(() => {
      setBars(
        Array.from({ length: NUM_BARS }, (_, i) => {
          const distanceToCenter = Math.abs(i - NUM_BARS / 2);
          const maxH = 100 - distanceToCenter * 2;
          const minH = 10;
          return Math.max(minH, Math.random() * maxH);
        }),
      );
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying, isInView]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      void audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
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
    if (!audioRef.current) return;

    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = x / bounds.width;
    audioRef.current.currentTime = percentage * audioRef.current.duration;
  };

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto">
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="relative shrink-0">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-neutral-800 bg-neutral-900 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
              <div className="absolute inset-2 rounded-full border border-neutral-800" />
              <div className="absolute inset-6 rounded-full border border-neutral-800" />
              <div className="absolute inset-10 rounded-full border border-neutral-800" />
              <div className="absolute inset-14 rounded-full border border-neutral-800" />

              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-black rounded-full" />
              </div>
            </motion.div>

            <motion.div animate={{ rotate: isPlaying ? 15 : 0 }} className="absolute -top-4 -right-4 w-2 h-16 bg-neutral-700 rounded-full origin-top shadow-lg hidden md:block">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-neutral-600 rounded-sm" />
            </motion.div>
          </div>

          <div className="flex-1 w-full flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-green-500 animate-pulse" : "bg-neutral-500"}`} />
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono">{isPlaying ? "Now Playing" : "Paused"}</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-heading font-bold text-white tracking-tight">{TRACK.title}</h3>
              <p className="text-neutral-400 font-mono text-sm mt-1">{TRACK.artist}</p>
            </div>

            <div className="h-16 md:h-24 flex items-end gap-1 w-full">
              {bars.map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-sm opacity-80"
                  animate={{ height: `${height}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              ))}
            </div>

            <div className="w-full h-2 bg-neutral-800 rounded-full cursor-pointer overflow-hidden group" onClick={handleProgressClick}>
              <div className="h-full bg-white group-hover:bg-blue-400 transition-colors relative" style={{ width: `${progress}%` }} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="text-neutral-400 hover:text-white transition-colors" aria-label="Rewind">
                  <Rewind className="w-5 h-5" />
                </button>

                <button onClick={togglePlay} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform" aria-label={isPlaying ? "Pause" : "Play"}>
                  {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-1" />}
                </button>

                <button className="text-neutral-400 hover:text-white transition-colors" aria-label="Fast forward">
                  <FastForward className="w-5 h-5" />
                </button>
              </div>

              <button onClick={toggleMute} className="text-neutral-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10" aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={TRACK.url} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} loop />
    </div>
  );
}
