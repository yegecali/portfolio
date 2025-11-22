import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loader-text">Cargando datos...</p>
    </div>
  );
}
