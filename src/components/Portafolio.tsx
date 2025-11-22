import "./Portafolio.css";
import { useProyectos } from "../store/hooks/usePortfolioSelectors";
import { renderIcon } from "../utils/iconRenderer";

export default function Portafolio() {
  const proyectos = useProyectos();

  return (
    <section className="portafolio">
      <div className="container">
        <div className="portafolio-header">
          <h2 className="section-title">Mi Portafolio</h2>
          <p className="section-subtitle">
            Proyectos de Backend, IA y Soluciones Empresariales
          </p>
        </div>

        <div className="projects-grid">
          {proyectos.map((proyecto) => (
            <div key={proyecto.id} className="project-card">
              <div className="project-icon-float">
                {renderIcon(proyecto.icon)}
              </div>

              <div className="project-content">
                <h3 className="project-title">{proyecto.titulo}</h3>
                <p className="project-description">{proyecto.descripcion}</p>

                <div className="project-technologies">
                  {proyecto.tecnologias.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {proyecto.enlace && (
                  <a
                    href={proyecto.enlace}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Proyecto →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
