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

  let [entries, setEntries] = useState([])

  useEffect(() => {    
    const entry = (key, data) => ({key, data})//<Entry key={key} {...data} />
    const records = eachRecord(data, 'allAirtable', entry)
    setEntries(records)
  }, [])


  const somethings = entries.map(({key, data}) => (  
    <LazyLoad key={key} throttle={50} height={100}>
      <Entry {...data} />
    </LazyLoad>
  ))

  return (
    <>
      <Filter>
        <div>Fiction</div>
      </Filter>
      <Entries>
        {somethings}
      </Entries>
    </>
  )
}

// ================================ //
// Data Query
// ================================ //

export const query = graphql`
  query ReadPageQuery {
    allAirtable(filter: {table: {eq: "Completed"}}) {
      edges {
        node {
          data {
            Title
            Subtitle
            Completed
            Author {
              data {
                Name
              }
            }
          }
        }
      }
    }
  }
`

export default ReadPage

