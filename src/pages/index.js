import React from 'react'
import styled from '@emotion/styled'
import Intro from '../components/intro'
import Main from '../components/main'

// ================================ //
// Styles
// ================================ //

const Bottom = styled.div`
  position: fixed;
  width: 100%;
  bottom: 102px;
`

// ================================ //
// Page
// ================================ //

const IndexPage = () => (
  <Main>
    <Bottom>
      <Intro />
    </Bottom>
  </Main> 
)

export default IndexPage