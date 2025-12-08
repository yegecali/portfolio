import { useCallback } from "react";
import { clearPersistedState as clearStorage } from "../store/middleware/persistMiddleware";

/**
 * Hook to manage Redux persistence
 * Provides utilities to clear persisted state
 */
export function usePersistence() {
  const clearPersistedState = useCallback(() => {
    clearStorage();
    // Optionally reload the page to reset to initial state
    window.location.reload();
  }, []);

  return {
    clearPersistedState,
  };
}
