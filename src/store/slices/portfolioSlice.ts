import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import portfolioData from "../../data/portfolio.json";

interface PersonalInfo {
  nombre: string;
  apellido: string;
  profesion: string;
  email: string;
  telefono: string;
  ubicaciones: string[];
  descripcion: string;
  descripcionLarga: string;
  biografia: {
    parrafo1: string;
    parrafo2: string;
    parrafo3: string;
  };
  imagen: string;
  redes: {
    github: string;
    linkedin: string;
    facebook: string;
  };
}

interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  icon: string;
  imagen?: string;
  enlace: string | null;
}

interface Servicio {
  id: number;
  titulo: string;
  descripcion: string;
  icon: string;
}

interface Trayectoria {
  id: number;
  empresa: string;
  puesto: string;
  periodo: string;
  descripcion: string;
}

interface Colega {
  id: number;
  nombre: string;
  puesto: string;
  especialidad: string;
  enlace: string;
}

interface Competencia {
  id: number;
  nombre: string;
  nivel: string;
  icono: string;
}

interface HabilidadCategorizada {
  id: number;
  categoria: string;
  skills: string[];
}

interface PortfolioState {
  personales: PersonalInfo;
  proyectos: Proyecto[];
  servicios: Servicio[];
  habilidades: string[];
  habilidadesCategorizadas: HabilidadCategorizada[];
  estadisticas: {
    proyectosCompletados: number;
    satisfaccionClientes: number;
    aniosExperiencia: number;
  };
  trayectoria: Trayectoria[];
  colegas: Colega[];
  competenciasITecnicas: Competencia[];
  loading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  personales: {
    nombre: "",
    apellido: "",
    profesion: "",
    email: "",
    telefono: "",
    ubicaciones: [],
    descripcion: "",
    descripcionLarga: "",
    biografia: {
      parrafo1: "",
      parrafo2: "",
      parrafo3: "",
    },
    imagen: "",
    redes: {
      github: "",
      linkedin: "",
      facebook: "",
    },
  },
  proyectos: [],
  servicios: [],
  habilidades: [],
  habilidadesCategorizadas: [],
  estadisticas: {
    proyectosCompletados: 0,
    satisfaccionClientes: 0,
    aniosExperiencia: 0,
  },
  trayectoria: [],
  colegas: [],
  competenciasITecnicas: [],
  loading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    loadPortfolioData: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadPortfolioDataSuccess: (
      state,
      action: PayloadAction<typeof portfolioData>
    ) => {
      state.personales = action.payload.personales;
      state.proyectos = action.payload.proyectos;
      state.servicios = action.payload.servicios;
      state.habilidades = action.payload.habilidades;
      state.habilidadesCategorizadas = action.payload.habilidadesCategorizadas;
      state.estadisticas = action.payload.estadisticas;
      state.trayectoria = action.payload.trayectoria;
      state.colegas = action.payload.colegas;
      state.competenciasITecnicas = action.payload.competenciasITecnicas;
      state.loading = false;
    },
    loadPortfolioDataError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loadPortfolioData,
  loadPortfolioDataSuccess,
  loadPortfolioDataError,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
