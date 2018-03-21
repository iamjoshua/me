import React from "react"
import PostSummary from "../../components/blog/post-summary"
import VisibleDiv from "../../components/visiblediv"
import styles from "./blog.module.scss"

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "blog" }, published: { eq: true } } },
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 1000)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`

const BlogPage = ({transition, data}) => {
  let Posts = false
  if (data && data.allMarkdownRemark) {
    let results = data.allMarkdownRemark.edges
    Posts = results.map(r => <PostSummary key={r.node.id} post={r.node} />)
  }

  return (
    <div style={transition && transition.style} className={styles.container}>
      <div>
        <VisibleDiv>
          Here are some ideas that I've been thinking about and feel are worth sharing.
        </VisibleDiv>
      </div>
      <div>
        {Posts || 'No posts yet...'}
      </div>
    </div>
  )

}

export default BlogPage
