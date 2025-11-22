import "./Contacto.css";
import { usePersonalInfo } from "../store/hooks/usePortfolioSelectors";
import { FaEnvelope, FaLocationDot, FaLink } from "react-icons/fa6";
import { useFormValidation } from "../hooks/useFormValidation";
import { useToast } from "../hooks/useToast";
import Toast from "./Toast";

export default function Contacto() {
  const personalInfo = usePersonalInfo();
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useFormValidation();
  const { toasts, removeToast, success, error } = useToast();

  const onFormSubmit = handleSubmit(async () => {
    try {
      // Simular envío
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mostrar toast de éxito
      success("¡Correo enviado correctamente!");
    } catch (err) {
      error("Error al enviar el correo. Intenta nuevamente.");
      console.error(err);
    }
  });

  return (
    <section className="contacto">
      <div className="container">
        <div className="portafolio-header">
          <h2 className="section-title">Contacto</h2>
          <p className="section-subtitle">
            ¡Comuniquémonos y hagamos algo increíble!
          </p>
        </div>

        <div className="contacto-content">
          <div className="contacto-info">
            <h3>Información de Contacto</h3>

            <div className="info-item">
              <span className="info-icon">
                <FaEnvelope size={24} />
              </span>
              <div>
                <h4>Email</h4>
                <a href={`mailto:${personalInfo.email}`}>
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">
                <FaLocationDot size={24} />
              </span>
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
              <span className="info-icon">
                <FaLink size={24} />
              </span>
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

          <form className="contacto-form" onSubmit={onFormSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="nombre"
                placeholder="¿Cuál es tu nombre?"
                value={formData.nombre}
                onChange={handleChange}
                className={errors.nombre ? "input-error" : ""}
              />
              {errors.nombre && (
                <span className="error-message">{errors.nombre}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Tu email para contactarte"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="asunto"
                placeholder="Asunto del mensaje"
                value={formData.asunto}
                onChange={handleChange}
                className={errors.asunto ? "input-error" : ""}
              />
              {errors.asunto && (
                <span className="error-message">{errors.asunto}</span>
              )}
            </div>

            <div className="form-group">
              <textarea
                name="mensaje"
                placeholder="Cuéntame qué tienes en mente..."
                rows={6}
                value={formData.mensaje}
                onChange={handleChange}
                className={errors.mensaje ? "input-error" : ""}
              />
              {errors.mensaje && (
                <span className="error-message">{errors.mensaje}</span>
              )}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </form>
        </div>
      </div>

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </section>
  );
}
