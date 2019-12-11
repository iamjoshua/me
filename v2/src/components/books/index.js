import React from "react"
import Link from "gatsby-link"
import styles from './book.module.scss'
import getSlug from 'speakingurl'
import VisibleDiv from "../visiblediv"

const BookSummary = ({ post }) => (
    <article className={styles.post}>
      <header>
        <h3>{post.Title}</h3>
        {post.Subtitle ? (<h4>{post.Subtitle}</h4>) : ('')}

        <h5>
          <Link to={`/read/author/` + getSlug(post.Author)}>{post.Author}</Link>
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
