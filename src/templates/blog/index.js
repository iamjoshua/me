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
        subtitle
        summary
      }
    }
  }
`

// data prop will be injected by the GraphQL query below.
export default function Template(params) {
  const {data, transition} = params
  const {title, subtitle, summary, date} = data.markdownRemark.frontmatter
  const {html} = data.markdownRemark
  const url = 'https://www.joshuaheiland.com' + params.location.pathname
  const post = {title, subtitle, summary, date, html, url}

  return params.pathContext.edit ? <EditPost transition={transition} post={post} location={params.location} /> : <Post transition={transition} post={post} />
}
