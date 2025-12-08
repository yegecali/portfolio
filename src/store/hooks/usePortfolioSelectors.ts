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

export const useLoading = () => {
  return useSelector((state: RootState) => state.portfolio.loading);
};

export const useTrayectoria = () => {
  return useSelector((state: RootState) => state.portfolio.trayectoria);
};

export const useColegas = () => {
  return useSelector((state: RootState) => state.portfolio.colegas);
};

export const useCompetenciasITecnicas = () => {
  return useSelector(
    (state: RootState) => state.portfolio.competenciasITecnicas
  );
};

export const useHabilidadesCategorizadas = () => {
  return useSelector(
    (state: RootState) => state.portfolio.habilidadesCategorizadas
  );
};
