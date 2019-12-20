import _ from 'lodash'
import React, {useState} from 'react'
import styled from '@emotion/styled'
import Sticky from 'react-stickynode'
import Search from './search'

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
    font-weight: 400;
    color: black;
    cursor: pointer;
    &.active {
      font-weight: 600;
    }
  } 
`

// ================================ //
// Component
// ================================ //

const FilterNav = ({activeFilter, handleFilter}) => {   
    
  const onClick = (type) => {
    const params = type === 'All' ? {} : {type}    
    handleFilter(params)
  }

  const activeClass = (type) => {    
    return activeFilter === type ? 'active' : ''
  }
  
  const linkFor = (type, i) => {
    return <div key={`filter${i}`} className={activeClass(type)} onClick={() => onClick(type)}>{type}</div>
  }

  const types = ['All', 'Fiction', 'Nonfiction', 'Philosophy']
  const links = _.map(types, linkFor)

  return (
    <Sticky enabled={true} top={0}>
      <Filter>
        {links}
        <Search filterFn={handleFilter}/>
      </Filter>
    </Sticky>
  )
} 

export default FilterNav