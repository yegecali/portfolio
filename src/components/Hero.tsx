import { usePersonalInfo } from "../store/hooks/usePortfolioSelectors";
import {
  FaGithub,
  FaLinkedinIn,
  FaFacebook,
  FaEnvelope,
  FaPhone,
  FaJava,
  FaDatabase,
} from "react-icons/fa6";
import { SiQuarkus, SiApachekafka } from "react-icons/si";
import {
  HeroSection,
  HeroContainer,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroProfession,
  HeroDescription,
  HeroContactInfo,
  ContactItem,
  HeroSocials,
  SocialBtn,
  HeroImageContainer,
  HeroImage,
  ImageBlur,
  TechIcon,
} from "../styles/HeroStyles";

export default function Hero() {
  const personalInfo = usePersonalInfo();

  return (
    <HeroSection>
      <HeroContainer>
        <HeroContent>
          <HeroSubtitle>Hola, soy</HeroSubtitle>
          <HeroTitle>
            {personalInfo.nombre} {personalInfo.apellido}
          </HeroTitle>
          <HeroProfession>{personalInfo.profesion}</HeroProfession>
          <HeroDescription>{personalInfo.descripcion}</HeroDescription>
          <HeroDescription>{personalInfo.descripcionLarga}</HeroDescription>

          <HeroContactInfo>
            <ContactItem>
              <FaEnvelope size={18} />
              <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
            </ContactItem>
            <ContactItem>
              <FaPhone size={18} />
              <span>{personalInfo.telefono}</span>
            </ContactItem>
          </HeroContactInfo>

          <HeroSocials>
            <SocialBtn
              href={personalInfo.redes.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <FaGithub size={20} />
              <span>GitHub</span>
            </SocialBtn>
            <SocialBtn
              href={personalInfo.redes.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <FaLinkedinIn size={20} />
              <span>LinkedIn</span>
            </SocialBtn>
            <SocialBtn
              href={personalInfo.redes.facebook}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
            >
              <FaFacebook size={20} />
              <span>Facebook</span>
            </SocialBtn>
          </HeroSocials>
        </HeroContent>

        <HeroImageContainer>
          <HeroImage
            src={personalInfo.imagen}
            alt={`${personalInfo.nombre} ${personalInfo.apellido}`}
          />
          <ImageBlur />

          {/* Tech stack floating icons */}
          <TechIcon $index={0}>
            <FaJava size={32} />
          </TechIcon>
          <TechIcon $index={1}>
            <SiQuarkus size={32} />
          </TechIcon>
          <TechIcon $index={2}>
            <SiApachekafka size={32} />
          </TechIcon>
          <TechIcon $index={3}>
            <FaDatabase size={32} />
          </TechIcon>
        </HeroImageContainer>
      </HeroContainer>
    </HeroSection>
  );
}
