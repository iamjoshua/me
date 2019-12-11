import React from "react"
import { graphql } from 'gatsby'
import Main from "../components/main"
import Paper from "../components/books"
import VisibleDiv from "../components/visiblediv"
import Link from "gatsby-link"
import styles from "./read.module.scss"
import SEO from "../components/seo"
import _ from 'lodash'
import getSlug from 'speakingurl'

class ReadPage extends React.Component {
  constructor(props) {
    super(props)
    const data = _.get(this.props.data, 'allAirtable.edges', [])
    const cleanUp = (b) => this.setAuthor(b.node.data)
    const books = data.length ? data.map(cleanUp) : []
    this.state = {books}
  }
  setAuthor (item) {
    item.Author = _.get(item, 'Author.[0].data.Name', item.Author)
    return item
  }
  setLocation () {
    const urlparts = _.split(this.props.location.pathname, '/')
    this.location = urlparts[2] || 'all'
    this.authorSlug = urlparts[3]
    console.log(this.authorSlug)
  }
  getBooks () {
    let key = 0
    const filter = this.getFilter(this.location)
    this.filtered = this.state.books.filter(filter)
    return this.filtered.map(b => <Paper key={key++} post={b} />)
  }
  getAuthor () {
    return _.get(this.filtered, '[0].Author')
  }
  getFilter (name) {
    switch (name.toLowerCase()) {
      case 'all':
        return (b) => true
      case 'fiction':
        return (b) => b.Type === 'Fiction'
      case 'nonfiction':
        return (b) => b.Type === 'Nonfiction'
      case 'philosophy':
        return (b) => b.Table === 'Philosophy'
      case 'favorites':
        return (b) => Number(b.Rating) > 4
      case 'author':
          return (b) => getSlug(b.Author) === this.authorSlug
      default:
        return (b) => true
    }
  }
  render () {
    // Wish I could call this elsewhere
    this.setLocation()
    const books = this.getBooks()

    return (
      <Main location={this.props.location}>
        <SEO title="Cool" />

        <div style={this.props.transition && this.props.transition.style} className={styles.container}>
          <VisibleDiv>
            It seems to me that a mind doesn't contain knowledge but <Link to="./thoughts/mind-from-knowledge">emerges from it.</Link> These are the books that I have read and assume have sculpted "me" to some extent for better or for worse.
          </VisibleDiv>

          <ul>
            <li><Link activeClassName={styles.active} to="/read">All</Link></li>
            <li><Link activeClassName={styles.active} to="/read/fiction">Fiction</Link></li>
            <li><Link activeClassName={styles.active} to="/read/nonfiction">Nonfiction</Link></li>
            <li><Link activeClassName={styles.active} to="/read/philosophy">Philosophy</Link></li>
            <li><Link activeClassName={styles.active} to="/read/favorites">Favorites</Link></li>
            {this.authorSlug ? (
              <li>
                <Link className={'author'} activeClassName={styles.active} partiallyActive={true} to={`/read/author/` + this.authorSlug}>
                  Author: {this.getAuthor()}
                </Link>
              </li>
            ) : ('')}
          </ul>

          <VisibleDiv>
          <div className={styles.innerContainer}>
            {books}
          </div>
        </VisibleDiv>

        </div>
     </Main>
    )
  }
}

export default ReadPage

//allAirtable(filter: {table: {in: ["Completed", "Read"]}}) {


export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allAirtable(filter: {table: {in: ["Completed","Papers"]}}) {
      edges {
        node {
          data {
            Title
            Subtitle
            Author {
              data {
                Name
              }
            }
            Type
            Rating
            Genre
            Review
            Completed
            Table
          }
        }
      }
    }
  }
`
