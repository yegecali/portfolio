import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h1>G</h1>
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/" className={`nav-link ${isActive("/")}`}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/acerca" className={`nav-link ${isActive("/acerca")}`}>
              Acerca de
            </Link>
          </li>
          <li>
            <Link
              to="/portafolio"
              className={`nav-link ${isActive("/portafolio")}`}
            >
              Portafolio
            </Link>
          </li>
          <li>
            <Link
              to="/contacto"
              className={`nav-link ${isActive("/contacto")}`}
            >
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
