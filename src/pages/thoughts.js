import React from "react"
import PostLink from "../components/post-link"

export const pageQuery = graphql`
  query thoughtsQuery {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "thought" } } },
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

const Thoughts = ({ data: { allMarkdownRemark: { edges } } }) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return <div style={{margin: 150}}>{Posts}</div>;
}

export default Thoughts
