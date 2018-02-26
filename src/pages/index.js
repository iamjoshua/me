import React from 'react'
import Header from '../components/Header'
import Thoughts from '../components/thoughts'
import styles from "./index.module.scss"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {height: 100, transform: 0}
    // get around binding this for listeners
    this.setHeight = this.setHeight.bind(this)
  }
  componentDidMount () {
    this.setHeight()
    window.addEventListener("resize", this.setHeight)
  }
  componentWillUnmount () {
    window.removeEventListener("resize", this.setHeight)
  }
  setHeight () {
    this.setState({height: window.innerHeight})
  }
  handleScroll (event) {
    // console.log(event)
    // let scrollTop = event.srcElement.body.scrollTop,
    //     itemTranslate = Math.min(0, scrollTop/3 - 60)
    //
    // this.setState({
    //   transform: this.state.transform + 5
    // })
    // console.log(this.state.transform)
  }
  render () {
    // used to fade in on load
    let classes = 'initHide ' + styles.container
    return (
      <div style={{marginTop: this.state.transform}}>
        <div className={classes} style={{height: this.state.height}}>
          <Header />
        </div>
      </div>
    )
  }
}

export default IndexPage
