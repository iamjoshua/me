import React from 'react'
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import { Global, css } from '@emotion/core'
import Navigation from '../navigation'

// ================================ //
// Styles
// ================================ //

const theme = {
  color: {
    accent: '#9c7d9a',
    normal: '#6d6d6d',
    gray: '#f3f3f3',
    muted: '#d8d8d8',
    light: '#e2e2e29c'
  },
  space: '20px'  
}

// let i = 0
// const accents = ['#9c7d9a', '#70a0d2']
// setInterval(() => {  
//   theme.color.accent = accents[i++]
//   i = i === accents.length ? 0 : i
// }, 1000)

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

const Container = styled.div`
  /* position: fixed; */
  background: white;
  width: 100vw;
  min-height: 100vh; 
  padding-bottom: 90px;
`

// ================================ //
// Component
// ================================ //

const Main = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Global styles={HTML}/>
    <Container>
      <main>{children}</main>
      <Navigation/>
    </Container> 
  </ThemeProvider>
)
  
export default Main
  