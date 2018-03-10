import React from "react"
import Link from "gatsby-link"
import styles from './summary.module.scss'

const PostSummary = ({ post }) => (
  <article className={styles.summary}>
    <header>
      <h3>
        <Link to={post.frontmatter.path}>
          {post.frontmatter.title}
        </Link>
      </h3>
      <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
    </header>
    <div>
      {post.excerpt}
    </div>
    <footer>
      <Link to={post.frontmatter.path}><small>Read More</small></Link>
    </footer>
  </article>
)

export default PostSummary
