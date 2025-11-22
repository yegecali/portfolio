import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";
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
              yegecali2@gmail.com
            </FooterText>
            <FooterText>
              <FaLocationDot style={{ marginRight: "0.5rem" }} />
              Ayacucho, Perú
            </FooterText>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Conéctate</FooterTitle>
            <SocialIconsContainer>
              <SocialIconLink
                href="https://github.com/yegecali"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <FaGithub size={18} />
                GitHub
              </SocialIconLink>
              <SocialIconLink
                href="https://linkedin.com/in/yemi-genderson-canchari-lizarbe-90bb98127/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <FaLinkedin size={18} />
                LinkedIn
              </SocialIconLink>
              <SocialIconLink
                href="https://facebook.com/yemigenderson.cancharilizarbe"
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
            &copy; {year} Todos los derechos reservados | Ing. Genderson
            Canchari Lizarbe
          </p>
        </FooterBottom>
      </Container>
    </FooterElement>
  );
}
