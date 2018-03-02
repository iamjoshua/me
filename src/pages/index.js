import React from 'react'
import Pixels from '../components/pixels'
import Intro from '../components/intro'
import styles from "./index.module.scss"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {height: 100}
  }
  // componentDidMount () {
  //   // this.setHeight()
  //   // get around binding this for listeners
  //   // this._setHeight = this.setHeight.bind(this)
  //   // window.addEventListener("resize", this._setHeight)
  // }
  // componentWillUnmount () {
  //   window.removeEventListener("resize", this._setHeight)
  // }
  // setHeight () {
  //   this.setState({height: window.innerHeight})
  // }
  render () {
    // used to fade in on load
    let classes = 'initHide ' + styles.container
    return (
      <div style={{flexBasis: '100%'}}>
        <div className={classes}>
          <Intro />
        </div>
      </div>
    )
  }
}

export default IndexPage
