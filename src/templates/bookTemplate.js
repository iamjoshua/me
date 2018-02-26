import React from "react"

export const pageQuery = graphql`
  query BookPostByPath($path: String!) {
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
    <div className="book-post-container">
      <div className="book-post">
        <h1>Book Title: {frontmatter.title}</h1>
        <h2><small>Started:</small>{frontmatter.date}</h2>
        <div
          className="books-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
