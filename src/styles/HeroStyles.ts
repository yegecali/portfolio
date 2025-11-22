import styled from "styled-components";

export const HeroSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    min-height: auto;
    padding: 4rem 0;
  }
`;

export const HeroContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const HeroContent = styled.div`
  animation: fadeInLeft 0.8s ease;

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
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const HeroSubtitle = styled.h2`
  font-size: 1.3rem;
  color: #4a5568;
  margin-bottom: 2rem;
  line-height: 1.8;
  font-weight: 500;
  margin-top: 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const HeroProfession = styled.p`
  font-size: 1.3rem;
  color: #667eea;
  margin-bottom: 1rem;
  line-height: 1.8;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const HeroDescription = styled.p`
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 1rem;
  line-height: 1.8;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const HeroContactInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  flex-direction: column;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #4a5568;
  font-weight: 500;

  svg {
    color: #667eea;
  }

  a {
    color: #667eea;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const HeroSocials = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const SocialBtn = styled.a`
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

export const HeroImageContainer = styled.div`
  animation: fadeInRight 0.8s ease;
  display: flex;
  justify-content: center;
  position: relative;

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
  border: 8px dashed #667eea;
  object-fit: cover;
  animation: rotateBorder 8s linear infinite;

  @keyframes rotateBorder {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

export const ImageBlur = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  background: rgba(102, 126, 234, 0.3);
  border-radius: 50%;
  filter: blur(40px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

export const TechIcon = styled.div<{ $index: number }>`
  position: absolute;
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: float 3s ease-in-out infinite;

  ${(props) => {
    const positions = [
      { top: "-20px", right: "20px" },
      { bottom: "30px", right: "-20px" },
      { bottom: "-20px", left: "20px" },
      { top: "30px", left: "-20px" },
    ];
    const pos = positions[props.$index % 4];
    return `top: ${pos.top}; right: ${pos.right}; left: ${pos.left}; bottom: ${pos.bottom};`;
  }}

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
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
