import React from 'react'
// import styles from "./index.module.scss"

class Centered extends React.Component {
  constructor(props) {
    super(props)
    this.state = {height: 100, transform: 0}
  }
  componentDidMount () {
    this.setHeight()
    window.addEventListener("resize", this.setHeight.bind(this))
    window.addEventListener('scroll', this.setHeight.bind(this))
  }
  setHeight () {
    this.setState({height: window.innerHeight})
  }
  render () {
    return (
      <div style={{position: 'fixed', top: 10}}>
        {this.state.height}
        {this.props.children}
      </div>
    )
  }
}

export default Centered
