import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary-color: #2563eb;
    --secondary-color: #7c3aed;
    --dark-bg: #0f172a;
    --light-bg: #f0f4f8;
    --text-dark: #1a202c;
    --text-light: #4a5568;
    --border-color: #e2e8f0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #fff;
    color: var(--text-dark);
  }

  html, body, #root {
    height: 100%;
  }

  #app {
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
  }

  input, textarea, select {
    font-family: inherit;
  }
`;
