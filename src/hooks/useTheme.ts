import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme as toggleThemeAction } from "../store/slices/themeSlice";
import { lightTheme, darkTheme } from "../styles/theme";
import type { RootState } from "../store/store";

export type ThemeMode = "light" | "dark";

export function useTheme() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const toggleTheme = useCallback(() => {
    dispatch(toggleThemeAction());
  }, [dispatch]);

  const theme = themeMode === "light" ? lightTheme : darkTheme;

  return {
    theme,
    themeMode,
    toggleTheme,
    isDark: themeMode === "dark",
    isLight: themeMode === "light",
  };
}
