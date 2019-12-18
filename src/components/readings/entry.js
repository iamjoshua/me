import _ from 'lodash'
import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import LazyLoad from 'react-lazyload'

// ================================ //
// Styles
// ================================ //

const fadeIn = keyframes`
  from {
    opacity: 0;
    margin-top: -5px;
  }
  to {
    opacity: 1  
    margin-top: 0;
  }
`

const Read = styled('article')`
  border-left: 5px solid ${props => props.theme.color.gray};
  margin: 20px;
  padding-left: 15px;
  transition: all .5s;
  animation: ${fadeIn} 0.6s;
  &:hover {
    border-color: ${props => props.theme.color.accent};
  }
`

const Title = styled.h1`
  margin-bottom: 0;
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.color.main};
`

const Subtitle = styled.h2`
  margin: 5px 0 10px 0;
  line-height: 20px;
  font-size: 15px;
  font-weight: 300;
  color: ${props => props.theme.color.main};
`

const Author = styled('address')`
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  font-style: normal;
  text-transform: uppercase;
  color: ${props => props.theme.color.accent};
  cursor: pointer;
  transition: all .5s;
 
  &:hover {
    margin-left: 5px;
  }
`

const Time = styled('time')`
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${props => props.theme.color.muted};
`

// ================================ //
// Component
// ================================ //

const getAuthors = (authors, filterFn) => {   
  let key = 0
  return _.map(authors, a => {
    const author = _.get(a, 'data.Name')
    const filter = () => filterFn({author})
    return <div key={'a' + key++} onClick={filter}>{author}</div>
  })
}

const Entry = ({ type, title, subtitle, author, completed, filterFn }) => (
  <LazyLoad throttle={50} height={100}>
    <Read>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Author>{getAuthors(author, filterFn)}</Author>
      <Time datetime={completed}>{completed}</Time>
    </Read>
  </LazyLoad>
)

export default Entry
