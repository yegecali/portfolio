import { useState } from "react";
import "./Contacto.css";
import { usePersonalInfo } from "../store/hooks/usePortfolioSelectors";
import { useLoadPortfolioData } from "../store/hooks/useLoadPortfolioData";

export default function Contacto() {
  useLoadPortfolioData();
  const personalInfo = usePersonalInfo();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formData.asunto
    )}&body=${encodeURIComponent(formData.mensaje)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section className="contacto">
      <div className="container">
        <h2 className="section-title">Contacto</h2>
        <p className="section-subtitle">¡Comuniquémonos!</p>

        <div className="contacto-content">
          <div className="contacto-info">
            <h3>Información de Contacto</h3>

            <div className="info-item">
              <span className="info-icon">📧</span>
              <div>
                <h4>Email</h4>
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <h4>Ubicación</h4>
                <p>
                  {personalInfo.ubicaciones.map((ubicacion, index) => (
                    <span key={index}>
                      {ubicacion}
                      {index < personalInfo.ubicaciones.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">🔗</span>
              <div>
                <h4>Redes Sociales</h4>
                <div className="social-links">
                  <a
                    href={personalInfo.redes.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    href={personalInfo.redes.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={personalInfo.redes.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          <form className="contacto-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="nombre"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Tu email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="asunto"
                placeholder="Asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="mensaje"
                placeholder="Tu mensaje"
                rows={6}
                value={formData.mensaje}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
