import React from "react"
import PostLink from "../components/post-link"

export const pageQuery = graphql`
  query thoughtsQuery {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "thought" }, published: { eq: true } } },
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            completed
          }
        }
      }
    }
  }
`

const Thoughts = ({data}) => {
  let Posts = false
  if (data.allMarkdownRemark) {
    let results = data.allMarkdownRemark.edges
    Posts = results.map(r => <PostLink key={r.node.id} post={r.node} />)
  }

  return <div style={{margin: 150}}>{Posts}</div>;
}

export default Thoughts
