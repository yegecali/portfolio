import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaLinkedinIn,
  FaFacebook,
} from "react-icons/fa6";
import {
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroProfession,
  HeroDescription,
  HeroContactInfo,
  ContactItem,
  HeroSocials,
  SocialBtn,
  TypedName,
} from "../styles/HeroStyles";

interface HeroTextProps {
  nombre: string;
  apellido: string;
  profesion: string;
  descripcion: string;
  descripcionLarga: string;
  email: string;
  telefono: string;
  redes: {
    github: string;
    linkedin: string;
    facebook: string;
  };
}

export default function HeroText({
  nombre,
  apellido,
  profesion,
  descripcion,
  descripcionLarga,
  email,
  telefono,
  redes,
}: HeroTextProps) {
  const fullName = `${nombre} ${apellido}`;
  const [displayedName, setDisplayedName] = useState("");

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullName.length) {
        setDisplayedName(fullName.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80); // 80ms por cada letra para typing smooth

    return () => clearInterval(typingInterval);
  }, [fullName]);

  return (
    <HeroContent>
      <HeroSubtitle>Hola, soy</HeroSubtitle>
      <HeroTitle>
        <TypedName $isComplete={displayedName === fullName}>
          {displayedName}
          {displayedName !== fullName && <span className="cursor">|</span>}
          {displayedName === fullName && (
            <span className="cursor-blink">|</span>
          )}
        </TypedName>
      </HeroTitle>
      <HeroProfession>{profesion}</HeroProfession>
      <HeroDescription>{descripcion}</HeroDescription>
      <HeroDescription>{descripcionLarga}</HeroDescription>

      <HeroContactInfo>
        <ContactItem>
          <FaEnvelope size={18} />
          <a href={`mailto:${email}`}>{email}</a>
        </ContactItem>
        <ContactItem>
          <FaPhone size={18} />
          <span>{telefono}</span>
        </ContactItem>
      </HeroContactInfo>

      <HeroSocials>
        <SocialBtn
          href={redes.github}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <FaGithub size={20} />
          <span>GitHub</span>
        </SocialBtn>
        <SocialBtn
          href={redes.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <FaLinkedinIn size={20} />
          <span>LinkedIn</span>
        </SocialBtn>
        <SocialBtn
          href={redes.facebook}
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
        >
          <FaFacebook size={20} />
          <span>Facebook</span>
        </SocialBtn>
      </HeroSocials>
    </HeroContent>
  );
}
