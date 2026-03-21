import Container from "@/components/layout/Container";
import ProfileImage from "@/components/sections/ProfileImage";
import HeroContent from "@/components/sections/HeroContent";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useState } from "react";
import type { TechDetails } from "@/lib/types";

const HeroSection = () => {
  const { hero, technologies } = usePortfolio();

  // Initialize with random technologies using lazy initialization
  const [floatingTechs] = useState<TechDetails[]>(() => {
    const shuffled = [...technologies].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  });
  return (
    <Container
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-transparent dark:from-blue-950/10 dark:via-gray-900 dark:to-gray-950"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 dark:bg-blue-900/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 dark:bg-purple-900/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 -ml-32 -mb-32"></div>
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-pink-300 dark:bg-pink-900/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
      </div>
      <div className="relative flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
        {/* Content */}
        <HeroContent
          badge={hero.badge}
          title={hero.title}
          description={hero.description}
          location={hero.location}
          status={hero.status}
        />

        {/* Image */}
        <ProfileImage image={hero.image} floatingTechs={floatingTechs} />
      </div>
    </Container>
  );
};

export default HeroSection;
