import React from "react"
import Link from "gatsby-link"
import styles from './post.module.scss'

const Post = ({post, editable}) => (
  <div className={styles.container}>
    <div className={styles.back}>
      <Link to='/blog'>back</Link>
    </div>
    <div className={styles.post}>
      <h1 contentEditable={editable} dangerouslySetInnerHTML={{__html: post.title}}/>
      <time dateTime={post.date}>{post.date}</time>
      <div contentEditable={editable}
        className={styles.content}
        dangerouslySetInnerHTML={{__html: post.html}}
      />
    </div>
  </div>
)

export default Post
