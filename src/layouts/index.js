import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Navigation from '../components/navigation'
import './index.scss'

class TemplateWrapper extends React.Component {
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
      <div id="main" className={loadedClass}>
        <Helmet
          title="Joshua Heiland | Artificial Intelligence Researcher"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Navigation />
        <div className='pageContainer' style={{minHeight: this.state.height}}>
          {this.props.children()}
        </div>
      </div>
    )
  }
}

export default TemplateWrapper
