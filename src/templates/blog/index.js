import React from "react"
import Link from "gatsby-link"
import styles from "./post.module.scss"

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`

// data prop will be injected by the GraphQL query below.
export default function Template({data}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;
  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <Link to='/blog'>back</Link>
      </div>
      <div className={styles.post}>
        <h1>{frontmatter.title}</h1>
        <time dateTime={frontmatter.date}>{frontmatter.date}</time>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
