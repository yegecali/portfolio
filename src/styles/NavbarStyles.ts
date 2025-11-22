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

export const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    gap: 1rem;
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
    padding: 0.5rem 0.8rem;
    font-size: 0.9rem;
  }
`;
