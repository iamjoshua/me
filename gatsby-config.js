const lost = require('lost')

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    'gatsby-transformer-csv',
    {
      resolve: 'gatsby-source-google-sheets',
      options: {
        spreadsheetId: '1Jiz1Ye1ltYeeoruRtn2tpqhK7il42iDyzKv4vjsui-Y',
        worksheetTitle: 'Sheet1',
        credentials: require('./client_secret.json')
      }
    },
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
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     path: `${__dirname}/books.csv`,
    //     name: 'books-csv',
    //   },
    // },
    // {
    //   resolve: `@mosch/gatsby-source-github`,
    //   options: {
    //     repository: "writings",
    //     tree: true,
    //     releases: true,
    //     user: "iamjoshua",
    //   }
    // },
  ]
}
