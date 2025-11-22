import styled from "styled-components";

export const AcercaDeSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(102, 126, 234, 0.5),
      transparent
    );
  }

  @media (max-width: 768px) {
    padding: 4rem 0;
  }

  @media (max-width: 480px) {
    padding: 3rem 0;
  }
`;

export const BioTrayectoriaContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  align-items: start;

  @media (max-width: 1024px) {
    gap: 3rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const BioColumn = styled.div`
  animation: fadeInLeft 0.8s ease;

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const BioFoto = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

export const BioImage = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border: 4px solid white;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }

  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
  }

  @media (max-width: 480px) {
    width: 180px;
    height: 180px;
  }
`;

export const BioContent = styled.div``;

export const BioNombre = styled.h3`
  font-size: 1.8rem;
  color: #1a202c;
  margin-bottom: 0.5rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const BioProfesion = styled.p`
  font-size: 1.1rem;
  color: #667eea;
  margin-bottom: 1.5rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const BioTexto = styled.p`
  font-size: 0.95rem;
  color: #4a5568;
  line-height: 1.8;
  margin-bottom: 1rem;
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const TrayectoriaColumn = styled.div`
  animation: fadeInRight 0.8s ease;

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const SectionSubtitle = styled.h3`
  font-size: 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const TrayectoriaTimelineVertical = styled.div`
  position: relative;
  padding: 0;

  &::before {
    content: "";
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #667eea, #764ba2, transparent);
  }
`;

export const TimelineItem = styled.div`
  position: relative;
  padding-left: 100px;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
`;

export const TimelineMarker = styled.div`
  position: absolute;
  left: 12px;
  top: 0;
  width: 36px;
  height: 36px;
  background: white;
  border: 3px solid #667eea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 0 0 4px #f5f7fa;
`;

export const TimelineContent = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border-left: 3px solid #667eea;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(8px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  }
`;

export const JobTitle = styled.h4`
  font-size: 1.1rem;
  color: #1a202c;
  margin-bottom: 0.4rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const JobCompany = styled.p`
  font-size: 0.95rem;
  color: #667eea;
  margin-bottom: 0.4rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const JobPeriod = styled.p`
  font-size: 0.85rem;
  color: #a0aec0;
  margin-bottom: 0.8rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const JobDescription = styled.p`
  font-size: 0.9rem;
  color: #4a5568;
  line-height: 1.6;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export const HabilidadesCategorizadasSection = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

export const HabilidadesCategorias = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const HabilidadCategoria = styled.div`
  animation: fadeInUp 0.6s ease;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const CategoriaTitulo = styled.h4`
  font-size: 1.2rem;
  color: #1a202c;
  margin-bottom: 1.2rem;
  font-weight: 700;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid #667eea;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const SkillsTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

export const SkillTag = styled.span`
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.1),
    rgba(118, 75, 162, 0.1)
  );
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border-color: #667eea;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
`;
