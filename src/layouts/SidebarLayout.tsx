import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface SidebarLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarPosition?: "left" | "right";
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

const ContentWrapper = styled.div<{ $sidebarPosition?: "left" | "right" }>`
  flex: 1;
  display: grid;
  grid-template-columns: ${(props) =>
    props.$sidebarPosition === "left" ? "300px 1fr" : "1fr 300px"};
  gap: 2rem;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const MainContent = styled.main`
  width: 100%;
`;

const SidebarContent = styled.aside`
  width: 100%;

  @media (max-width: 1024px) {
    order: -1;
  }
`;

export default function SidebarLayout({
  children,
  sidebar,
  sidebarPosition = "right",
}: SidebarLayoutProps) {
  return (
    <LayoutContainer>
      <Navbar />
      {sidebar && (
        <ContentWrapper $sidebarPosition={sidebarPosition}>
          {sidebarPosition === "left" && (
            <SidebarContent>{sidebar}</SidebarContent>
          )}
          <MainContent>{children}</MainContent>
          {sidebarPosition === "right" && (
            <SidebarContent>{sidebar}</SidebarContent>
          )}
        </ContentWrapper>
      )}
      {!sidebar && <MainContent>{children}</MainContent>}
      <Footer />
    </LayoutContainer>
  );
}
