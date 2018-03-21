const lost = require('lost')
const googleKey = process.env.GAPI_PRIVATE_KEY ? {
  private_key: process.env.GAPI_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.GAPI_CLIENT_EMAIL
} : require('./client_secret.json')

module.exports = {
  siteMetadata: {
    title: `Joshua Heiland`,
    description: `SF-based thinker & artificial intelligence researcher`,
    siteUrl: `https://www.JoshuaHeiland.com`

  },
  plugins: [
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
      resolve: 'gatsby-source-google-sheets',
      options: {
        spreadsheetId: '1Jiz1Ye1ltYeeoruRtn2tpqhK7il42iDyzKv4vjsui-Y',
        worksheetTitle: 'Sheet1',
        credentials: googleKey
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
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                });
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
