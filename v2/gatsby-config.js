const airTableKey = process.env.AIRTABLE_API_KEY
                  ? process.env.AIRTABLE_API_KEY
                  : require('./client_secret.json').airtable_api

const githubToken = process.env.GITHUB_TOKEN
                  ? process.env.GITHUB_TOKEN
                  : require('./client_secret.json').github_token

console.log('inside of here:', airTableKey)

module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Blog`,
    author: `Kyle Mathews`,
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.com/`,
    social: {
      twitter: `kylemathews`,
    },
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    // {
    //   resolve: `gatsby-source-github-api`,
    //   options: {
    //     // token: required by the GitHub API
    //     token: githubToken,
    //     variables: {
    //           q: "author:ldd state:closed type:pr sort:comments",
    //           nFirst: 2
    //         }
    //   }
    // },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: airTableKey, // may instead specify via env, see below
        tables: [
          {
            // philosophy papers read
            baseId: `app5d9T9tONPm3DR2`,
            tableName: `Papers`,
            tableView: `Read`, // optional
            tableLinks: [`Author`], // optional, for deep linking to records across tables.
            defaultValues: {
              Table: `Philosophy`
            }
          },
          {
            // philosophy papers read
            baseId: `app5d9T9tONPm3DR2`,
            tableName: `Authors`,
          },
          {
            // books read
            baseId: `appp5ITQMUn30FVMo`,
            tableName: `Completed`,
            tableLinks: [`Author`], // optional, for deep linking to records across tables.
            defaultValues: {
              Table: `Books`
            }
          },
          {
            // books read
            baseId: `appp5ITQMUn30FVMo`,
            tableName: `Authors`
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
