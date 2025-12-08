import styled, { keyframes } from "styled-components";

// Keyframes para typing animation
const blinkCursor = keyframes`
  0%, 49% {
    border-right-color: #667eea;
  }
  50%, 100% {
    border-right-color: transparent;
  }
`;

export const HeroSection = styled.section`
  padding: 3rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    min-height: auto;
    padding: 2rem 0;
  }
`;

/**
 * HeroContainer is managed by shared Container/Row/Col components
 * Keeping HeroContainer for backward compatibility if needed elsewhere
 */
export const HeroContainer = styled.div`
  /* Container styling handled by shared components */
`;

export const HeroContent = styled.div`
  animation: fadeInLeft 0.8s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  z-index: 2;
  height: 100%;

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.3;
  display: block;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const TypedName = styled.span<{ $isComplete?: boolean }>`
  display: inline;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  position: relative;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  .cursor {
    display: inline;
    animation: ${blinkCursor} 0.75s step-end infinite;
    margin-left: 2px;
    color: #667eea;
  }

  .cursor-blink {
    display: inline;
    animation: ${blinkCursor} 0.75s step-end infinite;
    margin-left: 2px;
    color: #667eea;
  }
`;

export const HeroSubtitle = styled.h2`
  font-size: 1.1rem;
  color: #667eea;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  animation: fadeInUp 0.8s ease 0.2s both;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const HeroProfession = styled.p`
  font-size: 1.2rem;
  color: #764ba2;
  margin-bottom: 1.5rem;
  line-height: 1.4;
  font-weight: 600;
  animation: fadeInUp 0.8s ease 0.3s both;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const HeroDescription = styled.p`
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 1rem;
  line-height: 1.5;
  font-weight: 400;
  animation: fadeInUp 0.8s ease 0.4s both;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const HeroContactInfo = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2.5rem 0;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease 0.5s both;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
    margin: 2rem 0;
  }
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: #4a5568;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  svg {
    color: #667eea;
    transition: all 0.3s ease;
  }

  a {
    color: #667eea;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: #764ba2;
      text-decoration: underline;
    }
  }

  &:hover svg {
    color: #764ba2;
    transform: scale(1.1);
  }
`;

export const HeroSocials = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease 0.6s both;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    gap: 0.8rem;
  }
`;

export const SocialBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.3rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  border: 2px solid transparent;

  svg {
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
    background: linear-gradient(135deg, #764ba2, #667eea);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.65rem 1.1rem;
    font-size: 0.9rem;
  }
`;

export const HeroImageContainer = styled.div`
  animation: fadeInRight 0.8s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;

  &:hover {
    filter: brightness(1.1);
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    order: -1;
  }
`;

export const HeroImage = styled.img`
  width: 480px;
  height: 480px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  z-index: 2;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4),
    inset 0 0 30px rgba(102, 126, 234, 0.1);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:hover {
    box-shadow: 0 30px 80px rgba(102, 126, 234, 0.6),
      inset 0 0 40px rgba(102, 126, 234, 0.2);
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

// Contenedor para el borde rotativo
export const RotatingBorder = styled.div`
  position: absolute;
  width: 496px;
  height: 496px;
  border-radius: 50%;
  border: 8px dashed #667eea;
  animation: rotateBorder 8s linear infinite;
  z-index: 1;
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.5),
    inset 0 0 20px rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:hover {
    border-color: #764ba2;
    box-shadow: 0 0 30px rgba(118, 75, 162, 0.6),
      inset 0 0 30px rgba(118, 75, 162, 0.3);
  }

  @keyframes rotateBorder {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    width: 316px;
    height: 316px;
  }
`;
export const ImageBlur = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.4),
    rgba(118, 75, 162, 0.3)
  );
  border-radius: 50%;
  filter: blur(50px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  animation: blurPulse 6s ease-in-out infinite;

  @keyframes blurPulse {
    0%,
    100% {
      opacity: 0.4;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      opacity: 0.6;
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const floatAnimation = keyframes`
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
`;

const pulseGlow = keyframes`
  0%,
  100% {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1), 0 0 15px rgba(102, 126, 234, 0.2);
  }
  50% {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15), 0 0 25px rgba(102, 126, 234, 0.4);
  }
`;

// Contenedor orbital para los iconos
const orbitAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const OrbitalContainer = styled.div<{ angle: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${orbitAnimation} 25s linear infinite;

  &::before {
    content: "";
    position: absolute;
    width: 560px;
    height: 560px;
    border: 2px solid rgba(102, 126, 234, 0.08);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 0;
  }
`;

export const TechIcon = styled.div<{ $index: number }>`
  position: absolute;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ffffff, #f8f9ff);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1), 0 0 15px rgba(102, 126, 234, 0.2);
  animation: ${floatAnimation} 3s ease-in-out infinite,
    ${pulseGlow} 2.5s ease-in-out infinite;
  z-index: 3;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6),
      0 0 30px rgba(118, 75, 162, 0.5);
    border-color: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1.5rem;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
  }
`;

export const TechStack = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const TechItem = styled.div`
  text-align: center;
  animation: float 3s ease-in-out infinite;

  svg {
    width: 50px;
    height: 50px;
    margin-bottom: 0.5rem;
    color: #667eea;
  }

  p {
    font-size: 0.85rem;
    color: #4a5568;
    font-weight: 600;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;
