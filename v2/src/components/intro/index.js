import React from 'react'
import VisibleDiv from '../visiblediv'
import styles from './index.module.scss'

const Header = () => (
  <div className={styles.container}>
    <div></div>
    <div>
      <VisibleDiv>
        <h1>SF-based thinker & <br/> artificial intelligence researcher</h1>
        <h2>designer, coder, writer</h2>
      </VisibleDiv>
    </div>
  </div>
)

export default Header
