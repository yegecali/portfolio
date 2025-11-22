import "./Hero.css";
import { usePersonalInfo } from "../store/hooks/usePortfolioSelectors";
import { useLoadPortfolioData } from "../store/hooks/useLoadPortfolioData";
import { FaGithub, FaLinkedinIn, FaFacebook, FaEnvelope } from "react-icons/fa6";

export default function Hero() {
  useLoadPortfolioData();
  const personalInfo = usePersonalInfo();

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h2 className="hero-subtitle">Hola, soy</h2>
          <h1 className="hero-title">
            {personalInfo.nombre} {personalInfo.apellido}
          </h1>
          <p className="hero-profession">{personalInfo.profesion}</p>
          <p className="hero-description">{personalInfo.descripcion}</p>
          <div className="hero-socials">
            <a
              href={personalInfo.redes.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a
              href={personalInfo.redes.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <FaLinkedinIn size={24} />
            </a>
            <a
              href={personalInfo.redes.facebook}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
            >
              <FaFacebook size={24} />
            </a>
            <a href={`mailto:${personalInfo.email}`} title="Email">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
