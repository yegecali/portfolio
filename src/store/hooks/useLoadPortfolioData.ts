import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadPortfolioData,
  loadPortfolioDataSuccess,
  loadPortfolioDataError,
} from "../slices/portfolioSlice";
import portfolioData from "../../data/portfolio.json";
import type { AppDispatch, RootState } from "../store";

export const useLoadPortfolioData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const personales = useSelector(
    (state: RootState) => state.portfolio.personales
  );
  const hasData = personales.nombre !== "";

  const loadData = useCallback(async () => {
    // Solo cargar si no tenemos datos aún
    if (hasData) return;

    try {
      dispatch(loadPortfolioData());
      // Simular pequeño delay para cargar datos
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(loadPortfolioDataSuccess(portfolioData));
    } catch (error) {
      dispatch(
        loadPortfolioDataError(
          error instanceof Error ? error.message : "Error al cargar los datos"
        )
      );
    }
  }, [dispatch, hasData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return loadData;
};
