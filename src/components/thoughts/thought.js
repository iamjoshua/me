import React from 'react'
import styles from "./thought.module.scss"

class Thought extends React.Component {
  constructor(props) {
    super(props)
    this.state = {state: false}
  }
  handleClick () {
    this.setState({expanded: !this.state.expanded})
  }
  render () {
    let style = styles.thought
    style += this.props.isVisible ? ' visible' : ''
    console.log('visible:', style)

    //style += this.state.expanded ? styles.expanded : styles.thought
    return (
      <div className={style} onClick={this.handleClick.bind(this)}>
        <div>
          <div></div>
          {this.props.children}
          <div></div>
        </div>
        <div>
          More stuff here
        </div>
      </div>
    )
  }
}

export default Thought
