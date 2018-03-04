import React from "react"
import Link from "gatsby-link"
import styles from './book.module.scss'

const BookSummary = ({ post, onClick }) => (
  <article className={styles.post}>
    <header>
      <h3>
        {post.title}
      </h3>
      <h4 onClick={onClick.bind(this, {author: post.author}, 'Author')}>
        {post.author}
      </h4>
      <time dateTime={post.completed}>{post.completed}</time>
    </header>
    <div>
    </div>
    <footer>
    </footer>
  </article>
)

export default BookSummary
