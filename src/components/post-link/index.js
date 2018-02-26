import React from "react"
import Link from "gatsby-link"
import styles from './index.module.scss'

const PostLink = ({ post }) => (
  <div className={styles.post}>
    <h3>
      <Link to={post.frontmatter.path}>
        {post.frontmatter.title}
      </Link>
    </h3>
    <small>{post.frontmatter.date}</small>
    <div>
      {post.excerpt}
    </div>
    <div>
      <Link to={post.frontmatter.path}>Read More</Link>
    </div>
  </div>
)

export default PostLink
