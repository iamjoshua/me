import React from "react"
import BookSummary from "../../components/books/book-summary"
import VisibleDiv from "../../components/visiblediv"
import Link from "gatsby-link"
import styles from "./books.module.scss"

class BooksPage extends React.Component {
  constructor(props) {
    super(props)
    let data = this.props.data
    let books = (data && data.allBooksCsv) ? data.allBooksCsv.edges.map(b => b.node) : []
    this.state = {books, params: {}}
  }
  componentDidMount () {
  }
  componentWillUnmount () {
  }
  filter (params, name) {
    this.state.clicked
    this.setState({params, clicked: name})
  }
  getBooks () {
    let books = this.state.books
    for (let key in this.state.params) {
      books = books.filter(b => b[key] === this.state.params[key])
    }
    let key = 0
    return books.map(b => <BookSummary key={key++} post={b} onClick={this.filter.bind(this)} />)
  }
  filterLink (name, params) {
    let className = this.state.clicked === name ? styles.active : ''
    let handleClick = this.filter.bind(this, params, name)
    if (name === 'Author') {
      if (this.state.clicked !== 'Author') return
      name = name + ': ' + this.state.params.Author
      handleClick = () => {}
    }
    return <li className={className} onClick={handleClick}>{name}</li>
  }
  render () {
    return (
      <div className={styles.container}>
        <VisibleDiv>
          It seems to me that a mind doesn't contain knowledge but <Link to="./thoughts/mind-from-knowledge">emerges from it.</Link> These are the books that I've read and so they have certainly, for better or for worse, shaped my mind.
        </VisibleDiv>

        <ul>
          {this.filterLink('All', {})}
          {this.filterLink('Fiction', {Type: 'Fiction'})}
          {this.filterLink('Nonfiction', {Type: 'Nonfiction'})}
          {this.filterLink('Author', {})}
        </ul>

        <div className={styles.innerContainer}>
          {this.getBooks()}
        </div>
      </div>
    )
  }
}

// const BooksPage = ({data}) => {
//   let Posts = false
//   if (data && data.allBooksCsv) {
//     let results = data.allBooksCsv.edges
//     let key = 0
//     Posts = results.map(r => <BookSummary key={key++} post={r.node} />)
//   }
//
//   return (
    // <div className={styles.container}>
    //   <VisibleDiv>
    //     It seems to me that a mind doesn't contain knowledge but <Link to="./thoughts/mind-from-knowledge">emerges from it.</Link> These are the books that I've read and so they have certainly, for better or for worse, shaped my mind.
    //   </VisibleDiv>
    //
    //   <div className={styles.innerContainer}>
    //     {Posts}
    //   </div>
    // </div>
//   )
// }

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
