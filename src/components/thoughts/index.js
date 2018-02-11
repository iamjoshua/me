import React from 'react'
import styles from './index.module.scss'
import Thought from './thought'
import TrackVisibility from 'react-on-screen';
import styles2 from "./thought.module.scss"

const Thoughts = (props) => {
  return (
  <div className={styles.container}>
    <TrackVisibility className={styles.item}>
      <Thought>
        An average idea is better than a great idea when it considers sustainability and the other does not.
      </Thought>
    </TrackVisibility>
  </div>
)}

export default Thoughts
