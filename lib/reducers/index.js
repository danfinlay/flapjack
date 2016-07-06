const extend = require('xtend')
const paramer = require('../../paramer')

const networkNames = {
  1: 'Main net',
  2: 'Test net',
}

module.exports = function(state, action) {

  switch (action.type) {
    case 'NETWORK':
      if (state.network && state.network !== action.value) {

        const msg = `Your link wants the ${networkNames[state.network]}, but you're currently on the ${networkNames[action.value]}. Press OK if you are going to manually switch your provider to the ${networkNames[state.network]}.`
        var forceChange = confirm(msg)

        if (!forceChange) {
          paramer.setParam('network', action.value)
          return extend(state, {
            proposedNetwork: action.value,
          })
        } else {
          paramer.setParam('network', state.network)
        }
     }
  }

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
    paramer.updateParam('coinCount', action.value)
    return extend(state, {
      coinCount: action.value,
    })
  }

  if (action.type === 'TARGET_BLOCK') {
    paramer.updateParam('target', action.value)
    return extend(state, {
      targetBlock: action.value,
    })
  }

  return extend(state)
}
