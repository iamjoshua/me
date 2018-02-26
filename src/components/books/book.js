import React from 'react'
import styles from "./book.module.scss"

class Book extends React.Component {
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
        {this.props.children}
      </div>
    )
  }
}

export default Book
