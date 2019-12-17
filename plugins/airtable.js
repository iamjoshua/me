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
      },
      {
        baseId: `app5d9T9tONPm3DR2`,
        tableName: `Papers`,
        tableView: `Read`, // optional
        tableLinks: [`Author`], // optional, for deep linking to records across tables.
        defaultValues: {
          Type: 'Philosophy'
          //currently does not accept null / undefined. use empty string instead
          //and perform your conditional logic on name_of_field.length > 0 ? condition_1 : condition_2
          //... etc
        }
      },
      {
        baseId: `app5d9T9tONPm3DR2`,
        tableName: `Authors`,
      }
    ]
  }
}