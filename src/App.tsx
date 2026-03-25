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
import { I18nProvider } from "@/contexts/I18nContext";
import AdminPage from "@/pages/AdminPage";

/** Detect admin route: /portfolio/admin, /admin, or ?admin query param */
function isAdminRoute(): boolean {
  const path = window.location.pathname;
  const search = window.location.search;
  return (
    path.endsWith("/admin") ||
    new URLSearchParams(search).has("admin")
  );
}

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
  if (isAdminRoute()) {
    return (
      <I18nProvider>
        <ThemeProvider>
          <AdminPage />
        </ThemeProvider>
      </I18nProvider>
    );
  }

  return (
    <I18nProvider>
      <ThemeProvider>
        <PortfolioProvider>
          <AppContent />
        </PortfolioProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
