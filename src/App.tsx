import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Portafolio from './components/Portafolio'
import Servicios from './components/Servicios'
import AcercaDe from './components/AcercaDe'
import Contacto from './components/Contacto'
import Footer from './components/Footer'

function App() {
  return (
    <Router basename="/portfolio/">
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/acerca" element={<AcercaDe />} />
            <Route path="/portafolio" element={<Portafolio />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
