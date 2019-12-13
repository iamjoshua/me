import React from 'react'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import Navigation from '../navigation'

// ================================ //
// Styles
// ================================ //

const HTML = css`
  html, body {
    width: 100%;
    height: 100%;
  }
  body {
    background: #9c7d9a;
    font-family: 'Montserrat', 'sans-serif';
    // color: #9c7d9a;
    color: #6d6d6d;
    a, a:visited {
      color: #9c7d9a;
      text-decoration: none;
    }
  }
`

const Container = styled.div`
  position: fixed;
  background: white;
  width: 100vw;
  height: 100vh; 
`

// ================================ //
// Component
// ================================ //

const Main = ({ children }) => (
  <Container>
    <Global styles={HTML}/>
    <main>{children}</main>
    <Navigation/>
  </Container>    
)
  
export default Main
  