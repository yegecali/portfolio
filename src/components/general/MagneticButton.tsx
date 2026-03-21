import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // how many px to attract (default 18)
  as?: "a" | "button";
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

const MagneticButton = ({
  children,
  className = "",
  strength = 18,
  as = "button",
  href,
  download,
  target,
  rel,
  onClick,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    x.set((e.clientX - cx) * (strength / (width / 2)));
    y.set((e.clientY - cy) * (strength / (height / 2)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span
      style={{ x: springX, y: springY, display: "inline-flex" }}
      className="w-full h-full items-center justify-center"
    >
      {children}
    </motion.span>
  );

  if (as === "a" && href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download}
        target={target}
        rel={rel}
        className={className}
        onMouseMove={handleMouseMove as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={className}
      onMouseMove={handleMouseMove as React.MouseEventHandler<HTMLButtonElement>}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {inner}
    </button>
  );
};

export default MagneticButton;
