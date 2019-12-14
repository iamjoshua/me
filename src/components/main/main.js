import React from 'react'
import styled from '@emotion/styled'
import Theme from './theme'
import Navigation from '../navigation'

// ================================ //
// Styles
// ================================ //

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
  <Theme>
    <Container>
      <main>{children}</main>
      <Navigation/>
    </Container> 
  </Theme>
)
  
export default Main
  