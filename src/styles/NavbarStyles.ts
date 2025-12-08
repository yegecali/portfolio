import styled from "styled-components";

export const NavbarContainer = styled.nav`
  background: linear-gradient(135deg, #1a1f3a 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavbarLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-shrink: 0;

  h1 {
    width: 45px;
    height: 45px;
    background: #667eea;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
  }
`;

export const NavMenu = styled.ul<{ $isOpen?: boolean }>`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: linear-gradient(135deg, #1a1f3a 0%, #764ba2 100%);
    gap: 0;
    padding: ${(props) => (props.$isOpen ? "1rem 0" : "0")};
    max-height: ${(props) => (props.$isOpen ? "400px" : "0")};
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
    box-shadow: ${(props) =>
      props.$isOpen ? "0 8px 16px rgba(0, 0, 0, 0.2)" : "none"};
    visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};

    li {
      padding: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

export const NavLink = styled.a<{ $active?: boolean }>`
  color: white;
  background: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
  border: none;
  display: block;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${(props) => (props.$active ? "100%" : "0")};
    height: 2px;
    background: #667eea;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #667eea;

    &::after {
      width: 100%;
    }
  }

  ${(props) =>
    props.$active &&
    `
    color: #667eea;
    
    &::after {
      width: 100%;
    }
  `}

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    font-size: 0.95rem;
    border-radius: 0;

    &::after {
      display: none;
    }

    &:hover {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
    }

    ${(props) =>
      props.$active &&
      `
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
    `}
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
  }
`;
