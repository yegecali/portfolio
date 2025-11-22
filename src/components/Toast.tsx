import "./Toast.css";
import { useEffect } from "react";
import { FaCircleCheck, FaExclamation, FaXmark } from "react-icons/fa6";

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
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        {type === "success" ? (
          <FaCircleCheck className="toast-icon" />
        ) : (
          <FaExclamation className="toast-icon" />
        )}
        <p className="toast-message">{message}</p>
      </div>
      <button className="toast-close" onClick={onClose}>
        <FaXmark />
      </button>
    </div>
  );
}
