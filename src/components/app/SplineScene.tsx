import { Suspense, lazy, useRef, useState, useEffect } from "react";
import { useInView } from "motion/react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div ref={ref} className={`${className || ""} ${isScrolling ? "pointer-events-none" : ""}`}>
      {isInView ? (
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-bg-dark">
              <div className="w-8 h-8 border-4 border-text-muted/20 border-t-white/80 rounded-full animate-spin"></div>
            </div>
          }
        >
          <Spline scene={scene} className="w-full h-full" />
        </Suspense>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-bg-dark">
          <div className="w-8 h-8 border-4 border-text-muted/20 border-t-white/80 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
