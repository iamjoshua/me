import React from "react"
import Link from "gatsby-link"
import styles from './book.module.scss'

const BookSummary = ({ post, onClick }) => (
  <article className={styles.post}>
    <header>
      <h3>{post.Title}</h3>
      {post.Subtitle ? (<h4>{post.Subtitle}</h4>) : ('')}  

      <h5 onClick={onClick.bind(this, {author: post.Author}, 'Author')}>
        {post.Author}
      </h5>
      <time dateTime={post.Completed}>{post.Completed}</time>
    </header>
    <div>
    </div>
    <footer>
    </footer>
  </article>
)

export default BookSummary
