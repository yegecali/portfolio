import './Portafolio.css'

interface Proyecto {
  id: number
  titulo: string
  descripcion: string
  tecnologias: string[]
  imagen: string
  enlace?: string
}

const proyectos: Proyecto[] = [
  {
    id: 1,
    titulo: 'Sistema de Botica',
    descripcion: 'Administrar los productos de una botica, administración de citas, etc',
    tecnologias: ['Diseño', 'Desarrollo Web', 'Bases de Datos'],
    imagen: '🏥',
  },
  {
    id: 2,
    titulo: 'Sistema de Almacén',
    descripcion: 'Administrar los productos de una tienda de abarrotes, stock, compras y ventas',
    tecnologias: ['Diseño', 'Desarrollo Web', 'Bases de Datos', 'Android'],
    imagen: '📦',
  },
  {
    id: 3,
    titulo: 'Sistema de Trámite',
    descripcion: 'Administrar los documentos de una organización',
    tecnologias: ['Diseño', 'Desarrollo Web', 'Bases de Datos'],
    imagen: '📋',
  },
  {
    id: 4,
    titulo: 'Ecommerce Vraem',
    descripcion: 'Compra y venta de bienes',
    tecnologias: ['Diseño', 'Desarrollo Web', 'Bases de Datos'],
    imagen: '🛒',
  },
  {
    id: 5,
    titulo: 'Sistema de Seguridad',
    descripcion: 'Administrar los delitos ocurridos en un lugar, y notificar a los efectivos policiales',
    tecnologias: ['Diseño', 'Desarrollo Web', 'Bases de Datos'],
    imagen: '🔒',
  },
  {
    id: 6,
    titulo: 'Portafolios',
    descripcion: 'Portafolio profesional de una persona',
    tecnologias: ['Diseño', 'Desarrollo Web', 'Bases de Datos'],
    imagen: '💼',
  },
]

export default function Portafolio() {
  return (
    <section className="portafolio">
      <div className="container">
        <h2 className="section-title">Mi Portafolio</h2>
        <p className="section-subtitle">Proyectos y Clientes</p>
        
        <div className="projects-grid">
          {proyectos.map((proyecto) => (
            <div key={proyecto.id} className="project-card">
              <div className="project-image">
                <span className="project-emoji">{proyecto.imagen}</span>
              </div>
              <div className="project-content">
                <h3 className="project-title">{proyecto.titulo}</h3>
                <p className="project-description">{proyecto.descripcion}</p>
                <div className="project-technologies">
                  {proyecto.tecnologias.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
