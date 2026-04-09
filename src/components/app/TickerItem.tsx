import React, { useEffect, useRef } from "react";

type TickerItemProps = {
  text: string;
};

export const TickerItem = React.memo(function TickerItem({ text }: TickerItemProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let animationFrameId = 0;
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;

    const handleResize = () => {
      winWidth = window.innerWidth;
      winHeight = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const checkPosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();

        const itemCenterX = rect.left + rect.width / 2;
        const windowCenterX = winWidth / 2;
        const distanceX = Math.abs(windowCenterX - itemCenterX);
        const maxDistanceX = winWidth / 3;

        let glowX = 1 - distanceX / maxDistanceX;
        glowX = Math.min(1, Math.max(0, glowX));

        const itemCenterY = rect.top + rect.height / 2;
        const windowCenterY = winHeight / 2;
        const distanceY = Math.abs(windowCenterY - itemCenterY);
        const maxDistanceY = winHeight / 2.5;

        let glowY = 1 - distanceY / maxDistanceY;
        glowY = Math.min(1, Math.max(0, glowY));

        const glow = glowX * glowY;
        const easedGlow = glow * glow * (3 - 2 * glow);

        const opacity = 0.2 + easedGlow * 0.8;
        const blur = easedGlow * 15;
        const shadowOpacity = easedGlow * 0.8;

        ref.current.style.color = `rgba(255, 255, 255, ${opacity})`;
        ref.current.style.textShadow =
          easedGlow > 0.01 ? `0 0 ${blur}px rgba(255,255,255,${shadowOpacity})` : "none";
      }

      animationFrameId = requestAnimationFrame(checkPosition);
    };

    checkPosition();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <span ref={ref} className="text-4xl md:text-6xl font-heading font-bold will-change-[color,text-shadow]">
      {text}
    </span>
  );
});
