import React from "react"
import Link from "gatsby-link"
import styles from './book.module.scss'

const BookSummary = ({ post }) => (
  <article className={styles.post}>
    <header>
      <h3>
          {post.Title}
      </h3>
      <h4>
        {post.Author}
      </h4> 
      <time dateTime={post.Completed}>{post.Completed}</time>
    </header>
    <div>
    </div>
    <footer>
    </footer>
  </article>
)

export default BookSummary
