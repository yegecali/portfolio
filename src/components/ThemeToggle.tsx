import styled from "styled-components";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useTheme } from "../hooks/useTheme";

const ToggleButton = styled.button`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.secondary}
  );
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  transition: all ${(props) => props.theme.transitions.base};
  box-shadow: ${(props) => props.theme.shadows.md};
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;

  &:hover {
    transform: scale(1.1);
    box-shadow: ${(props) => props.theme.shadows.lg};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
    bottom: 1.5rem;
    right: 1.5rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
    bottom: 1rem;
    right: 1rem;
  }
`;

export default function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <ToggleButton
      onClick={toggleTheme}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
}
