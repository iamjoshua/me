import React from "react"
import Post from "../components/blog/post"
import VisibleDiv from "../components/visiblediv"
import styles from "./blog.module.scss"

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "blog" } } },
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

const Blog = ({ data: { allMarkdownRemark: { edges } } }) => {
  const Posts = edges.map(edge => <Post key={edge.node.id} post={edge.node} />)
  return (
    <div className={styles.container}>
      <div>
        <VisibleDiv>
          Here are some thoughts and ideas that that aren't quite ready for the final form of an essay.
        </VisibleDiv>
      </div>
      <div>
        {Posts}
      </div>
    </div>
  )

}

export default Blog
