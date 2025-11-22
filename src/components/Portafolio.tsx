import "./Portafolio.css";
import { useProyectos } from "../store/hooks/usePortfolioSelectors";
import { useLoadPortfolioData } from "../store/hooks/useLoadPortfolioData";
import { renderIcon } from "../utils/iconRenderer";

export default function Portafolio() {
  useLoadPortfolioData();
  const proyectos = useProyectos();

  return (
    <section className="portafolio">
      <div className="container">
        <h2 className="section-title">Mi Portafolio</h2>
        <p className="section-subtitle">Proyectos y Clientes</p>

        <div className="projects-grid">
          {proyectos.map((proyecto) => (
            <div key={proyecto.id} className="project-card">
              <div className="project-image">
                <span className="project-icon">
                  {renderIcon(proyecto.icon)}
                </span>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
