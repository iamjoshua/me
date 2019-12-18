import _ from 'lodash'
import React, {useState, useEffect} from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { eachRecord } from '../utils/data'
import animateScrollTo from 'animated-scroll-to'
import Entry from '../components/readings/entry'
import FilterNav from '../components/readings/filternav'

// ================================ //
// Styles
// ================================ //

const Container = styled.div`
  /* min-height: 900px; */
`

const Header = styled.div`
  width: 60%;
  margin: 40px;
  font-size: 25px;
  font-weight: 100;
  line-height: 45px;  
  color: #9b7d9a;
`

const Entries = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  padding: ${props => props.theme.space};
`

// ================================ //
// Component
// ================================ //

const ReadPage = ({data}) => {    

  const [entries, setEntries] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {    
    const entry = (key, data) => ({key, data})//<Entry key={key} {...data} />
    const books = eachRecord(data, 'books', entry)
    const papers = eachRecord(data, 'papers', entry)
    const all = sortBy([...books, ...papers], 'completed')
    setEntries(all)
    setFiltered(all)
  }, [data])

  const filterBy = (params) => {
    const criteria = params.author ? (e) => _.find(e.data.author, {
      data: {Name: params.author}
    }) : {data: params}
    
    let f = _.filter(entries, criteria)
    
    f = sortBy(f, 'completed')
    
    setFiltered(f)
  }

  const sortBy = (items, field) => {
    return _.sortBy(items, [(e) => (e.data[field])]).reverse()
  }

  const handleFilter = (params) => {    
    const div = document.querySelector('.scrollHere')
    animateScrollTo(div, {maxDuration: 100})
    filterBy(params)

      // animateScrollTo(div, {maxDuration: 600}).then((pos) => {
    //   filterBy(params)
    // })
  }

  let k = 0
  const items = filtered.map(({key, data}) => (
    <Entry key={key + k++} filterFn={handleFilter} {...data} />
  ))

  return (
    <Container style={{minHeight: window.outerHeight + 150}}>
      <Header>
        It seems to me that a mind doesn't contain knowledge but emerges from it. These are the things that I have read and in having read them assume have contributed to "me" to some extent (for better or for worse.)
      </Header>
      <div className="scrollHere"></div>
      <FilterNav handleFilter={handleFilter}></FilterNav>
      <Entries>
        {items}
      </Entries>
    </Container>
  )
}

// ================================ //
// Data Query
// ================================ //

export const query = graphql`
  query ReadPageQuery {
    papers: allAirtable(filter: {table: {eq: "Papers"}}) {
      nodes {
        data {
          Title
          Completed
          Type
          Author {
            data {
              Name
            }
          }
        }
      }
    }
    books: allAirtable(filter: {table: {eq: "Completed"}}) {
      nodes {
        data {
          Title
          Subtitle
          Completed
          Type
          Author {
            data {
              Name
            }
          }
        }
      }
    }
  }
`

export default ReadPage

