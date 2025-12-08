import { usePersonalInfo } from "../store/hooks/usePortfolioSelectors";
import { HeroSection } from "../styles/HeroStyles";
import { Container, Row, Col } from "../styles/shared";
import MainLayout from "../layouts/MainLayout";
import HeroText from "../components/HeroText";
import HeroImageComponent from "../components/HeroImageComponent";

/**
 * Home Page - Main landing page
 * Includes Hero section with personal info and image
 * Uses MainLayout which wraps with Navbar and Footer
 */
export default function Home() {
  const personalInfo = usePersonalInfo();

  return (
    <MainLayout>
      <HeroSection>
        <Container>
          <Row $gap="xl" $alignItems="center">
            {/* Columna izquierda - Hero Text */}
            <Col $flex>
              <HeroText
                nombre={personalInfo.nombre}
                apellido={personalInfo.apellido}
                profesion={personalInfo.profesion}
                descripcion={personalInfo.descripcion}
                descripcionLarga={personalInfo.descripcionLarga}
                email={personalInfo.email}
                telefono={personalInfo.telefono}
                redes={personalInfo.redes}
              />
            </Col>

            {/* Columna derecha - Hero Image */}
            <Col $flex>
              <HeroImageComponent
                src={personalInfo.imagen}
                alt={`${personalInfo.nombre} ${personalInfo.apellido}`}
              />
            </Col>
          </Row>
        </Container>
      </HeroSection>
      {/* Additional sections can be added here */}
    </MainLayout>
  );
}
