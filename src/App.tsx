import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { store } from "./store/store";
import { DataLoaderWrapper } from "./DataLoaderWrapper";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useThemeContext } from "./context/useThemeContext";
import { ThemeProviderComponent } from "./context/ThemeContextProvider";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Portafolio from "./components/Portafolio";
import AcercaDe from "./components/AcercaDe";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";

function AppContent() {
  return (
    <DataLoaderWrapper>
      <Router basename="/portfolio/">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/acerca" element={<AcercaDe />} />
            <Route path="/portafolio" element={<Portafolio />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
        <Footer />
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
