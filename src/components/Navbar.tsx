import { Link, useLocation } from "react-router-dom";
import {
  NavbarContainer,
  NavbarContent,
  NavbarLogo,
  NavMenu,
  NavLink,
} from "../styles/NavbarStyles";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <NavbarContainer>
      <NavbarContent>
        <NavbarLogo>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <h1>G</h1>
          </Link>
        </NavbarLogo>
        <NavMenu>
          <li>
            <NavLink as={Link} to="/" $active={isActive("/")}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink as={Link} to="/acerca" $active={isActive("/acerca")}>
              Acerca de
            </NavLink>
          </li>
          <li>
            <NavLink
              as={Link}
              to="/portafolio"
              $active={isActive("/portafolio")}
            >
              Portafolio
            </NavLink>
          </li>
          <li>
            <NavLink as={Link} to="/contacto" $active={isActive("/contacto")}>
              Contacto
            </NavLink>
          </li>
        </NavMenu>
      </NavbarContent>
    </NavbarContainer>
  );
}
