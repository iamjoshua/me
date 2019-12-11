import React from "react"
import Main from "../../components/main"
import PostSummary from "../../components/wrote/post-summary"
import VisibleDiv from "../../components/visiblediv"
import styles from "./wrote.module.scss"

// export const pageQuery = graphql`
//   query IndexQuery {
//     allMarkdownRemark(
//       filter: { frontmatter: { type: { eq: "blog" }, published: { eq: true } } },
//       sort: { order: DESC, fields: [frontmatter___date] }
//     ) {
//       edges {
//         node {
//           id
//           excerpt(pruneLength: 1000)
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             path
//             title
//             subtitle
//             summary
//           }
//         }
//       }
//     }
//   }
// `

const WrotePage = ({transition, data, location}) => {
  let Posts = false
  if (data && data.allMarkdownRemark) {
    let results = data.allMarkdownRemark.edges
    Posts = results.map(r => <PostSummary key={r.node.id} post={r.node} />)
  }

  return (
    <Main location={location}>
      <div style={transition && transition.style} className={styles.container}>
        <div>
          <VisibleDiv>
            Here are some ideas that I feel are worth sharing.
          </VisibleDiv>
        </div>
        <div>
          {Posts || 'No posts yet...'}
        </div>
      </div>
    </Main>
  )

}

export default WrotePage
