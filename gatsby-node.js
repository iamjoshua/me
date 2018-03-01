/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

//  This is responsible for building the individual pages for the MD posts by type
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  ['blog', 'book', 'thought'].forEach(type => {
    let query = `
      {
        allMarkdownRemark(
          filter: { frontmatter: { type: { eq: "${type}" } } },
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                title
                path
                type
              }
            }
          }
        }
      }
    `

    graphql(query).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      // Create blog post pages
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        if (!node.frontmatter.title) return
        let urlSafeTitle = encodeURI(node.frontmatter.title.replace(/\s/g, "-").toLowerCase())
        let dynamicPath = `/${type}/${urlSafeTitle}`

        createPage({
          path: node.frontmatter.path || dynamicPath,
          component: path.resolve(`src/templates/${type}/index.js`)
        })
      })
    }).catch(console.log)
  })
}
