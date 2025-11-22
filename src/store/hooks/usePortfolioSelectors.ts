import { useSelector } from "react-redux";
import type { RootState } from "../store";

export const usePortfolio = () => {
  return useSelector((state: RootState) => state.portfolio);
};

export const usePersonalInfo = () => {
  return useSelector((state: RootState) => state.portfolio.personales);
};

export const useProyectos = () => {
  return useSelector((state: RootState) => state.portfolio.proyectos);
};

export const useServicios = () => {
  return useSelector((state: RootState) => state.portfolio.servicios);
};

export const useHabilidades = () => {
  return useSelector((state: RootState) => state.portfolio.habilidades);
};

export const useEstadisticas = () => {
  return useSelector((state: RootState) => state.portfolio.estadisticas);
};
