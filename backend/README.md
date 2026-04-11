# Portfolio Backend API

Backend API para el portfolio personal de Yemi Genderson. Construido con FastAPI, proporciona endpoints para gestionar información personal, experiencia laboral, proyectos, tecnologías y más.

## 🚀 Características

- **Multiidioma**: Soporte completo para Español (es) e Inglés (en)
- **Generación de CV**: Genera PDF del CV en ambos idiomas
- **Base de datos SQLite**: Almacenamiento ligero con SQLAlchemy ORM
- **Auto-seed**: La base de datos se llena automáticamente en el primer inicio
- **Documentación interactiva**: Swagger UI y ReDoc disponibles
- **CORS configurado**: Listo para desarrollo local

## 📋 Requisitos

- Python 3.9+
- pip

## 🛠️ Instalación

1. **Instalar dependencias**:
```bash
cd backend
pip install -r requirements.txt
```

2. **Iniciar el servidor**:
```bash
uvicorn app.main:app --reload --port 8000
```

3. **Acceder a la documentación**:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 📁 Estructura del Proyecto

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # Punto de entrada de la aplicación
│   ├── database.py          # Configuración de la base de datos
│   ├── models.py            # Modelos SQLAlchemy
│   ├── schemas.py           # Schemas Pydantic
│   ├── seed.py              # Datos de prueba iniciales
│   ├── routers/             # Endpoints de la API
│   │   ├── __init__.py
│   │   ├── personal.py      # Información personal
│   │   ├── experiences.py   # Experiencia laboral
│   │   ├── projects.py      # Proyectos
│   │   ├── technologies.py  # Tecnologías/Skills
│   │   ├── portfolio.py     # Endpoint agregado + Hero + About
│   │   └── cv.py            # Generación de CV en PDF
│   ├── services/
│   │   └── cv_generator.py  # Servicio de generación de PDF
│   └── utils/               # Utilidades compartidas
│       ├── __init__.py
│       ├── constants.py     # Constantes globales
│       ├── validators.py    # Validadores de entrada
│       └── crud.py          # Operaciones CRUD reutilizables
├── portfolio.db             # Base de datos SQLite (generada automáticamente)
└── requirements.txt
```

## 🔌 API Endpoints

### Health Check

#### `GET /api/health`
Verifica el estado de la API.

**Respuesta**:
```json
{
  "status": "ok",
  "version": "1.0.0"
}
```

---

### Portfolio Completo

#### `GET /api/portfolio/{lang}`
Obtiene todos los datos del portfolio en un solo request (optimizado para el frontend).

**Parámetros**:
- `lang` (path): Idioma (`es` o `en`)

**Respuesta de ejemplo**:
```json
{
  "lang": "es",
  "personal": {
    "id": 1,
    "name": "Yemi Genderson",
    "role": "Full Stack Developer",
    "email": "yemi@example.com",
    "phone": "+1234567890",
    "location": "Madrid, España",
    "cv_url": "https://example.com/cv",
    "hero_image": "https://example.com/photo.jpg",
    "github_url": "https://github.com/yegecali",
    "linkedin_url": "https://linkedin.com/in/yemi",
    "whatsapp_url": "https://wa.me/1234567890",
    "instagram_url": "https://instagram.com/yemi"
  },
  "hero": {
    "lang": "es",
    "badge": "Disponible para nuevos proyectos",
    "title": "Desarrollador Full Stack",
    "description": "Creando soluciones web innovadoras",
    "location": "Madrid, España",
    "status": "Abierto a oportunidades"
  },
  "about": {
    "lang": "es",
    "paragraphs": [
      "Soy un desarrollador apasionado por crear experiencias web excepcionales.",
      "Con más de 5 años de experiencia en desarrollo full stack."
    ],
    "closing": "¡Trabajemos juntos en tu próximo proyecto!"
  },
  "nav": [
    {
      "label": "Sobre mí",
      "href": "#about"
    },
    {
      "label": "Experiencia",
      "href": "#experience"
    },
    {
      "label": "Proyectos",
      "href": "#projects"
    }
  ],
  "experiences": [
    {
      "id": 1,
      "company": "Tech Company",
      "logo_alt": "Tech Company Logo",
      "position": "Senior Full Stack Developer",
      "start_date": "2020-01",
      "end_date": "2023-12",
      "currently_work_here": false,
      "summary": [
        "Lideré el desarrollo de una plataforma web con React y Node.js",
        "Implementé arquitectura de microservicios con Docker y Kubernetes",
        "Mejoré el rendimiento de la aplicación en un 40%"
      ],
      "order": 0
    }
  ],
  "projects": [
    {
      "id": 1,
      "name": "E-commerce Platform",
      "url": "https://github.com/user/project",
      "technologies": ["React", "Node.js", "MongoDB", "Docker"],
      "description": "Plataforma de comercio electrónico completa con carrito de compras y pasarela de pago",
      "order": 0
    }
  ],
  "technologies": [
    {
      "id": 1,
      "label": "React",
      "url": "https://reactjs.org",
      "icon_name": "react",
      "category": "Frontend",
      "order": 0
    },
    {
      "id": 2,
      "label": "Node.js",
      "url": "https://nodejs.org",
      "icon_name": "nodejs",
      "category": "Backend",
      "order": 0
    }
  ],
  "spoken_languages": [
    {
      "id": 1,
      "name": "Español",
      "flag": "🇪🇸",
      "level": "Nativo",
      "proficiency": 100,
      "order": 0
    },
    {
      "id": 2,
      "name": "Inglés",
      "flag": "🇬🇧",
      "level": "Avanzado",
      "proficiency": 90,
      "order": 1
    }
  ]
}
```

---

### Información Personal

#### `GET /api/personal`
Obtiene la información personal del portfolio.

**Respuesta**:
```json
{
  "id": 1,
  "name": "Yemi Genderson",
  "role": "Full Stack Developer",
  "email": "yemi@example.com",
  "phone": "+1234567890",
  "location": "Madrid, España",
  "cv_url": "https://example.com/cv",
  "hero_image": "https://example.com/photo.jpg",
  "github_url": "https://github.com/yegecali",
  "linkedin_url": "https://linkedin.com/in/yemi",
  "whatsapp_url": "https://wa.me/1234567890",
  "instagram_url": "https://instagram.com/yemi"
}
```

#### `PUT /api/personal`
Actualiza la información personal (actualización parcial).

**Request body**:
```json
{
  "name": "Yemi Genderson",
  "email": "newemail@example.com",
  "phone": "+9876543210"
}
```

---

### Hero Section

#### `GET /api/hero/{lang}`
Obtiene la sección hero para el idioma especificado.

**Respuesta**:
```json
{
  "lang": "es",
  "badge": "Disponible para nuevos proyectos",
  "title": "Desarrollador Full Stack",
  "description": "Creando soluciones web innovadoras",
  "location": "Madrid, España",
  "status": "Abierto a oportunidades"
}
```

#### `PUT /api/hero/{lang}`
Actualiza la sección hero para el idioma especificado.

**Request body**:
```json
{
  "badge": "Disponible ahora",
  "title": "Senior Full Stack Developer",
  "description": "Experto en React y Node.js"
}
```

---

### About Section

#### `GET /api/about/{lang}`
Obtiene la sección "Sobre mí" para el idioma especificado.

**Respuesta**:
```json
{
  "lang": "es",
  "paragraphs": [
    "Soy un desarrollador apasionado por crear experiencias web excepcionales.",
    "Con más de 5 años de experiencia en desarrollo full stack."
  ],
  "closing": "¡Trabajemos juntos en tu próximo proyecto!"
}
```

#### `PUT /api/about/{lang}`
Actualiza la sección "Sobre mí" para el idioma especificado.

**Request body**:
```json
{
  "paragraphs": [
    "Nuevo párrafo 1",
    "Nuevo párrafo 2"
  ],
  "closing": "Nuevo texto de cierre"
}
```

---

### Experiencia Laboral

#### `GET /api/experiences?lang={lang}`
Lista todas las experiencias laborales en el idioma especificado.

**Parámetros**:
- `lang` (query, opcional): Idioma (`es` o `en`, por defecto: `es`)

**Respuesta**:
```json
[
  {
    "id": 1,
    "company": "Tech Company",
    "logo_alt": "Tech Company Logo",
    "position": "Senior Full Stack Developer",
    "start_date": "2020-01",
    "end_date": "2023-12",
    "currently_work_here": false,
    "summary": [
      "Lideré el desarrollo de una plataforma web con React y Node.js",
      "Implementé arquitectura de microservicios con Docker y Kubernetes",
      "Mejoré el rendimiento de la aplicación en un 40%"
    ],
    "order": 0
  },
  {
    "id": 2,
    "company": "Startup Inc",
    "logo_alt": "Startup Inc Logo",
    "position": "Full Stack Developer",
    "start_date": "2024-01",
    "end_date": null,
    "currently_work_here": true,
    "summary": [
      "Desarrollo de nuevas funcionalidades",
      "Optimización de rendimiento"
    ],
    "order": 1
  }
]
```

#### `GET /api/experiences/{exp_id}?lang={lang}`
Obtiene una experiencia laboral específica por ID.

#### `PUT /api/experiences/{exp_id}?lang={lang}`
Actualiza campos no traducibles de una experiencia (empresa, fechas, orden).

**Request body**:
```json
{
  "company": "New Company Name",
  "start_date": "2020-01",
  "end_date": "2023-12",
  "currently_work_here": false,
  "order": 0
}
```

#### `PUT /api/experiences/{exp_id}/translation/{lang}`
Actualiza la traducción (posición y resumen) de una experiencia.

**Request body**:
```json
{
  "position": "Senior Full Stack Developer",
  "summary": [
    "Punto 1 del resumen",
    "Punto 2 del resumen",
    "Punto 3 del resumen"
  ]
}
```

---

### Proyectos

#### `GET /api/projects?lang={lang}`
Lista todos los proyectos en el idioma especificado.

**Respuesta**:
```json
[
  {
    "id": 1,
    "name": "E-commerce Platform",
    "url": "https://github.com/user/project",
    "technologies": ["React", "Node.js", "MongoDB", "Docker"],
    "description": "Plataforma de comercio electrónico completa con carrito de compras y pasarela de pago",
    "order": 0
  },
  {
    "id": 2,
    "name": "Task Manager App",
    "url": "https://github.com/user/task-manager",
    "technologies": ["Vue.js", "Firebase", "Tailwind CSS"],
    "description": "Aplicación de gestión de tareas con sincronización en tiempo real",
    "order": 1
  }
]
```

#### `GET /api/projects/{project_id}?lang={lang}`
Obtiene un proyecto específico por ID.

#### `PUT /api/projects/{project_id}?lang={lang}`
Actualiza campos no traducibles de un proyecto.

**Request body**:
```json
{
  "name": "New Project Name",
  "url": "https://github.com/user/new-project",
  "technologies": ["React", "TypeScript", "GraphQL"],
  "order": 0
}
```

#### `PUT /api/projects/{project_id}/translation/{lang}`
Actualiza la descripción traducida de un proyecto.

**Request body**:
```json
{
  "description": "Nueva descripción del proyecto en español"
}
```

---

### Tecnologías / Skills

#### `GET /api/technologies?category={category}`
Lista todas las tecnologías, opcionalmente filtradas por categoría.

**Parámetros**:
- `category` (query, opcional): Categoría (`Frontend`, `Backend`, `Databases`, `DevOps`)

**Respuesta**:
```json
[
  {
    "id": 1,
    "label": "React",
    "url": "https://reactjs.org",
    "icon_name": "react",
    "category": "Frontend",
    "order": 0
  },
  {
    "id": 2,
    "label": "Node.js",
    "url": "https://nodejs.org",
    "icon_name": "nodejs",
    "category": "Backend",
    "order": 0
  },
  {
    "id": 3,
    "label": "MongoDB",
    "url": "https://mongodb.com",
    "icon_name": "mongodb",
    "category": "Databases",
    "order": 0
  },
  {
    "id": 4,
    "label": "Docker",
    "url": "https://docker.com",
    "icon_name": "docker",
    "category": "DevOps",
    "order": 0
  }
]
```

#### `GET /api/technologies/{tech_id}`
Obtiene una tecnología específica por ID.

#### `PUT /api/technologies/{tech_id}`
Actualiza una tecnología.

**Request body**:
```json
{
  "label": "React 18",
  "url": "https://reactjs.org",
  "icon_name": "react",
  "category": "Frontend",
  "order": 0
}
```

---

### Generación de CV

#### `GET /api/cv/{lang}`
Genera y descarga un CV en formato PDF en el idioma especificado.

**Parámetros**:
- `lang` (path): Idioma (`es` o `en`)

**Respuesta**: Archivo PDF descargable

**Nombre del archivo**: `cv-yemi-genderson-es.pdf` o `cv-yemi-genderson-en.pdf`

**Contenido del PDF**:
- Encabezado con nombre, rol e información de contacto
- Sección "Sobre mí"
- Experiencia laboral con puntos destacados
- Proyectos destacados
- Habilidades técnicas por categoría
- Idiomas hablados con barras de competencia

---

### Seed Database

#### `POST /api/seed`
Llena (o rellena) la base de datos con datos de ejemplo.

**⚠️ ADVERTENCIA**: Este endpoint elimina todos los datos existentes antes de insertar nuevos datos.

**Respuesta**:
```json
{
  "message": "Database seeded successfully."
}
```

---

## 🔧 Utilidades del Backend

### Módulo de Constantes (`utils/constants.py`)
Define constantes globales:
- `SUPPORTED_LANGS`: Idiomas soportados (`{"es", "en"}`)
- `TECHNOLOGY_CATEGORIES`: Categorías de tecnologías (`{"Frontend", "Backend", "Databases", "DevOps"}`)

### Módulo de Validadores (`utils/validators.py`)
Funciones de validación reutilizables:
- `validate_language(lang)`: Valida que el idioma esté soportado
- `validate_category(category)`: Valida que la categoría sea válida

### Módulo CRUD (`utils/crud.py`)
Operaciones de base de datos reutilizables:
- `get_or_404(db, model, entity_id, error_message)`: Obtiene una entidad por ID o devuelve 404
- `get_first_or_404(db, model, filters, error_message)`: Obtiene la primera entidad que coincida con los filtros
- `update_entity(entity, payload, db)`: Actualiza una entidad con datos de un schema Pydantic

Estas utilidades eliminan código duplicado y mejoran la mantenibilidad del código.

---

## 🗄️ Modelo de Datos

### Tablas Principales

1. **personal_info**: Información de contacto y enlaces sociales (1 registro)
2. **hero_translations**: Sección hero traducida (2 registros: es/en)
3. **about_paragraphs**: Párrafos de la sección "Sobre mí" (múltiples por idioma)
4. **about_closing**: Texto de cierre de la sección "Sobre mí" (2 registros: es/en)
5. **experiences**: Experiencias laborales (parte no traducible)
6. **experience_positions**: Títulos de trabajo traducidos
7. **experience_summaries**: Puntos de resumen traducidos
8. **projects**: Proyectos (parte no traducible)
9. **project_translations**: Descripciones de proyectos traducidas
10. **technologies**: Tecnologías/habilidades técnicas
11. **spoken_languages**: Idiomas hablados
12. **nav_links**: Enlaces de navegación traducidos

---

## 🧪 Testing

Para probar los endpoints:

1. **Usando la documentación interactiva**:
   - Visita http://localhost:8000/docs
   - Prueba cada endpoint directamente desde el navegador

2. **Usando curl**:
```bash
# Health check
curl http://localhost:8000/api/health

