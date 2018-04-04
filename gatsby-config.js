const lost = require('lost')
const airTableKey = process.env.AIRTABLE_API_KEY
                  ? process.env.AIRTABLE_API_KEY
                  : require('./client_secret.json').airtable_api

module.exports = {
  siteMetadata: {
    title: `Joshua Heiland`,
    description: `SF-based thinker & artificial intelligence researcher`,
    siteUrl: `https://www.JoshuaHeiland.com`

  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    'gatsby-transformer-csv',
    {
      resolve: 'gatsby-plugin-postcss-sass',
      options: {
        postCssPlugins: [lost()],
        precision: 8, // SASS default: 5
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/posts`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: `@mosch/gatsby-source-github`,
      options: {
        repository: "writings",
        tree: true,
        releases: true,
        user: "iamjoshua",
      }
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: airTableKey,
        baseId: `appp5ITQMUn30FVMo`,
        tableName: `Completed`,
        tableView: `Grid view`,
        queryName: `Books`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-115612853-1',
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options : {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              if (!allMarkdownRemark) return []
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: {frontmatter: { published: { eq: true } }}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        path
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      }
    }
  ]
}
