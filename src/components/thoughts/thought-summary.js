import React from "react"
import Link from "gatsby-link"
import styles from './summary.module.scss'

const ThoughtSummary = ({ post }) => (
  <article className={styles.thought}>
    <Link to={post.frontmatter.path}>
      {post.frontmatter.axiom}
    </Link>
  </article>
)

export default ThoughtSummary
