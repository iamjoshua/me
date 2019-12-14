import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const backDown = keyframes`
  from {
    padding: 32px 35px 38px 35px;
  }
  to {
    padding: 33px 35px 35px 35px;
  }
`

const PageLink = styled(props => (
  <Link activeClassName={'active'} {...props} />
))`
  &, &:visited {
    padding: 35px;
    white-space: pre;
    text-transform: lowercase;
    color: ${props => props.theme.color.normal};
    transition: all 0.3s;
  } 
  &:hover:not(.active) {
    color: ${props => props.theme.color.accent};
    padding: 32px 35px 38px 35px;
  }
  &.active {
    padding: 35px;
    animation: ${backDown} 0.6s;
    color: ${props => props.theme.color.normal};
  }
`

export default PageLink