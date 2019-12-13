import React from 'react'
import Me from '../me'
// import { Link } from 'gatsby'
import styled from '@emotion/styled'

const Section = styled.div`
    display: grid;
    grid-template-columns: 35% auto;
    border-top: 1px solid #f3f3f3;
`

const Image = styled.div`
    border-right: 8px solid #f3f3f3;
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
    color: #9c7d9a;
`


const Intro = () => (
    <Section>  
        <Image>
            {/* <Me /> */}
        </Image>
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
  