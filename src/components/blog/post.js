import React from "react"
import ReadingTime from 'reading-time'
import Link from "gatsby-link"
import styles from './post.module.scss'

const Post = ({post, editable, handleChange, transition}) => {
  let fn = handleChange || function () {}
  const readingTime = ReadingTime(post.html)
  const twitterMessage = `I just read ${post.title} by @iamjoshua `
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
          <small>{readingTime.words} words</small>
          <small>{readingTime.text}</small>
        </header>

        <div contentEditable={editable}
             onKeyUp={(e) => fn('html', e.target.innerHTML)}
             className={styles.content}
             dangerouslySetInnerHTML={{__html: post.html}}
        />
      <a href="https://twitter.com/intent/tweet?screen_name=iamjoshua&ref_src=twsrc%5Etfw" class="twitter-mention-button" data-text={twitterMessage} data-show-count="false">Tweet to @iamjoshua</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      <a href="https://twitter.com/intent/tweet?screen_name=TwitterDev&ref_src=twsrc%5Etfw" class="twitter-mention-button" data-size="large" data-text="Just read... by @iamjoshua" data-show-count="false">Tweet to @TwitterDev</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>
    </div>
  )
}

export default Post
