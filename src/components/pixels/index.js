import React from 'react'
import Pixel from './pixel'
import styles from './index.module.scss'

const Pixels = (props) => {
  let pixels = []
  for (let i = 0; i < 1050; i++) {
    pixels.push(<Pixel key={i} />)
  }
  return (
    <sections className={styles.container}>
      {pixels}
    </sections>
  )
}

export default Pixels
