import MainLayout from "../layouts/MainLayout";
import {
  usePersonalInfo,
  useTrayectoria,
  useHabilidadesCategorizadas,
} from "../store/hooks/usePortfolioSelectors";
import { Container } from "../styles/components";
import {
  AcercaDeSection,
  BioTrayectoriaContainer,
  BioColumn,
  BioFoto,
  BioImage,
  BioContent,
  BioNombre,
  BioProfesion,
  BioTexto,
  TrayectoriaColumn,
  SectionSubtitle,
  TrayectoriaTimelineVertical,
  TimelineItem,
  TimelineMarker,
  TimelineContent,
  JobTitle,
  JobCompany,
  JobPeriod,
  JobDescription,
  HabilidadesCategorizadasSection,
  HabilidadesCategorias,
  HabilidadCategoria,
  CategoriaTitulo,
  SkillsTags,
  SkillTag,
} from "../styles/AcercaDeStyles";

/**
 * About Page (Acerca De)
 */
export default function AboutPage() {
  const personalInfo = usePersonalInfo();
  const trayectoria = useTrayectoria();
  const habilidadesCategorizadas = useHabilidadesCategorizadas();

  return (
    <MainLayout>
      <AcercaDeSection>
        <Container>
          <h2
            style={{
              fontSize: "2.5rem",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "3rem",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            Acerca de Mí
          </h2>

          {/* Biografía y Trayectoria en 2 Columnas */}
          <BioTrayectoriaContainer>
            {/* Columna Izquierda: Biografía con Foto */}
            <BioColumn>
              <BioFoto>
                <BioImage
                  src={personalInfo.imagen}
                  alt={`${personalInfo.nombre} ${personalInfo.apellido}`}
                />
              </BioFoto>
              <BioContent>
                <BioNombre>
                  {personalInfo.nombre} {personalInfo.apellido}
                </BioNombre>
                <BioProfesion>{personalInfo.profesion}</BioProfesion>
                <BioTexto>{personalInfo.biografia.parrafo1}</BioTexto>
                <BioTexto>{personalInfo.biografia.parrafo2}</BioTexto>
                <BioTexto>{personalInfo.biografia.parrafo3}</BioTexto>
              </BioContent>
            </BioColumn>

            {/* Columna Derecha: Trayectoria */}
            <TrayectoriaColumn>
              <SectionSubtitle>Mi Trayectoria Profesional</SectionSubtitle>
              <TrayectoriaTimelineVertical>
                {trayectoria.map((item) => (
                  <TimelineItem key={item.id}>
                    <TimelineMarker />
                    <TimelineContent>
                      <JobTitle>{item.puesto}</JobTitle>
                      <JobCompany>{item.empresa}</JobCompany>
                      <JobPeriod>{item.periodo}</JobPeriod>
                      <JobDescription>{item.descripcion}</JobDescription>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </TrayectoriaTimelineVertical>
            </TrayectoriaColumn>
          </BioTrayectoriaContainer>

          {/* Habilidades Categorizadas */}
          <HabilidadesCategorizadasSection>
            <SectionSubtitle
              style={{ textAlign: "center", marginBottom: "2rem" }}
            >
              Mis Habilidades
            </SectionSubtitle>
            <HabilidadesCategorias>
              {habilidadesCategorizadas.map((categoria) => (
                <HabilidadCategoria key={categoria.id}>
                  <CategoriaTitulo>{categoria.categoria}</CategoriaTitulo>
                  <SkillsTags>
                    {categoria.skills.map((skill, index) => (
                      <SkillTag key={index}>{skill}</SkillTag>
                    ))}
                  </SkillsTags>
                </HabilidadCategoria>
              ))}
            </HabilidadesCategorias>
          </HabilidadesCategorizadasSection>
        </Container>
      </AcercaDeSection>
    </MainLayout>
  );
}
