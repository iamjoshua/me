import React from "react"
import Link from "gatsby-link"
import Helmet from 'react-helmet'
import TrackVisibility from 'react-on-screen'
import Thought from "../../components/thoughts/thought"
import Subscribe from "../../components/blog/subscribe"
import styles from "./thought.module.scss"

export const pageQuery = graphql`
  query ThoughtPostByPath($url: String!) {
    markdownRemark(frontmatter: { path: { eq: $url } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        axiom
      }
    }
  }
`

// data prop will be injected by the GraphQL query below.
export default function Template(params) {
  let {data, transition} = params
  let editable = params.location.search === '?edit=true'
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  let sourceLink = `https://github.com/iamjoshua/writings/commits/master${frontmatter.path}.md`
  const thought = {
    axiom: frontmatter.axiom,
    html,
    sourceLink
  }
  return (
    <div style={transition && transition.style}>
      <Thought {...thought}/>
    </div>
  )
}
