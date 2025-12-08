import type { Middleware } from "@reduxjs/toolkit";

const STORAGE_KEY = "portfolio-redux-state";

/**
 * Middleware to persist Redux state to localStorage
 * Saves the entire state after every action
 */
export const persistMiddleware: Middleware = (store) => (next) => (action) => {
  // Continue with the action
  const result = next(action);

  // Save state to localStorage after action is processed
  try {
    const state = store.getState();
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
    console.log("💾 Redux state persisted to localStorage");
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
  }

  return result;
};

/**
 * Load persisted state from localStorage
 * Returns the saved state or undefined if nothing was saved
 */
export function loadPersistedState(): Record<string, unknown> | undefined {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState) as Record<string, unknown>;
    console.log("📂 Redux state restored from localStorage");
    return state;
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
    return undefined;
  }
}

/**
 * Clear persisted state from localStorage
 */
export function clearPersistedState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log("🗑️ Redux state cleared from localStorage");
  } catch (error) {
    console.error("Failed to clear state from localStorage:", error);
  }
}
