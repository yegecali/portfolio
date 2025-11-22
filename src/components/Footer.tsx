import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Navegación</h4>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/acerca">Acerca de</Link></li>
              <li><Link to="/portafolio">Portafolio</Link></li>
              <li><Link to="/servicios">Servicios</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contacto</h4>
            <p>📧 yegecali2@gmail.com</p>
            <p>📍 Ayacucho, Perú</p>
          </div>

          <div className="footer-section">
            <h4>Redes Sociales</h4>
            <div className="social-icons">
              <a href="https://github.com/yegecali" target="_blank" rel="noopener noreferrer" title="GitHub">GitHub</a>
              <a href="https://linkedin.com/in/yemi-genderson-canchari-lizarbe-90bb98127/" target="_blank" rel="noopener noreferrer" title="LinkedIn">LinkedIn</a>
              <a href="https://facebook.com/yemigenderson.cancharilizarbe" target="_blank" rel="noopener noreferrer" title="Facebook">Facebook</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Todos los derechos reservados por Ing. Genderson Canchari Lizarbe</p>
        </div>
      </div>
    </footer>
  )
}
