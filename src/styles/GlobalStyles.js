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
    color: ${props => props.theme.colors.dark};
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5em;
    line-height: ${props => props.theme.typography.lineHeights.tight};
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
  }

  h1 { font-size: ${props => props.theme.typography.fontSizes.xxl} }
  h2 { font-size: calc(${props => props.theme.typography.fontSizes.xxl} * 0.85) }
  h3 { font-size: calc(${props => props.theme.typography.fontSizes.xxl} * 0.75) }
  h4 { font-size: ${props => props.theme.typography.fontSizes.xl} }
  h5 { font-size: ${props => props.theme.typography.fontSizes.lg} }
  h6 { font-size: ${props => props.theme.typography.fontSizes.md} }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }

  a {
    color: ${props => props.theme.colors.primary};
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