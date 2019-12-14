import _ from 'lodash'

// Call a function safely on each record—won't fail if graph query fails.
const eachRecord = (data, name, fn) => {
  
  const path = `${name}.edges`
  const records = _.get(data, path, [])

  let key = 0

  const lowerCaseKeys = (r) => _.mapKeys(r, (v, k) => _.lowerCase(k))
  const getRecord = (r) => _.get(r, 'node.data', {})
  const callFn = (r) => fn(key++, lowerCaseKeys( getRecord(r) ) )

  return _.map(records, callFn)
}

// const parseRecords = (data, name) => {


//   const path = `${name}.edges`
//   const records = _.get(data, path, [])

//   const lowerCaseKeys = (r) => _.mapKeys(r, (v, k) => _.lowerCase(k))
//   const getRecord = (r) => _.get(r, 'node.data', {})
//   const getRecords = (r) => lowerCaseKeys( getRecord(r) )

//   return _.map(records, getRecords)
// }

const parseRecords = (data) => {

  const name = _.keys(data)[0]
  const path = `${name}.edges`
  const edges = _.get(data, path, [])
  const records = _.mapValues(edges, 'node.data')

  return records
}


export {eachRecord, parseRecords}