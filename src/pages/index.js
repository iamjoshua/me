import React from 'react'
import Header from '../components/Header'
import styles from "./index.module.scss"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {height: 100}
  }
  componentDidMount () {
    this.setHeight()
    window.addEventListener("resize", this.setHeight.bind(this))
  }
  setHeight () {
    this.setState({height: window.innerHeight})
  }
  render () {
    // used to fade in on load
    let classes = 'initHide ' + styles.container
    return (
      <div className={classes} style={{height: this.state.height}}>
        <Header />
      </div>
    )
  }
}

export default IndexPage
