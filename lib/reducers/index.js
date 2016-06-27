const extend = require('xtend')

module.exports = function(state, action) {

  if (action.type === 'LATEST_BLOCK') {

    if (parseInt(action.value.number) === parseInt(state.targetBlock)) {
      var result = extend(state, {
        loadingBlock: false,
      })
      result.resultBlock = action.value
      result.latestBlock = action.value
      return result
    }

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

  if (action.type === 'NEW_RANGE') {
    return extend(state, {
      coinCount: action.value,
    })
  }

  if (action.type === 'TARGET_BLOCK') {
    return extend(state, {
      targetBlock: action.value,
    })
  }

  return extend(state)
}
