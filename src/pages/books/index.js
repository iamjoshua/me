import React from "react"
import BookSummary from "../../components/books/book-summary"
import VisibleDiv from "../../components/visiblediv"
import Link from "gatsby-link"
import styles from "./books.module.scss"

const BooksPage = ({data}) => {
  let Posts = false
  if (data && data.allBooksCsv) {
    let results = data.allBooksCsv.edges
    Posts = results.map(r => <BookSummary key={r.node.id} post={r.node} />)
  }

  return (
    <div className={styles.container}>
      <VisibleDiv>
        It seems to me that a mind doesn't contain knowledge but <Link to="./thoughts/mind-from-knowledge">emerges from it.</Link> These are the books that I've read and so they have certainly, for better or for worse, shaped my mind.
      </VisibleDiv>
      <div className={styles.innerContainer}>
        {Posts}
      </div>
    </div>
  )
}

export default BooksPage

export const query = graphql`
  query booksQuery {
    allBooksCsv {
      edges {
        node {
          Title
          Author
          Type
          Genre
          Completed
          Rating
        }
      }
    }
  }
`
