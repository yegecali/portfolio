import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutMeSection from "@/components/sections/AboutMeSection";
import SkillsSection from "@/components/sections/SkillsSection";
import WorkSection from "@/components/sections/WorkSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import CustomCursor from "@/components/general/CustomCursor";
import { useTheme } from "@/hooks/useTheme";
import { PortfolioProvider } from "@/contexts/PortfolioContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

/**
 * PageLayout — contenedor raíz de ancho fijo.
 * Ningún hijo puede superar su ancho (w-screen + overflow-x-clip).
 * Header y Footer viven aquí como hermanos directos de <main>.
 */
function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ width: "100vw", maxWidth: "100vw", overflowX: "clip" }}
      className="relative min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100"
    >
      {children}
    </div>
  );
}

function AppContent() {
  const { mounted } = useTheme();

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href !== "#") {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }, []);

  if (!mounted) return null;

  return (
    <PageLayout>
      <CustomCursor />
      <Header />
      <main className="flex flex-col w-full overflow-x-hidden pt-16">
        <HeroSection />
        <AboutMeSection />
        <SkillsSection />
        <ExperienceSection />
        <WorkSection />
        <ContactSection />
      </main>
      <Footer />
    </PageLayout>
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
