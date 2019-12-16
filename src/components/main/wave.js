import _ from 'lodash'
import React, {useState, useEffect} from 'react'
import styled from '@emotion/styled'
import Cell from './cell'

const EventEmitter2 = require('eventemitter2').EventEmitter2
const events = new EventEmitter2()

// ================================ //
// Styles
// ================================ //

const Container = styled.div`
  position: fixed;
  bottom: 0;
  /* height: 50px; */
  width: 100%;
  display: flex;
  align-items: flex-end;
  z-index: 2;
`

// ================================ //
// Cell
// ================================ //

// const totalCells = 50
// let location = 0
// const startingPoint = (i) => {
//   const last = (totalCells - 1)
//   if (i === last) location = _.random(0, totalCells)
//   return location
// }

// ================================ //
// Component
// ================================ //

const Wave = () => {
  console.log('wave loaded');
  const totalCells = 50
  const shouldFire = (i) => i === _.random(0, totalCells)
  const cells = _.times(totalCells, (i) => <Cell key={i} id={i} shouldFire={shouldFire(i)}/>)

  return (
  <Container>
    {cells}
  </Container>
)}

export default Wave
