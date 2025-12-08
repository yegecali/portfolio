import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import {
  NavbarContainer,
  NavbarContent,
  NavbarLogo,
  NavMenu,
  NavLink,
  HamburgerButton,
} from "../styles/NavbarStyles";

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <NavbarContainer>
      <NavbarContent>
        <NavbarLogo>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <h1>G</h1>
          </Link>
        </NavbarLogo>
        <NavMenu $isOpen={isMenuOpen}>
          <li>
            <NavLink
              as={Link}
              to="/"
              $active={isActive("/")}
              onClick={handleLinkClick}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              as={Link}
              to="/acerca"
              $active={isActive("/acerca")}
              onClick={handleLinkClick}
            >
              Acerca de
            </NavLink>
          </li>
          <li>
            <NavLink
              as={Link}
              to="/portafolio"
              $active={isActive("/portafolio")}
              onClick={handleLinkClick}
            >
              Portafolio
            </NavLink>
          </li>
          <li>
            <NavLink
              as={Link}
              to="/contacto"
              $active={isActive("/contacto")}
              onClick={handleLinkClick}
            >
              Contacto
            </NavLink>
          </li>
        </NavMenu>
        <HamburgerButton
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          title={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <FaXmark /> : <FaBars />}
        </HamburgerButton>
      </NavbarContent>
    </NavbarContainer>
  );
}
