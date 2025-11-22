import "./Hero.css";
import { usePersonalInfo } from "../store/hooks/usePortfolioSelectors";
import {
  FaGithub,
  FaLinkedinIn,
  FaFacebook,
  FaEnvelope,
  FaPhone,
  FaJava,
  FaDatabase,
} from "react-icons/fa6";
import { SiQuarkus, SiApachekafka } from "react-icons/si";

export default function Hero() {
  const personalInfo = usePersonalInfo();

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-text">
            <h2 className="hero-subtitle">Hola, soy</h2>
            <h1 className="hero-title">
              {personalInfo.nombre} {personalInfo.apellido}
            </h1>
            <p className="hero-profession">{personalInfo.profesion}</p>
            <p className="hero-description">{personalInfo.descripcion}</p>
            <p className="hero-description-long">
              {personalInfo.descripcionLarga}
            </p>

            <div className="hero-contact-info">
              <div className="contact-item">
                <FaEnvelope size={18} />
                <a href={`mailto:${personalInfo.email}`}>
                  {personalInfo.email}
                </a>
              </div>
              <div className="contact-item">
                <FaPhone size={18} />
                <span>{personalInfo.telefono}</span>
              </div>
            </div>

            <div className="hero-socials">
              <a
                href={personalInfo.redes.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="social-btn"
              >
                <FaGithub size={20} />
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.redes.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="social-btn"
              >
                <FaLinkedinIn size={20} />
                <span>LinkedIn</span>
              </a>
              <a
                href={personalInfo.redes.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="social-btn"
              >
                <FaFacebook size={20} />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-container">
            <img
              src={personalInfo.imagen}
              alt={`${personalInfo.nombre} ${personalInfo.apellido}`}
              className="hero-image"
            />
            <div className="image-blur"></div>

            {/* Tech stack floating icons */}
            <div className="tech-icon tech-icon-1">
              <FaJava size={32} />
            </div>
            <div className="tech-icon tech-icon-2">
              <SiQuarkus size={32} />
            </div>
            <div className="tech-icon tech-icon-3">
              <SiApachekafka size={32} />
            </div>
            <div className="tech-icon tech-icon-4">
              <FaDatabase size={32} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
