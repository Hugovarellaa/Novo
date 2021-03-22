import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  body, input, select , textarea {
    font-size: 1rem;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    line-height: 160%;
  }

  button {
    cursor: pointer;
  }

  [disabled]{
    cursor: not-allowed;
    opacity: 0.7;
  }
`
