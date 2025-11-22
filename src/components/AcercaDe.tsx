import "./AcercaDe.css";
import { usePersonalInfo, useHabilidades, useEstadisticas } from "../store/hooks/usePortfolioSelectors";
import { useLoadPortfolioData } from "../store/hooks/useLoadPortfolioData";

export default function AcercaDe() {
  useLoadPortfolioData();
  const personalInfo = usePersonalInfo();
  const habilidades = useHabilidades();
  const estadisticas = useEstadisticas();

  return (
    <section className="acerca-de">
      <div className="container">
        <h2 className="section-title">Acerca de Mí</h2>

        <div className="about-content">
          <div className="about-text">
            <h3>
              {personalInfo.nombre} {personalInfo.apellido}
            </h3>
            <p className="about-profession">{personalInfo.profesion}</p>

            <div className="about-section">
              <h4>Sobre mí</h4>
              <p>
                Profesional con experiencia en diseño y desarrollo de soluciones
                informáticas para diversos tipos de negocios. Apasionado por la
                tecnología y comprometido con la entrega de proyectos de
                calidad.
              </p>
            </div>

            <div className="about-section">
              <h4>Habilidades Técnicas</h4>
              <ul className="skills-list">
                {habilidades.map((habilidad, index) => (
                  <li key={index}>{habilidad}</li>
                ))}
              </ul>
            </div>

            <div className="about-section">
              <h4>Ubicación</h4>
              <p>
                {personalInfo.ubicaciones.map((ubicacion, index) => (
                  <span key={index}>
                    📍 {ubicacion}
                    {index < personalInfo.ubicaciones.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="about-stats">
            <div className="stat">
              <h3>{estadisticas.proyectosCompletados}+</h3>
              <p>Proyectos Completados</p>
            </div>
            <div className="stat">
              <h3>{estadisticas.satisfaccionClientes}%</h3>
              <p>Satisfacción de Clientes</p>
            </div>
            <div className="stat">
              <h3>{estadisticas.aniosExperiencia}+</h3>
              <p>Años de Experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
