module.exports = {
  resolve: `gatsby-source-airtable`,
  options: {
    apiKey: process.env.AIRTABLE_API,
    tables: [
      {
        baseId: `appp5ITQMUn30FVMo`,
        tableName: `Authors`,
        tableLinks: [`Completed`]
      },
      {
        baseId: `appp5ITQMUn30FVMo`,
        tableName: `Completed`,
        tableLinks: [`Author`] // optional, for deep linking to records across tables.
      }
    ]
  }
}