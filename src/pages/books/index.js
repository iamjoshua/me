import React from "react"
import BookSummary from "../../components/books/book-summary"
import styles from "./books.module.scss"

export const pageQuery = graphql`
  query booksQuery {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "book" }, published: { eq: true } } },
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

const BooksPage = ({data}) => {
  let Posts = false
  if (data.allMarkdownRemark) {
    let results = data.allMarkdownRemark.edges
    Posts = results.map(r => <BookSummary key={r.node.id} post={r.node} />)
  }

  return <div style={{margin: 150}}>{Posts}</div>;
}

export default BooksPage
