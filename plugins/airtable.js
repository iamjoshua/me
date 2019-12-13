module.exports = {
  resolve: `gatsby-source-airtable`,
  options: {
    apiKey: process.env.AIRTABLE_API,
    tables: [
      {
        baseId: `appp5ITQMUn30FVMo`,
        tableName: `Completed`,
        // tableView: `YOUR_TABLE_VIEW_NAME`, // optional
        // queryName: `OPTIONAL_NAME_TO_IDENTIFY_TABLE`, // optional
        // mapping: { `CASE_SENSITIVE_COLUMN_NAME`: `VALUE_FORMAT` }, // optional, e.g. "text/markdown", "fileNode"
        // tableLinks: [`CASE`, `SENSITIVE`, `COLUMN`, `NAMES`] // optional, for deep linking to records across tables.
      }
    ]
  }
}