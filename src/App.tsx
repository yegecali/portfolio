import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { store } from "./store/store";
import { DataLoaderWrapper } from "./DataLoaderWrapper";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useThemeContext } from "./context/useThemeContext";
import { ThemeProviderComponent } from "./context/ThemeContextProvider";
import { Home, AboutPage, PortfolioPage, ContactPage } from "./pages";
import ThemeToggle from "./components/ThemeToggle";

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
  const { theme } = useThemeContext();

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
      <ThemeProviderComponent>
        <AppWithTheme />
      </ThemeProviderComponent>
    </Provider>
  );
}

export default App;
