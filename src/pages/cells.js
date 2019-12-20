import _ from 'lodash'
import React from 'react'
import styled from '@emotion/styled'
import Cell from '../components/main/cell'

const EventEmitter2 = require('eventemitter2').EventEmitter2
const events = new EventEmitter2()

// ================================ //
// Styles
// ================================ //

const Container = styled.div`
  /* height: 50px; */
  width: 100%;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  z-index: 2;
  border: 1px black solid;
`



// ================================ //
// Page
// ================================ //


const CellsPage = () => {

  const cells = _.times(100, (i) => <Cell key={i} id={i} />)

  return (
    <Container>
      {cells}
    </Container> 
  )
} 

export default CellsPage