# Obtener portfolio completo en español
curl http://localhost:8000/api/portfolio/es

# Obtener experiencias en inglés
curl http://localhost:8000/api/experiences?lang=en

# Descargar CV en español
curl -O -J http://localhost:8000/api/cv/es
```

3. **Usando herramientas como Postman o Insomnia**:
   - Importa la colección desde la documentación OpenAPI

---

## 🌐 CORS

La API está configurada para aceptar requests desde:
- http://localhost:5173 (Vite dev server)
- http://127.0.0.1:5173
- http://localhost:3000

Para producción, actualiza la configuración en `main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tu-dominio.com"],
    ...
)
```

---

## 📝 Notas de Desarrollo

- **Auto-seed**: La base de datos se llena automáticamente al iniciar si está vacía
- **SQLite WAL mode**: Habilitado para mejor rendimiento en lectura concurrente
- **Foreign keys**: Habilitadas para mantener integridad referencial
- **Cascade delete**: Las traducciones se eliminan automáticamente con sus entidades padre

---

## 🚀 Próximos Pasos / Mejoras Futuras

- [ ] Agregar autenticación (JWT) para endpoints de actualización
- [ ] Implementar paginación para listas grandes
- [ ] Agregar búsqueda y filtros avanzados
- [ ] Implementar caché (Redis) para endpoints de lectura
- [ ] Agregar tests unitarios y de integración
- [ ] Configurar CI/CD
- [ ] Migrar a PostgreSQL para producción
- [ ] Agregar logging estructurado
- [ ] Implementar rate limiting
- [ ] Agregar métricas y monitoreo

---

## 📄 Licencia

Este proyecto es parte del portfolio personal de Yemi Genderson.

---

## 👨‍💻 Autor

**Yemi Genderson**
- GitHub: [@yegecali](https://github.com/yegecali)

---

## 🤝 Contribuciones

Este es un proyecto personal, pero las sugerencias y feedback son bienvenidos. Puedes abrir un issue en el repositorio.
