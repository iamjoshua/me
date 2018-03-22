import React from "react"
import Link from "gatsby-link"
import styles from './summary.module.scss'

const PostSummary = ({ post }) => (
  <article className={styles.summary}>
    <header>
      <Link to={post.frontmatter.path}>
        <h3>
          {post.frontmatter.title}
        </h3>
        <h4>
          {post.frontmatter.subtitle}
          <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
        </h4>
      </Link>
    </header>
    <div>
      {post.frontmatter.summary || post.excerpt}
    </div>
    <footer>
      <Link to={post.frontmatter.path}><small>Read More</small></Link>
    </footer>
  </article>
)

export default PostSummary
