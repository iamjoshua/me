import React from "react"
import BookSummary from "../../components/books/book-summary"
import VisibleDiv from "../../components/visiblediv"
import Link from "gatsby-link"
import styles from "./books.module.scss"

class BooksPage extends React.Component {
  constructor(props) {
    super(props)
    let data = this.props.data
    let books = (data && data.allGoogleSheetSheet1Row) ? data.allGoogleSheetSheet1Row.edges.map(b => b.node) : []
    this.state = {books, filterFn: (b) => true, clicked: 'All'}
  }
  filter (filterFn, name) {
    this.state.clicked
    filterFn = filterFn || this.state.filterFn
    this.setState({filterFn, clicked: name})
  }
  getBooks () {
    let key = 0
    return this.state.books.filter(this.state.filterFn).map(b => {
      let filterByAuthor = (n) => n.author === b.author
      let onClick = () => this.filter(filterByAuthor, 'Author')
      return <BookSummary key={key++} post={b} onClick={onClick} />
    })
  }
  filterLink (name, fn) {
    let className = this.state.clicked === name ? styles.active : ''
    let handleClick = this.filter.bind(this, fn, name)
    if (name === 'Author') {
      // don't render author link unless already displaying results for an author
      if (this.state.clicked !== 'Author') return
      name = 'Author'
      handleClick = () => false
    }
    return <li className={className} onClick={handleClick}>{name}</li>
  }
  render () {
    return (
      <div className={styles.container}>
        <VisibleDiv>
          It seems to me that a mind doesn't contain knowledge but <Link to="./thoughts/mind-from-knowledge">emerges from it.</Link> These are the books that I have read and assume have sculpted "me" to some extent for better or for worse.
        </VisibleDiv>

        <ul>
          {this.filterLink('All', (b) => true)}
          {this.filterLink('Fiction', (b) => b.type === 'Fiction')}
          {this.filterLink('Nonfiction', (b) => b.type === 'Nonfiction')}
          {this.filterLink('Favorites', (b) => Number(b.rating) > 4)}
          {this.filterLink('Author')}
        </ul>

        <div className={styles.innerContainer}>
          {this.getBooks()}
        </div>
      </div>
    )
  }
}

export default BooksPage

export const query = graphql`
  query booksQuery {
    allGoogleSheetSheet1Row {
  		totalCount
      edges {
        node {
          title
          author
          type
          rating
          genre
          review
          completed
        }
      }
    }
  }
`
