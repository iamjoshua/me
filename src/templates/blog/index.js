import React from "react"
import Link from "gatsby-link"
import Post from "../../components/blog/post"

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
  const {title, date} = data.markdownRemark.frontmatter
  const {html} = data.markdownRemark
  const post = {title, date, html}
  return (
    <Post post={post} />
  )
}
