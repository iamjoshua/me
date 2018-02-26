import React from 'react'
import Link from 'gatsby-link'
import styles from './index.module.scss'

const Navigation = (props) => {
  return (
    <nav className={styles.mainNav}>
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

export default Navigation
