import React from 'react'
import styled from '@emotion/styled'
import Intro from '../components/intro'
// import Main from '../components/main'

// ================================ //
// Styles
// ================================ //

const Bottom = styled.div`
  position: fixed;
  width: 100%;
  /* Just above bottom navigation */
  bottom: 102px;
`

// ================================ //
// Page
// ================================ //

const IndexPage = () => (
  <>
    <Bottom>
      <Intro />
    </Bottom>
  </> 
)

export default IndexPage