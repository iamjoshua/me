import React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { eachRecord } from '../utils/data'
import Main from '../components/main'
import Entry from '../components/readings/entry'

// ================================ //
// Styles
// ================================ //

const Entries = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  padding: ${props => props.theme.space};

`

// ================================ //
// Component
// ================================ //

const ReadPage = ({data}) => {  

  const entry = (key, data) => <Entry key={key} {...data} />
  const entries = eachRecord(data, 'allAirtable', entry)

  return (
    <Main>
      <Entries>
        {entries}
      </Entries>
    </Main>
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

// export const query = graphql`
//   query HomePageQuery {
//     allAirtable {
//       edges {
//         node {
//           data {
//             Author {
//               data {
//                 Name
//               }
//             }
//             Title
//             Type
//             Genre
//             Completed
//           }
//         }
//       }
//     }
//   }
// `

export default ReadPage

