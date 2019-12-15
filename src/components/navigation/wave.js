import _ from 'lodash'
import React from 'react'
import styled from '@emotion/styled'

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
`

// ================================ //
// Cell
// ================================ //

const totalCells = 50
let location = 0
const startingPoint = (i) => {
  const last = (totalCells - 1)
  if (i === last) location = _.random(0, totalCells)
  return location
}

class BaseCell extends React.Component  {
  constructor(props) {
    super(props)
    this.state = { 
      active: false
    }

    this.activate = this.activate.bind(this)
  }
  componentDidMount() {
    this.neighbors = [this.props.id - 1, this.props.id + 1]
    this.neighbors.map(this.listen.bind(this))
    // if (this.props.id === (totalCells / 2)) {      
    if (this.props.id === startingPoint(this.props.id)) {      
        setTimeout(() => this.activate(), 10)
    }
    this.mounted = true
  }
  componentWillUnmount() {
    this.neighbors.map(this.stop.bind(this))
  }
  listen (neighbor) {
    events.on(neighbor, this.activate)
  }
  stop (neighbor) {
    this.mounted = false
    events.removeListener(neighbor, this.activate)
  }
  activate () {
    if (this.state.active) return
    setTimeout(() => {
      if (!this.mounted) return
      this.setState({active: true})
      events.emit(this.props.id)
      setTimeout(() => {
        if (!this.mounted) return
        this.setState({active: false})
      }, 100)
    }, 20) 
  }
  render () {
    const style = this.state.active ? {
      background: '#5f1c5a',
      height: '15px'
    } : {}
    return (
      <div className={this.props.className} style={style} onMouseEnter={this.activate}></div>
    )
  }
}  

const Cell = styled(BaseCell)`
  flex-grow: 1;
  height: 4px;
  z-index: -1;
  transition: all 0.3s;
  background: ${props => props.theme.color.accent};
`

// ================================ //
// Component
// ================================ //

const cells = _.times(totalCells, (i) => <Cell key={i} id={i} />)

const Wave = () => (
  <Container>
    {cells}
  </Container>
)

export default Wave
