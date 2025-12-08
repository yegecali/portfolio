/**
 * EJEMPLO PRÁCTICO: Refactorización de Contacto usando Shared Components
 *
 * Este archivo muestra cómo usar los componentes compartidos de shared.ts
 * para simplificar y reutilizar estilos en todo el proyecto.
 */

import {
  Container,
  Section,
  Grid,
  Card,
  FlexBox,
  Heading,
  Paragraph,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  Button,
  Badge,
  Divider,
  Spacer,
} from "../styles/shared";

// ============================================================================
// EJEMPLO 1: Formulario Refactorizado
// ============================================================================

export function ContactFormRefactored() {
  return (
    <Card $shadow="md" $padding="lg" $border as="form">
      <Heading $level={3}>Envíanos un mensaje</Heading>
      <Spacer $height="md" />

      {/* Row 1: Nombre y Email */}
      <FlexBox $gap="md" $wrap>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <FormGroup>
            <FormLabel $required>Nombre</FormLabel>
            <FormInput
              type="text"
              placeholder="Tu nombre completo"
              $size="md"
            />
          </FormGroup>
        </div>

        <div style={{ flex: 1, minWidth: "200px" }}>
          <FormGroup>
            <FormLabel $required>Email</FormLabel>
            <FormInput
              type="email"
              placeholder="tu@email.com"
              $size="md"
              $error={false}
            />
            {/* <FormError>Email inválido</FormError> */}
          </FormGroup>
        </div>
      </FlexBox>

      {/* Asunto */}
      <FormGroup>
        <FormLabel $required>Asunto</FormLabel>
        <FormInput type="text" placeholder="Tema del mensaje" $size="md" />
      </FormGroup>

      {/* Mensaje */}
      <FormGroup>
        <FormLabel $required>Mensaje</FormLabel>
        <FormTextarea placeholder="Tu mensaje aquí..." rows={6} $size="md" />
      </FormGroup>

      {/* Botón */}
      <Spacer $height="sm" />
      <Button $fullWidth $size="lg">
        Enviar Mensaje
      </Button>
    </Card>
  );
}

// ============================================================================
// EJEMPLO 2: Información de Contacto en Cards
// ============================================================================

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  value: string;
  description?: string;
}

export function ContactInfoSection({ contacts }: { contacts: ContactInfo[] }) {
  return (
    <Section $padding="lg">
      <Container>
        <Heading $level={2} $align="center" $gradient>
          Manténgase en contacto
        </Heading>
        <Spacer $height="lg" />

        <Grid $columns={3} $gap="lg" $minItemWidth="200px">
          {contacts.map((contact, idx) => (
            <Card key={idx} $shadow="md" $padding="md" $interactive>
              <FlexBox $justifyContent="center" $alignItems="center" $gap="md">
                <div style={{ fontSize: "2rem" }}>{contact.icon}</div>
                <div>
                  <Heading $level={5}>{contact.title}</Heading>
                  <Paragraph $size="sm" $color="secondary">
                    {contact.value}
                  </Paragraph>
                </div>
              </FlexBox>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

// ============================================================================
// EJEMPLO 3: Portfolio Card Grid
// ============================================================================

interface ProjectCard {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
}

export function ProjectsGridRefactored({
  projects,
}: {
  projects: ProjectCard[];
}) {
  return (
    <Section $padding="lg" $background="gradient">
      <Container>
        <Heading $level={2} $align="center" $gradient>
          Mis Proyectos
        </Heading>
        <Spacer $height="lg" />

        <Grid $minItemWidth="280px" $gap="lg">
          {projects.map((project) => (
            <Card
              key={project.id}
              $shadow="md"
              $padding="lg"
              $interactive
              $borderRadius="lg"
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
              )}

              <Heading $level={4}>{project.title}</Heading>
              <Spacer $height="sm" />

              <Paragraph $size="sm" $color="secondary">
                {project.description}
              </Paragraph>
              <Spacer $height="md" />

              {/* Technologies */}
              <FlexBox $gap="sm" $wrap>
                {project.technologies.map((tech) => (
                  <Badge key={tech} $variant="primary" $size="sm">
                    {tech}
                  </Badge>
                ))}
              </FlexBox>

              <Divider $margin="md" />

              {project.link && (
                <Button $fullWidth $size="sm">
                  Ver Proyecto
                </Button>
              )}
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

// ============================================================================
// EJEMPLO 4: Feature Section con Cards
// ============================================================================

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function FeaturesSection({ features }: { features: Feature[] }) {
  return (
    <Section $padding="xl">
      <Container>
        <Heading $level={2} $align="center">
          ¿Por qué trabajar conmigo?
        </Heading>
        <Spacer $height="lg" />

        <Grid $columns={3} $gap="xl" $minItemWidth="250px">
          {features.map((feature) => (
            <Card
              key={feature.id}
              $padding="lg"
              $shadow="sm"
              $border
              style={{ textAlign: "center" }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                {feature.icon}
              </div>
              <Heading $level={4}>{feature.title}</Heading>
              <Spacer $height="sm" />
              <Paragraph $size="sm" $color="secondary">
                {feature.description}
              </Paragraph>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

// ============================================================================
// EJEMPLO 5: Testimonios Section
// ============================================================================

interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  image?: string;
}

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <Section $padding="lg" $background="gradient">
      <Container>
        <Heading $level={2} $align="center" $gradient>
          Lo que dicen mis clientes
        </Heading>
        <Spacer $height="lg" />

        <Grid $columns={2} $gap="lg" $minItemWidth="300px">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} $shadow="md" $padding="lg" $border>
              <Paragraph
                $size="sm"
                $weight={500}
                style={{ marginBottom: "1rem" }}
              >
                "{testimonial.message}"
              </Paragraph>

              <Divider $margin="md" />

              <FlexBox $gap="md" $alignItems="center">
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                )}
                <div>
                  <Paragraph $weight={700}>{testimonial.name}</Paragraph>
                  <Paragraph $size="sm" $color="secondary">
                    {testimonial.role}
                  </Paragraph>
                </div>
              </FlexBox>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

// ============================================================================
// EJEMPLO 6: Call to Action Section
// ============================================================================

export function CTASection() {
  return (
    <Section $padding="xl" $background="gradient" $center>
      <Container>
        <div style={{ textAlign: "center", maxWidth: "600px" }}>
          <Heading $level={2} $gradient>
            ¿Listo para tu próximo proyecto?
          </Heading>
          <Spacer $height="md" />

          <Paragraph $size="lg" $color="secondary">
            Contáctame hoy y hablemos sobre cómo puedo ayudarte a llevar tu idea
            al siguiente nivel.
          </Paragraph>
          <Spacer $height="lg" />

          <FlexBox $justifyContent="center" $gap="md">
            <Button $size="lg">Contáctame</Button>
            <Button $size="lg" as="a" href="#portfolio">
              Ver Portafolio
            </Button>
          </FlexBox>
        </div>
      </Container>
    </Section>
  );
}

export default {
  ContactFormRefactored,
  ContactInfoSection,
  ProjectsGridRefactored,
  FeaturesSection,
  TestimonialsSection,
  CTASection,
};
