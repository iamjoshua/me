const lost = require('lost')
const key = require('./client_secret.json')
console.log(key.type)

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    'gatsby-transformer-csv',
    // {
    //   resolve: 'gatsby-source-google-sheets',
    //   options: {
    //       spreadsheetId: '1XtAOX3c4s6WylSUk3J5j0QiyP3OZG6ZvQFoCGpGyje8',
    //       worksheetTitle: 'legislators-current',
    //       credentials: key
    //   }
    // },
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
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/books.csv`,
        name: 'books-csv',
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
  ]
}
