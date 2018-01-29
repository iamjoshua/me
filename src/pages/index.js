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
    return (
      <div>
        <div className={styles.container} style={{height: this.state.height}}>
          <Header />
        </div>
      </div>
    )
  }
}

export default IndexPage
