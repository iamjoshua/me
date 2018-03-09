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
export default function Template(params) {
  let {data} = params
  let editable = params.location.search === '?edit=true'
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  let sourceLink = `https://github.com/iamjoshua/writings/blob/master${frontmatter.path}.md`
  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <div className={styles.axiom}>
          <div>It seems to me that:</div>
          <h1 contentEditable={editable} dangerouslySetInnerHTML={{ __html: frontmatter.axiom }} />
          <div className={styles.bar}></div>
        </div>

        <div className={styles.content}>
          <div contentEditable={editable} dangerouslySetInnerHTML={{ __html: html }} />
          <div className={styles.source}><a href={sourceLink}>Versions</a></div>
        </div>
      </div>
    </div>
  )
}
