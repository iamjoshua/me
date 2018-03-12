import React from "react"
import Link from "gatsby-link"
import styles from './post.module.scss'

const Post = ({post, editable, handleChange}) => {
  let fn = handleChange || function () {}

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <Link to='/blog'>back</Link>
      </div>
      <div className={styles.post}>
        <h1 contentEditable={editable}
            onKeyUp={(e) => fn('title', e.target.innerHTML)}
            dangerouslySetInnerHTML={{__html: post.title}}/>
        <time contentEditable={editable}
              dateTime={post.date}
              onKeyUp={(e) => fn('date', e.target.innerHTML)}
              dangerouslySetInnerHTML={{__html: post.date}}/>
        <div contentEditable={editable}
             onKeyUp={(e) => fn('html', e.target.innerHTML)}
             className={styles.content}
             dangerouslySetInnerHTML={{__html: post.html}}
        />
      </div>
    </div>
  )
}

export default Post
