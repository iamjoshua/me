import React from "react"
import Link from "gatsby-link"
import styles from "./thought.module.scss"

export const pageQuery = graphql`
  query ThoughtPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        axiom
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
      <div className={styles.post}>
        <h1 className={styles.axiom}>{frontmatter.axiom}</h1>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}
