import React from 'react'
import Link from 'gatsby-link'
import styles from './index.module.scss'

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this._distanceFromTop = 0
    this._resize = this.resize.bind(this)
    this.state = {minimize: false}
  }
  componentDidMount () {
    document.addEventListener('scroll', this._resize)
  }
  componentwillUnmount () {
    document.removeEventListener('scroll', this._resize)
  }
  resize () {
    const offset = window.pageYOffset
    const minimize = offset > this._distanceFromTop
    this._distanceFromTop = offset
    if (this.state.minimize !== minimize) this.setState({minimize})
  }
  render () {
    let minimizedStyle = this.state.minimize ? styles.minimize : ''

    return (
      <nav className={styles.mainNav + ' ' + minimizedStyle}>
        <div className={styles.name}>
          <Link className='full' to="/">joshua heiland</Link>
          <Link className='short' to="/">JH</Link>
        </div>
        <ul>
          <li><Link activeClassName={styles.active} to="/blog">blog</Link></li>
          <li><Link activeClassName={styles.active} to="/thoughts">thoughts</Link></li>
          <li><Link activeClassName={styles.active} to="/books">reading list</Link></li>
        </ul>
      </nav>
    )
  }
}

export default Navigation
