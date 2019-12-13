import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

const Nav = styled.div`
  position: fixed;
  display: grid;
  grid-template-columns: 35% auto 20%;
  width: 100%;
  bottom: 0;
  border-top: 1px solid #f3f3f3;
  border-bottom: 6px solid #9c7d9a;
  font-size: 16px;
  font-weight: 500;
`

const Logo = styled.div`
    a {
        display: block;
        padding: 35px;
        white-space: pre;
        text-transform: uppercase;
    }
`

// const Menu = styled.div`
//     ul {
//         display: inline-block;
//         list-style: none;
//         /* offset to match introduction padding */
//         margin: 0 0 0 15px;
//         li {
//             display: inline;
//             a {
//                 display: inline-block;
//                 padding: 35px;
//                 text-transform: lowercase;
//                 color: black;
//                 transition: all 0.3s;
//                 :hover {
//                     color: #9c7d9a;
//                     padding: 30px 35px 40px 35px;
//                 }
//             }
//         }
//     }
// `

const Menu = styled.div`
    /* offset to match introduction padding */
    margin: 0 0 0 15px;
    display: flex;
    a, a:visited {
        padding: 35px;
        white-space: pre;
        text-transform: lowercase;
        color: #6d6d6d;
        transition: all 0.3s; 
        :hover {
            color: #9c7d9a;
            padding: 32px 35px 38px 35px;
        }
    }
`

const Social = styled.div`
`

const Navigation = () => (
    <Nav>  
        <Logo>
            <Link to='./'>Joshua Heiland</Link>
        </Logo>
        <Menu>
            <Link to='./about'>About</Link>
            <Link to='./reading-list'>Reading List</Link>
            <Link to='./contact'>Contact</Link>
            {/* <ul>
                <li><Link to='./about'>About</Link></li>
                <li><Link to='./reading-list'>Reading List</Link></li>
                <li><Link to='./contact'>Contact</Link></li>
            </ul> */}
        </Menu>
        <Social></Social>
    </Nav>
)
  
export default Navigation
  