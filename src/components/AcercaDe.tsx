import './AcercaDe.css'

export default function AcercaDe() {
  return (
    <section className="acerca-de">
      <div className="container">
        <h2 className="section-title">Acerca de Mí</h2>
        
        <div className="about-content">
          <div className="about-text">
            <h3>GENDERSON CANCHARI LIZARBE</h3>
            <p className="about-profession">Ingeniero de Sistemas</p>
            
            <div className="about-section">
              <h4>Sobre mí</h4>
              <p>
                Profesional con experiencia en diseño y desarrollo de soluciones informáticas 
                para diversos tipos de negocios. Apasionado por la tecnología y comprometido 
                con la entrega de proyectos de calidad.
              </p>
            </div>

            <div className="about-section">
              <h4>Habilidades Técnicas</h4>
              <ul className="skills-list">
                <li>Desarrollo Web (Frontend y Backend)</li>
                <li>Diseño de Bases de Datos</li>
                <li>Desarrollo Móvil (Android)</li>
                <li>Auditoría de Sistemas</li>
                <li>Análisis y Diseño de Sistemas</li>
              </ul>
            </div>

            <div className="about-section">
              <h4>Ubicación</h4>
              <p>
                📍 Santa Rosa - Ayacucho<br/>
                📍 Huamanga - Ayacucho
              </p>
            </div>
          </div>

          <div className="about-stats">
            <div className="stat">
              <h3>6+</h3>
              <p>Proyectos Completados</p>
            </div>
            <div className="stat">
              <h3>100%</h3>
              <p>Satisfacción de Clientes</p>
            </div>
            <div className="stat">
              <h3>5+</h3>
              <p>Años de Experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
