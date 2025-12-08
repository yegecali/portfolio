import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #10b981;
    --error-color: #ef4444;
    --warning-color: #f59e0b;
  }

  html.theme-light {
    background-color: ${(props) => props.theme.colors.background.primary};
    color: ${(props) => props.theme.colors.text.primary};
  }

  html.theme-dark {
    background-color: ${(props) => props.theme.colors.background.primary};
    color: ${(props) => props.theme.colors.text.primary};
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${(props) => props.theme.colors.background.primary};
    color: ${(props) => props.theme.colors.text.primary};
    transition: background-color ${(props) => props.theme.transitions.smooth}, 
                color ${(props) => props.theme.transitions.smooth};
  }

  html, body, #root {
    height: 100%;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    transition: all ${(props) => props.theme.transitions.base};
  }

  input, textarea, select {
    font-family: inherit;
    background-color: ${(props) => props.theme.colors.input.background};
    color: ${(props) => props.theme.colors.input.text};
    border-color: ${(props) => props.theme.colors.input.border};
    transition: all ${(props) => props.theme.transitions.base};

    &::placeholder {
      color: ${(props) => props.theme.colors.input.placeholder};
    }

    &:focus {
      background-color: ${(props) => props.theme.colors.input.background};
      border-color: ${(props) => props.theme.colors.primary};
    }
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.primary};
    border-radius: 5px;

    &:hover {
      background: ${(props) => props.theme.colors.secondary};
    }
  }
`;
