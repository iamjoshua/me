import React from 'react'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import HamburgerMenu from 'react-hamburger-menu'
import styles from './index.module.scss'

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this._distanceFromTop = 0
    this._resize = this.resize.bind(this)
    this.state = {minimize: false, mobileVisible: false}
  }
  componentDidMount () {
    document.addEventListener('scroll', this._resize)
  }
  componentwillUnmount () {
    document.removeEventListener('scroll', this._resize)
  }
  componentWillReceiveProps(nextProps) {
    // hide mobile menu if visible when changing path
    if (nextProps.location.pathname != this.location) {
      this.setState({mobileVisible: false})
      this.location = nextProps.location.pathname
    }
  }
  resize () {
    const offset = window.pageYOffset
    const minimize = offset > this._distanceFromTop
    this._distanceFromTop = offset
    if (this.state.minimize !== minimize) this.setState({minimize})
  }
  onHamburger () {
    let mobileVisible = !this.state.mobileVisible
    this.setState({mobileVisible})
  }
  render () {
    let minimizedStyle = this.state.minimize ? styles.minimize : ''
    let mobileMenuStyle =  this.state.mobileVisible ? styles.visible : ''

    return (
      <nav className={styles.mainNav + ' ' + minimizedStyle}>
        <div className={styles.name}>
          <Link className='full' to="/">joshua heiland</Link>
          <Link className='short' to="/">JH</Link>
        </div>
        <div className={styles.menu}>
          <a className={styles.burger} onClick={this.onHamburger.bind(this)}>
            <HamburgerMenu
            	isOpen={this.state.mobileVisible}
            	width={18}
            	height={15}
            	strokeWidth={1}
            	rotate={0}
            	color='black'
            	borderRadius={0}
            	animationDuration={0.5}
            />
          </a>
          <ul className={mobileMenuStyle}>
            <li><Link activeClassName={styles.active} to="/blog">blog</Link></li>
            <li><Link activeClassName={styles.active} to="/thoughts">thoughts</Link></li>
            <li><Link activeClassName={styles.active} to="/books">reading list</Link></li>
          </ul>
        </div>
        <a className={styles.twitterIcon} href="https://twitter.com/iamJoshua">Follow @iamjoshua</a>
      </nav>
    )
  }
}

export default Navigation
