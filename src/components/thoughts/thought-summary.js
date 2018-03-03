import React from "react"
import Link from "gatsby-link"
import styles from './thought.module.scss'

const ThoughtSummary = ({ post }) => (
  <article className={styles.thought}>
    <header>
      <h3>
        <Link to={post.frontmatter.path}>
          {post.frontmatter.axiom}
        </Link>
      </h3>
    </header>
  </article>
)

export default ThoughtSummary
