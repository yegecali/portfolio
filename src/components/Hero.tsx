import { usePersonalInfo } from "../store/hooks/usePortfolioSelectors";
import { HeroSection } from "../styles/HeroStyles";
import { Container, Row, Col } from "../styles/shared";
import HeroText from "./HeroText";
import HeroImageComponent from "./HeroImageComponent";

export default function Hero() {
  const personalInfo = usePersonalInfo();

  return (
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
  );
}
