import styled from "styled-components";

export const FooterElement = styled.footer`
  background: linear-gradient(135deg, #1a1f3a 0%, #16213e 100%);
  color: white;
  padding: 4rem 0 2rem;
  position: relative;
  overflow: visible;

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
      rgba(102, 126, 234, 0.5),
      transparent
    );
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(102, 126, 234, 0.3),
      transparent
    );
  }

  @media (max-width: 768px) {
    padding: 3rem 0 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 2.5rem 0 1rem;
  }
`;

export const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 4rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    gap: 3rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  @media (max-width: 480px) {
    gap: 2rem;
  }
`;

export const FooterSection = styled.div`
  animation: fadeInUp 0.8s ease;

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
`;

export const FooterTitle = styled.h4`
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const FooterListItem = styled.li`
  margin-bottom: 0.8rem;

  @media (max-width: 480px) {
    margin-bottom: 0.6rem;
  }
`;

export const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.75);
  transition: all 0.3s ease;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  text-decoration: none;

  &::before {
    content: "→";
    opacity: 0;
    transform: translateX(-5px);
    transition: all 0.3s ease;
  }

  &:hover {
    color: #667eea;
    transform: translateX(4px);

    &::before {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.9;
  font-weight: 500;
  margin-bottom: 0.8rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const SocialIconsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const SocialIconLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.15),
    rgba(118, 75, 162, 0.15)
  );
  border-radius: 10px;
  color: white;
  border: 1.5px solid rgba(102, 126, 234, 0.4);
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-color: #667eea;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid rgba(102, 126, 234, 0.2);
  padding-top: 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  z-index: 1;

  p {
    margin: 0;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    padding-top: 1.5rem;
    font-size: 0.85rem;
  }
`;
