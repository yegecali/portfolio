import "./AcercaDe.css";
import {
  usePersonalInfo,
  useTrayectoria,
  useHabilidadesCategorizadas,
} from "../store/hooks/usePortfolioSelectors";

export default function AcercaDe() {
  const personalInfo = usePersonalInfo();
  const trayectoria = useTrayectoria();
  const habilidadesCategorizadas = useHabilidadesCategorizadas();

  return (
    <section className="acerca-de">
      <div className="container">
        <h2 className="section-title">Acerca de Mí</h2>

        {/* Biografía y Trayectoria en 2 Columnas */}
        <div className="bio-trayectoria-container">
          {/* Columna Izquierda: Biografía con Foto */}
          <div className="bio-column">
            <div className="bio-foto">
              <img
                src={personalInfo.imagen}
                alt={`${personalInfo.nombre} ${personalInfo.apellido}`}
                className="bio-image"
              />
            </div>
            <div className="bio-content">
              <h3 className="bio-nombre">
                {personalInfo.nombre} {personalInfo.apellido}
              </h3>
              <p className="bio-profesion">{personalInfo.profesion}</p>
              <p className="bio-texto">{personalInfo.biografia.parrafo1}</p>
              <p className="bio-texto">{personalInfo.biografia.parrafo2}</p>
              <p className="bio-texto">{personalInfo.biografia.parrafo3}</p>
            </div>
          </div>

          {/* Columna Derecha: Trayectoria */}
          <div className="trayectoria-column">
            <h3 className="section-subtitle">Mi Trayectoria Profesional</h3>
            <div className="trayectoria-timeline-vertical">
              {trayectoria.map((item) => (
                <div key={item.id} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4 className="job-title">{item.puesto}</h4>
                    <p className="job-company">{item.empresa}</p>
                    <p className="job-period">{item.periodo}</p>
                    <p className="job-description">{item.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Habilidades Categorizadas */}
        <div className="habilidades-categorizadas-section">
          <h3 className="section-subtitle">Mis Habilidades</h3>
          <div className="habilidades-categorias">
            {habilidadesCategorizadas.map((categoria) => (
              <div key={categoria.id} className="habilidad-categoria">
                <h4 className="categoria-titulo">{categoria.categoria}</h4>
                <div className="skills-tags">
                  {categoria.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
