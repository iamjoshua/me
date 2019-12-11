import React from "react"
import { graphql } from "gatsby"

import Main from "../components/main"
import Intro from '../components/intro'
import SEO from "../components/seo"
import styles from "../css/index.module.scss"

// import { rhythm } from "../utils/typography"

class Index extends React.Component {
  render() {
    //const siteTitle = data.site.siteMetadata.title
    // used to fade in on load
    let classes = 'initHide ' + styles.container
    return (
      <Main location={this.props.location}>
        <SEO title="Cool" />
        <div className={classes}>
          <Intro />
        </div>
      </Main>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
