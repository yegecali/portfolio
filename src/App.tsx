import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { store } from "./store/store";
import { DataLoaderWrapper } from "./DataLoaderWrapper";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Portafolio from "./components/Portafolio";
import AcercaDe from "./components/AcercaDe";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";

function AppContent() {
  return (
    <DataLoaderWrapper>
      <Router basename="/portfolio/">
        <div className="app">
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
        </div>
      </Router>
    </DataLoaderWrapper>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
