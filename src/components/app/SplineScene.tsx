import { Suspense, lazy, useRef, useEffect, useState, useMemo, type ComponentType } from "react";
import type { Application } from "@splinetool/runtime";
import { useInView } from "motion/react";

let splineModulePromise: Promise<unknown> | null = null;

const preloadSplineModule = () => {
  if (!splineModulePromise) {
    splineModulePromise = import("@splinetool/react-spline");
  }
  return splineModulePromise;
};

type SplineComponentProps = {
  scene: string;
  className?: string;
  onLoad?: (app: Application) => void;
};

const Spline = lazy(
  async () =>
    (await preloadSplineModule()) as {
      default: ComponentType<SplineComponentProps>;
    },
);

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasEnteredView = useInView(ref, { once: true, margin: "0px" });
  const isCurrentlyVisible = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleRef = useRef<number | null>(null);
  const splineAppRef = useRef<Application | null>(null);
  const visibleRef = useRef(false);
  const pageVisibleRef = useRef(true);

  const isLowEndDevice = useMemo(() => {
    if (typeof navigator === "undefined") return false;

    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;

    const saveData = conn?.saveData ?? false;
    const effectiveType = conn?.effectiveType ?? "4g";
    const slowNetwork = effectiveType === "slow-2g" || effectiveType === "2g" || effectiveType === "3g";

    return saveData || slowNetwork || cores <= 4 || memory <= 4;
  }, []);

  const loadDelayMs = useMemo(() => {
    if (typeof navigator === "undefined") return 300;

    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;

    // Keep a short delay on stronger devices and longer delay on weaker ones.
    return cores <= 4 || memory <= 4 ? 1400 : 350;
  }, []);

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    // Warm up chunk parsing during browser idle to avoid a hard spike when section becomes visible.
    if (typeof win.requestIdleCallback === "function") {
      idleRef.current = win.requestIdleCallback(
        () => {
          void preloadSplineModule();
        },
        { timeout: 2500 },
      );
    } else {
      timeoutRef.current = setTimeout(() => {
        void preloadSplineModule();
      }, 1200);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (idleRef.current !== null && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      const visible = !document.hidden;
      setIsPageVisible(visible);
      pageVisibleRef.current = visible;

      const app = splineAppRef.current;
      if (!app) return;

      if (visibleRef.current && visible) {
        app.play();
      } else {
        app.stop();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    // Preconnect early to reduce handshake latency for .splinecode and assets.
    const hosts = ["https://prod.spline.design", "https://assets.spline.design"];
    const links: HTMLLinkElement[] = [];

    hosts.forEach((host) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = host;
      link.crossOrigin = "";
      document.head.appendChild(link);
      links.push(link);
    });

    return () => {
      links.forEach((link) => {
        document.head.removeChild(link);
      });
    };
  }, []);

  useEffect(() => {
    if (!hasEnteredView || shouldLoadSpline) return;

    const scheduleLoad = () => {
      const win = window as Window & {
        requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };

      if (typeof win.requestIdleCallback === "function") {
        idleRef.current = win.requestIdleCallback(
          () => {
            setShouldLoadSpline(true);
          },
          { timeout: 2000 },
        );
      } else {
        timeoutRef.current = setTimeout(() => {
          setShouldLoadSpline(true);
        }, loadDelayMs);
      }
    };

    // Wait for scroll to settle, then load during idle time.
    timeoutRef.current = setTimeout(scheduleLoad, loadDelayMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const win = window as Window & { cancelIdleCallback?: (id: number) => void };
      if (idleRef.current !== null && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleRef.current);
      }
    };
  }, [hasEnteredView, shouldLoadSpline, loadDelayMs]);

  useEffect(() => {
    visibleRef.current = isCurrentlyVisible;

    const app = splineAppRef.current;
    if (!app) return;

    if (isCurrentlyVisible && isPageVisible) {
      app.play();
    } else {
      app.stop();
    }
  }, [isCurrentlyVisible, isPageVisible]);

  useEffect(() => {
    if (!shouldLoadSpline) return;

    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      element.classList.add("pointer-events-none");
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        element.classList.remove("pointer-events-none");
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      element.classList.remove("pointer-events-none");
    };
  }, [shouldLoadSpline]);

  useEffect(() => {
    return () => {
      splineAppRef.current?.stop();
      splineAppRef.current = null;
    };
  }, []);

  return (
    <div ref={ref} className={className || ""}>
      {shouldLoadSpline ? (
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-bg-dark">
              <div className="w-8 h-8 border-4 border-text-muted/20 border-t-white/80 rounded-full animate-spin"></div>
            </div>
          }
        >
          <Spline
            scene={scene}
            className="w-full h-full"
            onLoad={(app) => {
              splineAppRef.current = app;
              if (!(visibleRef.current && pageVisibleRef.current)) {
                app.stop();
              }
            }}
          />
        </Suspense>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-bg-dark">
          <div className="w-8 h-8 border-4 border-text-muted/20 border-t-white/80 rounded-full animate-spin"></div>
          <p className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
            {isLowEndDevice ? "Preparing 3D (optimized mode)" : "Preparing 3D"}
          </p>
        </div>
      )}
    </div>
  );
}
