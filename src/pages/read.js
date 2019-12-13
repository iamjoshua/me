import React from 'react'
import { graphql } from 'gatsby'
import eachRecord from '../utils/data'
import Main from '../components/main'
import Entry from '../components/readings/entry'

const ReadPage = ({data}) => {  

  const entry = ({id, data}) => <Entry key={id} {...data} />
  const entries = eachRecord(data, 'allAirtable', entry)

  return (
    <Main>
      <div>
        Things I've read
        {entries}
      </div>
    </Main>
  )
}

export const query = graphql`
  query HomePageQuery {
    allAirtable {
      edges {
        node {
          id
          data {
            Author
            Title
            Type
            Genre
          }
        }
      }
    }
  }
`

export default ReadPage

