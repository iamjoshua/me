// import React from "react"
// import { Link, graphql } from "gatsby"
//
// import Bio from "../components/bio"
// import Main from "../components/main"
// import Paper from "../components/books"
// import SEO from "../components/seo"
// import { rhythm } from "../utils/typography"
//
// class ReadPage extends React.Component {
//   render() {
//     const { data } = this.props
//     const siteTitle = data.site.siteMetadata.title
//     const onClick = (author) => alert(author)
//     let key = 0
//     const items = data.allAirtable.edges.map(({ node }) => (
//       <Paper key={key++} post={node.data} onClick={onClick} />
//     ))
//
//     return (
//       <Main location={this.props.location}>
//         <SEO title="Cool" />
//         {items}
//       </Main>
//     )
//   }
// }
//
// export default ReadPage
//
// export const pageQuery = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     allAirtable(filter: {table: {in: ["Completed", "Read"]}}) {
//       edges {
//         node {
//           data {
//             Author
//             Title
//             Completed
//           }
//         }
//       }
//     }
//   }
// `
