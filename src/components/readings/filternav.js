// import React, {useState, useEffect} from 'react'
import React from 'react'
import styled from '@emotion/styled'
import Sticky from 'react-stickynode'


// ================================ //
// Styles
// ================================ //

const Filter = styled.div`
  margin: -1px 40px 0 40px;
  background: #ffffffeb;
  transition: all 0.3;
  box-sizing: border-box;
  .active  & {
    border-bottom: 1px solid ${props => props.theme.color.gray};
  }
  & > div {
    display: inline-block;
    padding: 15px;
    font-size: 12px;
    font-weight: 600;
    color: black;
    cursor: pointer;
    .active  & {
    }
  } 
`

// ================================ //
// Component
// ================================ //

const FilterNav = ({handleFilter}) => {    

  const onClick = (type) => {
    const params = type ? {type} : {}
    handleFilter(params)
  }

  return (
    <Sticky enabled={true} top={0}>
      <Filter>
        <div onClick={() => onClick()}>All</div>
        <div onClick={() => onClick('Fiction')}>Fiction</div>
        <div onClick={() => onClick('Nonfiction')}>Non Fiction</div>
        <div onClick={() => onClick('Philosophy')}>Philosophy</div>
      </Filter>
    </Sticky>
  )
} 

export default FilterNav