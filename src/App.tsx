import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutMeSection from "@/components/sections/AboutMeSection";
import SkillsSection from "@/components/sections/SkillsSection";
import WorkSection from "@/components/sections/WorkSection";
import ContactSection from "@/components/sections/ContactSection";
import { useTheme } from "@/hooks/useTheme";
import { PortfolioProvider } from "@/contexts/PortfolioContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

function AppContent() {
  const { mounted } = useTheme();

  useEffect(() => {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href !== "#") {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-text-primary dark:bg-gray-950 dark:text-gray-100 transition-colors duration-500 overflow-x-hidden">
      <Header />
      <main className="flex flex-col">
        <HeroSection />
        <AboutMeSection />
        <SkillsSection />
        <WorkSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
