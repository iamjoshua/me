import React from 'react'
import Navigation from '../navigation'
// import PropTypes from 'prop-types'
import './main.module.scss'
import Transitions from '../transition'

class MainTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loaded: false, height: 1000}
  }
  componentDidMount () {
    this.setHeight()
    this._setHeight = this.setHeight.bind(this)
    window.addEventListener("resize", this._setHeight)
    setTimeout(() => {
      this.setState({loaded: true})
    }, 0)
  }
  componentWillUnmount () {
    window.removeEventListener("resize", this._setHeight)
  }
  setHeight () {
    this.setState({height: window.innerHeight})
  }
  render () {
    // used to fade in on load
    let loadedClass = this.state.loaded ? 'loaded' : ''

    return (
      <div id="main" className={loadedClass} style={this.props.transition && this.props.transition.style}>
        <Navigation location={this.props.location} />
        <Transitions>
          <div className='pageContainer' style={{minHeight: this.state.height}}>
            {this.props.children}
          </div>
        </Transitions>
      </div>
    )
  }
}

export default MainTemplate
