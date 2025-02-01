import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    color: #343a40;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5em;
    line-height: 1.2;
    font-weight: 700;
  }

  h1 { font-size: 2.5rem }
  h2 { font-size: 2rem }
  h3 { font-size: 1.75rem }
  h4 { font-size: 1.5rem }
  h5 { font-size: 1.25rem }
  h6 { font-size: 1rem }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: #000;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  input, textarea, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  .text-center { text-align: center }
  .text-right { text-align: right }
  .text-left { text-align: left }
`

export default GlobalStyles
