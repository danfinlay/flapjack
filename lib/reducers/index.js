const extend = require('xtend')

module.exports = function(state, action) {

  if (action.type === 'LATEST_BLOCK') {
    return extend(state, {
      loadingBlock: false,
      latestBlock: action.value,
    })
  }

  if (action.type === 'ERROR') {
    return extend(state, {
      error: action.value,
    })
  }

  return extend(state)
}
