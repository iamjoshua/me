import _ from 'lodash'
import React, {useState, useEffect} from 'react'
import styled from '@emotion/styled'

const EventEmitter2 = require('eventemitter2').EventEmitter2
const events = new EventEmitter2()

// ================================ //
// Settings
// ================================ //

const durations = {
  active: 200,
  emit: 50
}

// ================================ //
// Component
// ================================ //

const BaseCell = (props) => {

  let [isActive, setActive] = useState(false)

  const neighbors = [props.id - 1, props.id + 1]
  const activate = () => setActive(true)
  const subscribe = (neighbor) => events.on(neighbor, activate)
  const unsubscribe = (neighbor) => events.removeListener(neighbor, activate)

  useEffect(() => {
    const reset = () => setTimeout(() => setActive(false), durations.active)
    const timer = isActive ? reset() : false
    return function cleanUp () {
      clearTimeout(timer)
    }
  })

  useEffect(() => {
    const emit = () => setTimeout(() => events.emit(props.id), durations.emit)
    const timer = isActive ? emit() : false
    neighbors.map(subscribe)
    return function cleanUp () {
      neighbors.map(unsubscribe)
      clearTimeout(timer)
    }
  })

  useEffect(() => {
    if (props.shouldFire) activate()
  }, [])

  const style = isActive ? {
    background: '#5f1c5a',
    height: '15px'
  } : {}

  return (
    <div className={props.className} style={style} onMouseEnter={activate}></div>
  )
}  

// ================================ //
// Style
// ================================ //

const Cell = styled(BaseCell)`
  flex-grow: 1;
  height: 4px;
  z-index: -1;
  transition: all 0.3s;
  background: ${props => props.theme.color.accent};
`


export default Cell