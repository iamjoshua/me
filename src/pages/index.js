import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import Intro from '../components/intro'
import Navigation from '../components/navigation'

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
  /* display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 40% 10% 350px; */
  position: fixed;
  background: white;
  width: 100vw;
  height: 100vh; 
`

const Bottom = styled.div`
  position: fixed;
  width: 100%;
  bottom: 102px;
`

const IndexPage = () => (
  <Container>
    <Global styles={HTML}/>
    <Bottom>
      <Intro />
    </Bottom>
    <Navigation />
  </Container>
)

export default IndexPage

