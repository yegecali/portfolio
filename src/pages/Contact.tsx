import MainLayout from "../layouts/MainLayout";
import { usePersonalInfo } from "../store/hooks/usePortfolioSelectors";
import { FaEnvelope, FaLocationDot, FaLink } from "react-icons/fa6";
import { useFormValidation } from "../hooks/useFormValidation";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";
import { Container } from "../styles/components";
import {
  ContactoSection,
  ContactoContent,
  ContactoInfo,
  ContactoTitle,
  InfoItem,
  InfoIcon,
  InfoContent,
  InfoTitle,
  InfoText,
  InfoLink,
  SocialLinks,
  SocialLink,
  ContactoForm,
  FormGroup,
  FormInput,
  FormTextarea,
  ErrorMessage,
  SubmitButton,
} from "../styles/ContactoStyles";

/**
 * Contact Page
 */
export default function ContactPage() {
  const personalInfo = usePersonalInfo();
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useFormValidation();
  const { toasts, removeToast, success, error } = useToast();

  const onFormSubmit = handleSubmit(async () => {
    try {
      // Simular envío
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mostrar toast de éxito
      success("¡Correo enviado correctamente!");
    } catch (err) {
      error("Error al enviar el correo. Intenta nuevamente.");
      console.error(err);
    }
  });

  return (
    <MainLayout>
      <ContactoSection>
        <Container>
          <div style={{ marginBottom: "4rem", textAlign: "center" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "0.5rem",
                fontWeight: 700,
              }}
            >
              Contacto
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#4a5568",
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              ¡Comuniquémonos y hagamos algo increíble!
            </p>
          </div>

          <ContactoContent>
            <ContactoInfo>
              <ContactoTitle>Información de Contacto</ContactoTitle>

              <InfoItem>
                <InfoIcon>
                  <FaEnvelope size={24} />
                </InfoIcon>
                <InfoContent>
                  <InfoTitle>Email</InfoTitle>
                  <InfoLink href={`mailto:${personalInfo.email}`}>
                    {personalInfo.email}
                  </InfoLink>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <InfoIcon>
                  <FaLocationDot size={24} />
                </InfoIcon>
                <InfoContent>
                  <InfoTitle>Ubicación</InfoTitle>
                  <InfoText>
                    {personalInfo.ubicaciones.map((ubicacion, index) => (
                      <span key={index}>
                        {ubicacion}
                        {index < personalInfo.ubicaciones.length - 1 && <br />}
                      </span>
                    ))}
                  </InfoText>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <InfoIcon>
                  <FaLink size={24} />
                </InfoIcon>
                <InfoContent>
                  <InfoTitle>Redes Sociales</InfoTitle>
                  <SocialLinks>
                    <SocialLink
                      href={personalInfo.redes.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </SocialLink>
                    <SocialLink
                      href={personalInfo.redes.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </SocialLink>
                    <SocialLink
                      href={personalInfo.redes.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </SocialLink>
                  </SocialLinks>
                </InfoContent>
              </InfoItem>
            </ContactoInfo>

            <ContactoForm onSubmit={onFormSubmit}>
              <FormGroup>
                <FormInput
                  type="text"
                  name="nombre"
                  placeholder="¿Cuál es tu nombre?"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={errors.nombre ? "input-error" : ""}
                />
                {errors.nombre && <ErrorMessage>{errors.nombre}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <FormInput
                  type="email"
                  name="email"
                  placeholder="Tu email para contactarte"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <FormInput
                  type="text"
                  name="asunto"
                  placeholder="Asunto del mensaje"
                  value={formData.asunto}
                  onChange={handleChange}
                  className={errors.asunto ? "input-error" : ""}
                />
                {errors.asunto && <ErrorMessage>{errors.asunto}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <FormTextarea
                  name="mensaje"
                  placeholder="Cuéntame qué tienes en mente..."
                  rows={6}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className={errors.mensaje ? "input-error" : ""}
                />
                {errors.mensaje && (
                  <ErrorMessage>{errors.mensaje}</ErrorMessage>
                )}
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </SubmitButton>
            </ContactoForm>
          </ContactoContent>
        </Container>

        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ContactoSection>
    </MainLayout>
  );
}
