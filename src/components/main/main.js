import React from 'react'
import styled from '@emotion/styled'
import Theme from './theme'
import Navigation from '../navigation'
import Wave from './wave'

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

const Main = ({ children }) => {
  console.log('loaded again');
  
  return (
    <Theme>
      <Container>
        <main>{children}</main>
      </Container> 
      <Navigation/>
      <Wave />
    </Theme>
  )
}
  
export default Main
  