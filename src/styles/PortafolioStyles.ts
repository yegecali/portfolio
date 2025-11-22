import styled from "styled-components";

export const PortafolioSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(52, 152, 219, 0.5),
      transparent
    );
  }

  @media (max-width: 768px) {
    padding: 4rem 0;
  }

  @media (max-width: 480px) {
    padding: 3rem 0;
  }
`;

export const PortafolioHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInDown 0.8s ease;

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  perspective: 1000px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const ProjectCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #3498db, #2ecc71, #e74c3c);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
    z-index: 10;
  }

  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);

    &::before {
      transform: scaleX(1);
    }
  }
`;

export const ProjectIconFloat = styled.div`
  position: absolute;
  top: -15px;
  right: -15px;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  opacity: 0.15;
  z-index: 1;
  transition: all 0.4s ease;

  ${ProjectCard}:hover & {
    opacity: 0.3;
    transform: scale(1.1) rotate(-20deg);
  }
`;

export const ProjectContent = styled.div`
  padding: 2.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

export const ProjectTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1rem;
  line-height: 1.3;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 1024px) {
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const ProjectDescription = styled.p`
  color: #4a5568;
  margin-bottom: 1.5rem;
  line-height: 1.7;
  font-size: 0.95rem;
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const ProjectTechnologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
`;

export const TechTag = styled.span`
  display: inline-block;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.1),
    rgba(118, 75, 162, 0.1)
  );
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1.5px solid #667eea;
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.2),
      rgba(118, 75, 162, 0.2)
    );
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.4rem 0.7rem;
  }
`;

export const ProjectLink = styled.a`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }
`;
