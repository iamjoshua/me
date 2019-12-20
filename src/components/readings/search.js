import _ from 'lodash'
import React, {useState, useEffect, useRef} from 'react'
import styled from '@emotion/styled'

// ================================ //
// Styles
// ================================ //

const SearchContainer = styled.div`
  display: inline-block;
`

// ================================ //
// Component
// ================================ //

const Search = ({ filterFn }) => {
    
  const [isShowing, setShowing] = useState(false)
  const inputEl = useRef(null)

  let timer
  const handleChange = (e) => {
    const value = _.toLower(e.target.value)    
    const search = value ? {search: value} : {}
    clearTimeout(timer)
    timer = setTimeout(() => filterFn(search), 300)
  }

  const show = () => setShowing(true)
  const hide = () => {       
    _.set(inputEl, 'current.value', '') 
    setShowing(false)
  } 


  useEffect(() => {
    if (isShowing) inputEl.current.focus()
  })

  const iconStyle = {
    display: isShowing ? 'none' : 'inherit',
  }

  const inputStyle = {
    display: isShowing ? 'inherit' : 'none',
    border: 'none',
    borderBottom: '1px black solid',
    outline: 'none'
  }

  return (
    <SearchContainer>
      <div style={iconStyle} onClick={show}>Search</div>
      <input ref={inputEl} style={inputStyle} onChange={handleChange} onBlur={hide} />
    </SearchContainer>
  )
}

export default Search
