const lost = require('lost')
const googleKey = process.env.GAPI_PRIVATE_KEY ? {
  private_key: process.env.GAPI_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.GAPI_CLIENT_EMAIL
} : require('./client_secret.json')

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
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
  ]
}
