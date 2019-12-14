import React from "react"
// import Me from '../me'
import styled from "@emotion/styled"

// ================================ //
// Styles
// ================================ //

const Section = styled.section`
  display: grid;
  grid-template-columns: 35% auto;
  border-top: 1px solid ${props => props.theme.color.light};
`

const Image = styled.div`
  border-right: 8px solid ${props => props.theme.color.gray};
`

const Header = styled.header`
  padding: 50px;
`

const H1 = styled.h1`
  font-size: 50px;
  font-weight: 200;
`

const H2 = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.color.accent};
`

// ================================ //
// Component
// ================================ //

const Intro = () => (
  <Section>
    <Image>{/* <Me /> */}</Image>
    <Header>
      <H1>
        SF-based thinker & <br />
        artificial intelligence researcher
      </H1>
      <H2>designer, coder, writer</H2>
    </Header>
  </Section>
)

export default Intro
