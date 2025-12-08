import MainLayout from "../layouts/MainLayout";
import { useProyectos } from "../store/hooks/usePortfolioSelectors";
import { renderIcon } from "../utils/iconRenderer";
import { Container } from "../styles/components";
import {
  PortafolioSection,
  ProjectsGrid,
  ProjectCard,
  ProjectIconFloat,
  ProjectContent,
  ProjectTitle,
  ProjectDescription,
  ProjectTechnologies,
  TechTag,
  ProjectLink,
} from "../styles/PortafolioStyles";

/**
 * Portfolio Page
 */
export default function PortfolioPage() {
  const proyectos = useProyectos();

  return (
    <MainLayout>
      <PortafolioSection>
        <Container>
          <div style={{ marginBottom: "4rem", textAlign: "center" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "0.5rem",
                fontWeight: 700,
              }}
            >
              Mi Portafolio
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#4a5568",
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              Proyectos de Backend, IA y Soluciones Empresariales
            </p>
          </div>

          <ProjectsGrid>
            {proyectos.map((proyecto) => (
              <ProjectCard key={proyecto.id}>
                <ProjectIconFloat>{renderIcon(proyecto.icon)}</ProjectIconFloat>

                <ProjectContent>
                  <ProjectTitle>{proyecto.titulo}</ProjectTitle>
                  <ProjectDescription>
                    {proyecto.descripcion}
                  </ProjectDescription>

                  <ProjectTechnologies>
                    {proyecto.tecnologias.map((tech, index) => (
                      <TechTag key={index}>{tech}</TechTag>
                    ))}
                  </ProjectTechnologies>

                  {proyecto.enlace && (
                    <ProjectLink
                      href={proyecto.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Proyecto →
                    </ProjectLink>
                  )}
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </Container>
      </PortafolioSection>
    </MainLayout>
  );
}
