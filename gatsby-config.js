const lost = require('lost')
console.log(process)
try {
  let key = {
    private_key: process.env.GAPI_PRIVATE_KEY,
    client_email: process.env.GAPI_CLIENT_EMAIL,
  }
} catch (error) {
  console.log('failed so loading key')
  key = require('./client_secret.json')
}

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
        credentials: key
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
    {
      resolve: `@mosch/gatsby-source-github`,
      options: {
        repository: "writings",
        tree: true,
        releases: true,
        user: "iamjoshua",
      }
    },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     path: `${__dirname}/books.csv`,
    //     name: 'books-csv',
    //   },
    // },
    // {
  ]
}
