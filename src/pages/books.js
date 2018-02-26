import React from "react"
import Book from "../components/books/book"

export const pageQuery = graphql`
  query booksQuery {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "book" } } },
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

const Books = ({ data: { allMarkdownRemark: { edges } } }) => {
  const Posts = edges.map(edge => <Book key={edge.node.id} post={edge.node} />)
  return <div style={{margin: 150}}>{Posts}</div>;
}

export default Books
