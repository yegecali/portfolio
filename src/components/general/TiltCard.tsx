import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;    // max degrees of rotation (default 10)
  glare?: boolean;     // show glare shine effect (default true)
  scale?: number;      // scale on hover (default 1.02)
}

const TiltCard = ({
  children,
  className = "",
  maxTilt = 10,
  glare = true,
  scale = 1.02,
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Raw mouse position values (0–1 relative to card)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spring-smooth rotation
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [maxTilt, -maxTilt]),
    { stiffness: 150, damping: 20, mass: 0.5 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-maxTilt, maxTilt]),
    { stiffness: 150, damping: 20, mass: 0.5 }
  );

  // Glare position follows mouse
  const glareX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [0, 1], ["0%", "100%"]);
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
    glareOpacity.set(0.12);
  };

  const handleMouseLeave = () => {
    // Reset to center
    mouseX.set(0.5);
    mouseY.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      whileHover={{ scale }}
      transition={{ scale: { type: "spring", stiffness: 300, damping: 25 } }}
      className={`relative ${className}`}
    >
      {/* Content lifted in Z */}
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>

      {/* Glare overlay */}
      {glare && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          style={{ opacity: glareOpacity }}
        >
          <motion.div
            className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{
              left: glareX,
              top: glareY,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)",
              filter: "blur(12px)",
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default TiltCard;
