import React from "react"
import Link from "gatsby-link"
import Post from "../../components/blog/post"
import EditPost from "../../pages/blog/new"

export const pageQuery = graphql`
  query BlogPostByPath($url: String!) {
    markdownRemark(frontmatter: { path: { eq: $url } }) {
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
export default function Template(params) {
  const {data, transition} = params
  const {title, date} = data.markdownRemark.frontmatter
  const {html} = data.markdownRemark
  const post = {title, date, html}

  return params.pathContext.edit ? <EditPost transition={transition} post={post} location={params.location} /> : <Post transition={transition} post={post} />
}
