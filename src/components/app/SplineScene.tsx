import { Suspense, lazy, useEffect, useRef, useState, type ComponentType } from "react";
import { useInView } from "motion/react";

let splineModulePromise: Promise<unknown> | null = null;
const scenePrefetchPromises = new Map<string, Promise<void>>();

const preloadSplineModule = () => {
  if (!splineModulePromise) {
    splineModulePromise = import("@splinetool/react-spline");
  }
  return splineModulePromise;
};

const prefetchScene = (sceneUrl: string) => {
  if (!scenePrefetchPromises.has(sceneUrl)) {
    const promise = fetch(sceneUrl, { cache: "force-cache", mode: "cors" })
      .then(() => undefined)
      .catch(() => undefined);
    scenePrefetchPromises.set(sceneUrl, promise);
  }
  return scenePrefetchPromises.get(sceneUrl)!;
};

type SplineComponentProps = {
  scene: string;
  className?: string;
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
  const shouldPrepare = useInView(ref, { margin: "1200px 0px 1200px 0px" });
  const isInActiveViewport = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const [isScrolling, setIsScrolling] = useState(false);
  const [isModuleReady, setIsModuleReady] = useState(false);
  const [isSceneReady, setIsSceneReady] = useState(false);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(
        () => {
          void preloadSplineModule().then(() => {
            setIsModuleReady(true);
          });
        },
        { timeout: 2200 },
      );
    } else {
      timeoutId = setTimeout(() => {
        void preloadSplineModule().then(() => {
          setIsModuleReady(true);
        });
      }, 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (idleId !== null && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
      }
    };
  }, []);

  useEffect(() => {
    if (!shouldPrepare) return;

    let cancelled = false;

    void Promise.all([preloadSplineModule(), prefetchScene(scene)]).then(() => {
      if (cancelled) return;
      setIsModuleReady(true);
      setIsSceneReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [scene, shouldPrepare]);

  useEffect(() => {
    if (!isInActiveViewport) {
      setShouldMount(false);
      return;
    }

    if (!isModuleReady || !isSceneReady || isScrolling) {
      return;
    }

    const win = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const mount = () => {
      setShouldMount(true);
    };

    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(mount, { timeout: 900 });
    } else {
      timeoutId = setTimeout(mount, 260);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (idleId !== null && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
      }
    };
  }, [isInActiveViewport, isModuleReady, isSceneReady, isScrolling]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 240);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const showSpline = shouldMount && isInActiveViewport;

  return (
    <div ref={ref} className={`${className || ""} ${isScrolling && showSpline ? "pointer-events-none" : ""}`}>
      {showSpline ? (
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
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-bg-dark">
          <div className="w-8 h-8 border-2 border-text-muted/30 border-t-white/70 rounded-full animate-spin" />
          <p className="text-[10px] font-mono tracking-widest text-text-muted uppercase">Preparing 3D scene</p>
        </div>
      )}
    </div>
  );
}
