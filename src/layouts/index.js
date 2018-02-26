import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Navigation from '../components/navigation'
import './index.scss'

class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loaded: false}
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({loaded: true})
    }, 0)
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
        {this.props.children()}
      </div>
    )
  }
}

export default TemplateWrapper
