import { useState, useMemo } from "react";
import { useSpring, useTrail, animated, config } from "react-spring";
import { FaJava, FaDatabase } from "react-icons/fa6";
import { SiQuarkus, SiApachekafka, SiSpring, SiRedis } from "react-icons/si";
import {
  HeroImageContainer,
  HeroImage as HeroImageStyled,
  RotatingBorder,
  ImageBlur,
  TechIcon,
  OrbitalContainer,
} from "../styles/HeroStyles";

interface HeroImageProps {
  src: string;
  alt: string;
}

export default function HeroImageComponent({ src, alt }: HeroImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Tech stack con ángulo de órbita
  const techStack = useMemo(
    () => [
      { icon: FaJava, label: "Java", index: 0, angle: 0 },
      { icon: SiQuarkus, label: "Quarkus", index: 1, angle: 60 },
      { icon: SiApachekafka, label: "Kafka", index: 2, angle: 120 },
      { icon: FaDatabase, label: "Database", index: 3, angle: 180 },
      { icon: SiSpring, label: "Spring Boot", index: 4, angle: 240 },
      { icon: SiRedis, label: "Redis", index: 5, angle: 300 },
    ],
    []
  );

  // Animación de entrada para el contenedor
  const containerSpring = useSpring({
    from: { opacity: 0, transform: "translateX(30px) scale(0.9)" },
    to: { opacity: 1, transform: "translateX(0px) scale(1)" },
    config: config.molasses,
  });

  // Animación de escala y brillo en hover
  const imageSpring = useSpring({
    transform: isHovered ? "scale(1.08)" : "scale(1)",
    filter: isHovered
      ? "brightness(1.15) drop-shadow(0 0 20px rgba(102, 126, 234, 0.6))"
      : "brightness(1) drop-shadow(0 0 0px rgba(102, 126, 234, 0))",
    config: config.wobbly,
  });

  // Animación del borde giratorio con efecto de glow
  const borderSpring = useSpring({
    filter: isHovered
      ? "drop-shadow(0 0 30px rgba(118, 75, 162, 0.8))"
      : "drop-shadow(0 0 15px rgba(102, 126, 234, 0.4))",
    config: config.gentle,
  });

  // Animación trail para los iconos de tech - ahora más responsiva
  const trail = useTrail(techStack.length, {
    from: { opacity: 0, y: -30, scale: 0.8 },
    to: { opacity: 1, y: 0, scale: 1 },
    config: config.gentle,
  });

  // Animación de los iconos en hover - con movimiento orbital
  const iconAnimations = useSpring({
    transform: isHovered
      ? "scale(1.15) rotate(10deg)"
      : "scale(1) rotate(0deg)",
    config: config.wobbly,
  });

  return (
    <animated.div style={containerSpring}>
      <HeroImageContainer
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <animated.div style={borderSpring}>
          <RotatingBorder />
        </animated.div>

        <animated.div style={imageSpring}>
          <HeroImageStyled src={src} alt={alt} />
        </animated.div>

        <ImageBlur />

        {/* Tech stack icons en órbita alrededor del borde */}
        <OrbitalContainer angle={0}>
          {trail.map((style, index) => {
            const tech = techStack[index];
            const IconComponent = tech.icon;
            const angle = tech.angle;
            const radius = 280; // Radio de la órbita

            return (
              <animated.div
                key={tech.index}
                style={{
                  ...style,
                  position: "absolute",
                  pointerEvents: "auto",
                  top: "50%",
                  left: "50%",
                  transform: `
                    translate(-50%, -50%)
                    translateX(${Math.cos((angle * Math.PI) / 180) * radius}px)
                    translateY(${Math.sin((angle * Math.PI) / 180) * radius}px)
                  `,
                }}
              >
                <animated.div style={iconAnimations}>
                  <TechIcon $index={tech.index}>
                    <IconComponent size={32} title={tech.label} />
                  </TechIcon>
                </animated.div>
              </animated.div>
            );
          })}
        </OrbitalContainer>
      </HeroImageContainer>
    </animated.div>
  );
}
