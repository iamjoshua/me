import _ from 'lodash'

// Call a function safely on each record—won't fail if graph query fails.
const eachRecord = (data, name, fn) => {
  const path = `${name}.edges`
  const extracted = _.get(data, path, [])
  
  const getRecord = (e) => _.get(e, 'node', {})
  const callFn = (e) => fn(getRecord(e))

  return extracted.map(callFn)
}

export default eachRecord