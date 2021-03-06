import React from "react"
import ReadingTime from 'reading-time'
import Link from "gatsby-link"
import Subscribe from './subscribe'
import Helmet from 'react-helmet'
import styles from './post.module.scss'

const Post = ({post, editable, handleChange, transition}) => {
  let fn = handleChange || function () {}
  const readingTime = ReadingTime(post.html)
  return (
    <div style={transition && transition.style } className={styles.container}>
      <Helmet
        title={post.title + ': ' + post.subtitle}
        meta={[
          { name: 'description', content: post.subtitle },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <div className={styles.back}>
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
          <small>{readingTime.words} words</small>
          <small>{readingTime.text}</small>
        </header>

        <div contentEditable={editable}
             onKeyUp={(e) => fn('html', e.target.innerHTML)}
             className={styles.content}
             dangerouslySetInnerHTML={{__html: post.html}}
        />

        <Subscribe url={post.url} />
      </div>
    </div>
  )
}

export default Post
