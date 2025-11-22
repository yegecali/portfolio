import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import portfolioData from "../../data/portfolio.json";

interface PersonalInfo {
  nombre: string;
  apellido: string;
  profesion: string;
  email: string;
  ubicaciones: string[];
  descripcion: string;
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
  enlace: string | null;
}

interface Servicio {
  id: number;
  titulo: string;
  descripcion: string;
  icon: string;
}

interface PortfolioState {
  personales: PersonalInfo;
  proyectos: Proyecto[];
  servicios: Servicio[];
  habilidades: string[];
  estadisticas: {
    proyectosCompletados: number;
    satisfaccionClientes: number;
    aniosExperiencia: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  personales: {
    nombre: "",
    apellido: "",
    profesion: "",
    email: "",
    ubicaciones: [],
    descripcion: "",
    redes: {
      github: "",
      linkedin: "",
      facebook: "",
    },
  },
  proyectos: [],
  servicios: [],
  habilidades: [],
  estadisticas: {
    proyectosCompletados: 0,
    satisfaccionClientes: 0,
    aniosExperiencia: 0,
  },
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
      state.estadisticas = action.payload.estadisticas;
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
