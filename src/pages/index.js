import React from 'react'
import Pixels from '../components/pixels'
import Intro from '../components/intro'
import styles from "./index.module.scss"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    // used to fade in on load
    let classes = 'initHide ' + styles.container
    return (
      <div style={this.props.transition && this.props.transition.style }>
        <div className={classes}>
          <Intro />
        </div>
      </div>
    )
  }
}

export default IndexPage
