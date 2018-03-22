import React from "react"
import Link from "gatsby-link"
import styles from './post.module.scss'

const Post = ({post, editable, handleChange, transition}) => {
  let fn = handleChange || function () {}

  return (
    <div style={transition && transition.style } className={styles.container}>
      <div className={styles.back}>
        <Link to='/blog'>back</Link>
      </div>
      <div className={styles.post}>
        <header>
          <h1 contentEditable={editable}
              onKeyUp={(e) => fn('title', e.target.innerHTML)}
              dangerouslySetInnerHTML={{__html: post.title}}/>
          <h2 contentEditable={editable}
                onKeyUp={(e) => fn('title', e.target.innerHTML)}
                dangerouslySetInnerHTML={{__html: post.subtitle}}/>
          <time contentEditable={editable}
                dateTime={post.date}
                onKeyUp={(e) => fn('date', e.target.innerHTML)}
                dangerouslySetInnerHTML={{__html: post.date}}/>
        </header>      

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
