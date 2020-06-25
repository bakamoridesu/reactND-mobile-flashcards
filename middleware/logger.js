const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.log('Action: ', action)
    const retVal = next(action)
    console.log('New state: ', store.getState())
  console.groupEnd()
  return retVal
}

export default logger