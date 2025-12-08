import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

export const Section = styled.section<{ bgColor?: string; padding?: string }>`
  padding: ${(props) => props.padding || "6rem 0"};
  background: ${(props) => props.bgColor || "white"};
  position: relative;
`;

export const SectionHeader = styled.div`
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
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Grid = styled.div<{ columns?: number; gap?: string }>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${(props) => (props.columns ? 100 / props.columns : 320)}px, 1fr)
  );
  gap: ${(props) => props.gap || "2.5rem"};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const Card = styled.div<{ hover?: boolean }>`
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

  ${(props) =>
    props.hover &&
    `
    &:hover {
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
    }

    &::before {
      content: '';
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

    &:hover::before {
      transform: scaleX(1);
    }
  `}
`;

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 1rem 2.5rem;
  border-radius: 10px;
  font-size: 1.05rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${(props) => {
    if (props.variant === "secondary") {
      return `
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
        color: #667eea;
        border: 1.5px solid #667eea;

        &:hover:not(:disabled) {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }
      `;
    }
    return `
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
      }

      &:active:not(:disabled) {
        transform: translateY(0px);
      }

      &:disabled {
        background: #cbd5e0;
        cursor: not-allowed;
        opacity: 0.7;
      }
    `;
  }}
`;

export const Input = styled.input`
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f7fafc;
  color: #1a202c;
  width: 100%;

  &::placeholder {
    color: #a0aec0;
  }

  &.input-error {
    border-color: #ef4444;
    background: rgba(239, 68, 68, 0.05);
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
    background: white;
  }

  &:focus.input-error {
    border-color: #ef4444;
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
  }
`;

export const Textarea = styled.textarea`
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f7fafc;
  color: #1a202c;
  width: 100%;
  resize: vertical;

  &::placeholder {
    color: #a0aec0;
  }

  &.input-error {
    border-color: #ef4444;
    background: rgba(239, 68, 68, 0.05);
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
    background: white;
  }

  &:focus.input-error {
    border-color: #ef4444;
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
  }
`;

export const Badge = styled.span<{ color?: string }>`
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
`;

export const Link = styled.a`
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;

  &::before {
    content: "→";
    opacity: 0;
    transform: translateX(-5px);
    transition: all 0.3s ease;
  }

  &:hover {
    color: #764ba2;
    transform: translateX(4px);

    &::before {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
