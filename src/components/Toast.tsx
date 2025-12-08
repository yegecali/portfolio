import { useEffect } from "react";
import { FaCircleCheck, FaExclamation, FaXmark } from "react-icons/fa6";
import {
  ToastContainer,
  ToastContent,
  ToastIcon,
  ToastMessage,
  ToastClose,
} from "../styles/ToastStyles";

export type ToastType = "success" | "error";

export interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type,
  onClose,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <ToastContainer $type={type}>
      <ToastContent>
        {type === "success" ? (
          <ToastIcon>
            <FaCircleCheck />
          </ToastIcon>
        ) : (
          <ToastIcon>
            <FaExclamation />
          </ToastIcon>
        )}
        <ToastMessage>{message}</ToastMessage>
      </ToastContent>
      <ToastClose onClick={onClose}>
        <FaXmark />
      </ToastClose>
    </ToastContainer>
  );
}
