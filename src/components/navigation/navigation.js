import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import PageLink from './pagelink'

// ================================ //
// Styles
// ================================ //

const Nav = styled.div`
  position: fixed;
  display: grid;
  grid-template-columns: 35% auto 20%;
  width: 100%;
  bottom: 0;
  border-top: 1px solid #f3f3f3;
  border-bottom: 6px solid #9c7d9a;
  background: #fffffff0;
  font-size: 16px;
  font-weight: 500;
`

const Logo = styled(Link)`
  display: block;
  padding: 35px;
  white-space: pre;
  text-transform: uppercase;
`

const Menu = styled.div`
  /* offset to match introduction padding */
  margin: 0 0 0 15px;
  display: flex;
`

const Social = styled.div``

// ================================ //
// Component
// ================================ //

const Navigation = () => (
  <Nav>
    <Logo to="/">Joshua Heiland</Logo>
    <Menu>
      <PageLink to="about">About</PageLink>
      <PageLink to="read">Reading List</PageLink>
      <PageLink to="/">Contact</PageLink>
    </Menu>
    <Social></Social>
  </Nav>
)

export default Navigation
