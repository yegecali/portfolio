import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container, Row } from "../styles/shared";

interface MainLayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${(props) =>
    props.theme?.colors?.gradient?.section ||
    "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"};
  color: ${(props) => props.theme?.colors?.text?.primary || "#1a202c"};
  transition: background-color
      ${(props) => props.theme?.transitions?.base || "0.3s ease"},
    color ${(props) => props.theme?.transitions?.base || "0.3s ease"};
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
`;

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <LayoutContainer>
      <Navbar />
      <Container>
        <Row>
          <MainContent>{children}</MainContent>
        </Row>
      </Container>
      <Footer />
    </LayoutContainer>
  );
}
