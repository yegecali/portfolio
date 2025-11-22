import { useLoading } from "./store/hooks/usePortfolioSelectors";
import { useLoadPortfolioData } from "./store/hooks/useLoadPortfolioData";
import Loader from "./components/Loader";
import type { ReactNode } from "react";

interface DataLoaderWrapperProps {
  children: ReactNode;
}

export function DataLoaderWrapper({ children }: DataLoaderWrapperProps) {
  useLoadPortfolioData();
  const isLoading = useLoading();

  // Mostrar loader solo si está cargando
  if (isLoading) {
    return <Loader />;
  }

  return children;
}
