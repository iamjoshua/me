import React from "react"
import ThoughtSummary from "../../components/thoughts/thought-summary"
import styles from "./thoughts.module.scss"

export const pageQuery = graphql`
  query thoughtsQuery {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "thought" }, published: { eq: true } } },
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
            axiom
          }
        }
      }
    }
  }
`

const ThoughtsPage = ({data, transition}) => {
  let Posts = false
  if (data && data.allMarkdownRemark) {
    let results = data.allMarkdownRemark.edges
    Posts = results.map(r => <ThoughtSummary key={r.node.id} post={r.node} />)
  }

  return <div style={transition && transition.style} className={styles.container}>{Posts}</div>;
}

export default ThoughtsPage
