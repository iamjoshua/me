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
    color: #6d6d6d;
    transition: all 0.3s;
  } 
  &:hover:not(.active) {
    color: #9c7d9a;
    padding: 32px 35px 38px 35px;
  }
  &.active {
    padding: 35px;
    animation: ${backDown} 0.1s;
    color: #9c7d9a;
  }
`

export default PageLink