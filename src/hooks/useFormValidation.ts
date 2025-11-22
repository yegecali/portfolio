import { useState, useCallback } from "react";

export interface FormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

export interface FormErrors {
  nombre?: string;
  email?: string;
  asunto?: string;
  mensaje?: string;
}

export interface UseFormValidationReturn {
  formData: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    onSubmit: (data: FormData) => Promise<void>
  ) => (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: FormData = {
  nombre: "",
  email: "",
  asunto: "",
  mensaje: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useFormValidation = (): UseFormValidationReturn => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      // Limpiar error del campo cuando el usuario comienza a escribir
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (onSubmit: (data: FormData) => Promise<void>) =>
      async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar formulario
        const newErrors: FormErrors = {};

        if (!formData.nombre.trim()) {
          newErrors.nombre = "El nombre es obligatorio";
        } else if (formData.nombre.trim().length < 3) {
          newErrors.nombre = "El nombre debe tener al menos 3 caracteres";
        }

        if (!formData.email.trim()) {
          newErrors.email = "El email es obligatorio";
        } else if (!emailRegex.test(formData.email.trim())) {
          newErrors.email = "Por favor ingresa un email válido";
        }

        if (!formData.asunto.trim()) {
          newErrors.asunto = "El asunto es obligatorio";
        } else if (formData.asunto.trim().length < 3) {
          newErrors.asunto = "El asunto debe tener al menos 3 caracteres";
        }

        if (!formData.mensaje.trim()) {
          newErrors.mensaje = "El mensaje es obligatorio";
        } else if (formData.mensaje.trim().length < 10) {
          newErrors.mensaje = "El mensaje debe tener al menos 10 caracteres";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
          return;
        }

        setIsSubmitting(true);
        try {
          await onSubmit(formData);
          setFormData(initialFormData);
          setErrors({});
        } catch (error) {
          console.error("Error al enviar formulario:", error);
        } finally {
          setIsSubmitting(false);
        }
      },
    [formData]
  );

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
