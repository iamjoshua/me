import React from 'react'
import styles from './index.module.scss'
import Book from './book'
import TrackVisibility from 'react-on-screen';

const Books = (props) => {
  return (
  <div className={styles.container}>
    <TrackVisibility className={styles.item}>
      <Book>
        Some thoughts that I frequently reflect on...
      </Book>
    </TrackVisibility>
  </div>
)}

export default Books
