import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h2 className="hero-subtitle">Hola, soy</h2>
          <h1 className="hero-title">GENDERSON CANCHARI</h1>
          <p className="hero-profession">Ingeniero de Sistemas</p>
          <p className="hero-description">
            Soluciones informáticas para negocios. Diseño y desarrollo web. 
            Sistemas de información. Auditoría de sistemas.
          </p>
          <div className="hero-socials">
            <a href="https://github.com/yegecali" target="_blank" rel="noopener noreferrer" title="GitHub">
              <i className="icon">📱</i>
            </a>
            <a href="https://linkedin.com/in/yemi-genderson-canchari-lizarbe-90bb98127/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <i className="icon">💼</i>
            </a>
            <a href="https://facebook.com/yemigenderson.cancharilizarbe" target="_blank" rel="noopener noreferrer" title="Facebook">
              <i className="icon">👤</i>
            </a>
            <a href="mailto:yegecali2@gmail.com" title="Email">
              <i className="icon">📧</i>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
