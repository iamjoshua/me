import React from "react"
import Post from "../components/blog/post"
import VisibleDiv from "../components/visiblediv"
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

const Blog = ({data}) => {
  let Posts = false
  if (data.allMarkdownRemark) {
    let results = data.allMarkdownRemark.edges
    Posts = results.map(r => <Post key={r.node.id} post={r.node} />)
  }
  
  return (
    <div className={styles.container}>
      <div>
        <VisibleDiv>
          Here are some thoughts and ideas that that aren't quite ready for the final form of an essay.
        </VisibleDiv>
      </div>
      <div>
        {Posts || 'No posts yet...'}
      </div>
    </div>
  )

}

export default Blog
