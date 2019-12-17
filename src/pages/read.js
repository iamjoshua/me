import _ from 'lodash'
import React, {useState, useEffect} from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { eachRecord } from '../utils/data'
// import Main from '../components/main'
import Entry from '../components/readings/entry'
import LazyLoad from 'react-lazyload'

// ================================ //
// Styles
// ================================ //

const Entries = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  padding: ${props => props.theme.space};
`

const Filter = styled.div`

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
    const all = [...books, ...papers]
    setEntries(all)
    setFiltered(all)
  }, [data])

  const filterBy = (params) => {
    const criteria = params.author ? (e) => _.find(e.data.author, {
      data: {Name: params.author}
    }) : {data: params}
    const f = _.filter(entries, criteria)

    setFiltered(f)
  }

  let k = 0
  return (
    <>
      <Filter>
      < div onClick={() => filterBy({type: 'Fiction'})}>Fiction</div>
        <div onClick={() => filterBy({type: 'Nonfiction'})}>Non Fiction</div>
        <div onClick={() => filterBy({type: 'Philosophy'})}>Philosophy</div>
      </Filter>
      <Entries>
        {filtered.map(({key, data}) => (
          <LazyLoad key={key + k++} throttle={50} height={100}>
            <Entry filterFn={filterBy} {...data}  />
          </LazyLoad>
        ))}
      </Entries>
    </>
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

