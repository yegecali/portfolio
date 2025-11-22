import styled from "styled-components";

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1f3a 0%, #764ba2 100%);
  gap: 2rem;
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoaderText = styled.p`
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  animation: pulse-text 1.5s ease-in-out infinite;
  margin: 0;

  @keyframes pulse-text {
    0%,
    100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }
`;
