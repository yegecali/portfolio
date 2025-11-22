import './Servicios.css'

interface Servicio {
  id: number
  titulo: string
  descripcion: string
  icono: string
}

const servicios: Servicio[] = [
  {
    id: 1,
    titulo: 'Diseño Web',
    descripcion: 'Diseño moderno y responsivo para tu presencia en línea',
    icono: '🎨',
  },
  {
    id: 2,
    titulo: 'Desarrollo Web',
    descripcion: 'Aplicaciones web robustas y escalables con las últimas tecnologías',
    icono: '💻',
  },
  {
    id: 3,
    titulo: 'Bases de Datos',
    descripcion: 'Diseño e implementación de sistemas de almacenamiento de datos',
    icono: '🗄️',
  },
  {
    id: 4,
    titulo: 'Sistemas de Información',
    descripcion: 'Soluciones integrales de sistemas para tu negocio',
    icono: '📊',
  },
  {
    id: 5,
    titulo: 'Auditoría de Sistemas',
    descripcion: 'Evaluación y optimización de tus sistemas informáticos',
    icono: '🔍',
  },
  {
    id: 6,
    titulo: 'Consultoría TI',
    descripcion: 'Asesoramiento profesional en tecnología e información',
    icono: '🤝',
  },
]

export default function Servicios() {
  return (
    <section className="servicios">
      <div className="container">
        <h2 className="section-title">Mis Servicios</h2>
        <p className="section-subtitle">Soluciones Informáticas</p>
        
        <div className="services-grid">
          {servicios.map((servicio) => (
            <div key={servicio.id} className="service-card">
              <div className="service-icon">{servicio.icono}</div>
              <h3 className="service-title">{servicio.titulo}</h3>
              <p className="service-description">{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
