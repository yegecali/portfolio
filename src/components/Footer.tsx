import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";
import { usePersonalInfo } from "../store/hooks/usePortfolioSelectors";
import { Container } from "../styles/components";
import {
  FooterElement,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterList,
  FooterListItem,
  FooterLink,
  FooterText,
  SocialIconsContainer,
  SocialIconLink,
  FooterBottom,
} from "../styles/FooterStyles";

export default function Footer() {
  const personalInfo = usePersonalInfo();
  const year = new Date().getFullYear();

  return (
    <FooterElement>
      <Container>
        <FooterContent>
          <FooterSection>
            <FooterTitle>Navegación</FooterTitle>
            <FooterList>
              <FooterListItem>
                <FooterLink as={Link} to="/">
                  Inicio
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink as={Link} to="/acerca">
                  Acerca de
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink as={Link} to="/portafolio">
                  Portafolio
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink as={Link} to="/contacto">
                  Contacto
                </FooterLink>
              </FooterListItem>
            </FooterList>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Contacto</FooterTitle>
            <FooterText>
              <FaEnvelope style={{ marginRight: "0.5rem" }} />
              {personalInfo.email}
            </FooterText>
            <FooterText>
              <FaLocationDot style={{ marginRight: "0.5rem" }} />
              {personalInfo.ubicaciones?.[0] || "Ubicación no disponible"}
            </FooterText>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Conéctate</FooterTitle>
            <SocialIconsContainer>
              <SocialIconLink
                href={personalInfo.redes?.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <FaGithub size={18} />
                GitHub
              </SocialIconLink>
              <SocialIconLink
                href={personalInfo.redes?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <FaLinkedin size={18} />
                LinkedIn
              </SocialIconLink>
              <SocialIconLink
                href={personalInfo.redes?.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <FaFacebook size={18} />
                Facebook
              </SocialIconLink>
            </SocialIconsContainer>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <p>
            &copy; {year} Todos los derechos reservados | Ing.{" "}
            {personalInfo.nombre} {personalInfo.apellido}
          </p>
        </FooterBottom>
      </Container>
    </FooterElement>
  );
}
