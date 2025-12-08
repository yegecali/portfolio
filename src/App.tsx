import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { store } from "./store/store";
import { DataLoaderWrapper } from "./DataLoaderWrapper";
import { GlobalStyles } from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/theme";
import { Home, AboutPage, PortfolioPage, ContactPage } from "./pages";
import ThemeToggle from "./components/ThemeToggle";
import type { RootState } from "./store/store";

function AppContent() {
  return (
    <DataLoaderWrapper>
      <Router basename="/portfolio/">
        <Routes>
          {/* Home page with full Hero section */}
          <Route path="/" element={<Home />} />

          {/* Other pages with MainLayout (includes Navbar and Footer) */}
          <Route path="/acerca" element={<AboutPage />} />
          <Route path="/portafolio" element={<PortfolioPage />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
        <ThemeToggle />
      </Router>
    </DataLoaderWrapper>
  );
}

function AppWithTheme() {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <ThemeProvider theme={theme as any}>
        <GlobalStyles />
        <AppContent />
      </ThemeProvider>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppWithTheme />
    </Provider>
  );
}

export default App;
