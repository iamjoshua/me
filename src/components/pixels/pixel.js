import React from 'react'
import styles from "./index.module.scss"

class Pixel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {firing: false}
  }
  componentDidMount () {
    this.fire()
  }
  componentWillUnmount () {
    clearTimeout(this.timer)
    clearTimeout(this.nextEvent)
  }
  fire () {
    // add firing class
    this.setState({firing: true})
    // reset class after effect has finished
    this.timer = setTimeout(() => {
      this.setState({firing: false})
      let randomDelay = Math.floor((Math.random() * 10) + 1) * 1000
      this.nextEvent = setTimeout(this.fire.bind(this), randomDelay)
    }, 1000)
  }
  render () {
    let fireState = this.state.firing ? styles.firing : ''
    return (
      <div className={styles.pixel + ' ' + fireState}>
      </div>
    )
  }
}

export default Pixel
