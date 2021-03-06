/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")


exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    let nodeSlug
    nodeSlug = ensureSlashes(
      path.basename(fileNode.relativePath, path.extname(fileNode.relativePath))
    )
    if (nodeSlug) {
      createNodeField({ node, name: `slug`, value: nodeSlug })
    }
  }
}

function ensureSlashes(slug) {
  if (slug.charAt(0) !== `/`) {
    slug = `/` + slug
  }

  if (slug.charAt(slug.length - 1) !== `/`) {
    slug = slug + `/`
  }

  return slug
}


//  This is responsible for building the individual pages for the MD posts by type
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  ['blog', 'thought'].forEach(type => {
    let query = `
      {
        allMarkdownRemark(
          filter: { frontmatter: { type: { eq: "${type}" } } },
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                subtitle
                summary
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
        let url = node.frontmatter.path || `/${type}/${urlSafeTitle}`
        let template = path.resolve(`src/templates/${type}/index.js`)

        createPage({
          path: url,
          component: template,
          context: {
            url: url,
            id: node.id,
            happy: true
          }
        })

        createPage({
          path: url + '/edit',
          component: template,
          context: {
            url: url,
            id: node.id,
            edit: true
          }
        })
      })
    }).catch(console.log)
  })
}
