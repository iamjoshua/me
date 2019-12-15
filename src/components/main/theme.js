import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { Global, css } from '@emotion/core'

// ================================ //
// Theme configuration
// ================================ //

const theme = {
  color: {
    accent: '#9c7d9a',
    deepAccent: '#ce6fc4',
    normal: '#6d6d6d',
    gray: '#f3f3f3',
    muted: '#d8d8d8',
    light: '#e2e2e29c'
  },
  space: '20px'  
}

// ================================ //
// Styles
// ================================ //

const HTML = css`
  html, body {
    width: 100%;
    height: 100%;
  }
  body {
    background: linear-gradient(#9c7d9a, #ffffff);
    background-size: cover;
    background-position: fixed;
    font-family: 'Montserrat', 'sans-serif';
    color: ${theme.color.normal};
    a, a:visited {
      color: ${theme.color.accent};
      text-decoration: none;
    }
  }
`

// ================================ //
// Component
// ================================ //

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Global styles={HTML}/>
    {children}
  </ThemeProvider>
)
  
export default Theme
  