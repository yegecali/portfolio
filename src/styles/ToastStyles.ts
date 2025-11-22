import styled from "styled-components";

export const ToastContainer = styled.div<{ $type: "success" | "error" }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-width: 300px;
  max-width: 500px;
  animation: slideInRight 0.3s ease-out;
  z-index: 9999;

  ${(props) => {
    if (props.$type === "success") {
      return `
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        border-left: 4px solid #059669;
      `;
    } else {
      return `
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        border-left: 4px solid #dc2626;
      `;
    }
  }}

  color: white;

  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    min-width: auto;
    max-width: none;
  }
`;

export const ToastContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

export const ToastIcon = styled.span`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

export const ToastMessage = styled.p`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ToastClose = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.1);
  }
`;
