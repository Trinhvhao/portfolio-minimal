import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SCROLL_IDLE_DELAY_MS = 140;
const LOW_END_CORE_THRESHOLD = 4;
const LOW_END_MEMORY_THRESHOLD_GB = 4;

interface SplineSceneProps {
  scene: string;
  className?: string;
}

function shouldUseLiteMode() {
  if (typeof window === "undefined") {
    return false;
  }

  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches ?? false;

  return prefersReducedMotion || coarsePointer || cores <= LOW_END_CORE_THRESHOLD || memory <= LOW_END_MEMORY_THRESHOLD_GB;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "0px", amount: 0.35 });
  const [isScrollIdle, setIsScrollIdle] = useState(true);
  const [liteMode, setLiteMode] = useState(false);

  useEffect(() => {
    setLiteMode(shouldUseLiteMode());
  }, []);

  useEffect(() => {
    let idleTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsScrollIdle(false);
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        setIsScrollIdle(true);
      }, SCROLL_IDLE_DELAY_MS);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(idleTimeout);
    };
  }, []);

  const shouldRenderSpline = !liteMode && isInView && isScrollIdle;

  const statusText = liteMode
    ? "3D DISABLED ON THIS DEVICE"
    : isInView && !isScrollIdle
      ? "3D PAUSED WHILE SCROLLING"
      : "3D PAUSED OFFSCREEN";

  return (
    <div ref={ref} className={`${className || ""} relative flex items-center justify-center`}>
      {shouldRenderSpline ? (
        <Suspense
          fallback={
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg-dark border border-white/5 rounded-lg">
              <div className="w-8 h-8 border-2 border-text-muted/30 border-t-white/70 rounded-full animate-spin" />
              <p className="text-[10px] font-mono tracking-widest text-text-muted uppercase">LOADING 3D ASSETS...</p>
            </div>
          }
        >
          <Spline scene={scene} className="w-full h-full" />
        </Suspense>
      ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg-dark/60 border border-white/5 rounded-lg opacity-60">
          <div className="w-8 h-8 border-2 border-dashed border-text-muted/40 rounded-full" />
          <p className="text-[10px] font-mono tracking-widest text-text-muted uppercase opacity-70">{statusText}</p>
        </div>
      )}
    </div>
  );
}
