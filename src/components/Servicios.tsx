import "./Servicios.css";
import { useServicios } from "../store/hooks/usePortfolioSelectors";
import { useLoadPortfolioData } from "../store/hooks/useLoadPortfolioData";
import { renderIcon } from "../utils/iconRenderer";

export default function Servicios() {
  useLoadPortfolioData();
  const servicios = useServicios();

  return (
    <section className="servicios">
      <div className="container">
        <h2 className="section-title">Mis Servicios</h2>
        <p className="section-subtitle">Soluciones Informáticas</p>

        <div className="services-grid">
          {servicios.map((servicio) => (
            <div key={servicio.id} className="service-card">
              <div className="service-icon">{renderIcon(servicio.icon)}</div>
              <h3 className="service-title">{servicio.titulo}</h3>
              <p className="service-description">{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
