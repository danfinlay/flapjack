const render = require('react-dom').render
const h = require('react-hyperscript')
const configureStore = require('./lib/store')
const Provider = require('react-redux').Provider
const Root = require('./app/root.js')
const styles = require('./app/styles')

const paramer = require('./paramer')

var body = document.querySelector('body')
const container = document.createElement('div')
body.appendChild(container)

const store = configureStore({
  web3Found: typeof window.web3 !== 'undefined',
  coinCount: paramer.getParam('coinCount') || 2,
  loadingBlock: true,
  latestBlock: undefined,
  targetBlock: paramer.getParam('target'),
  network: paramer.getParam('network') || null,
})


let blockChecker
let targetLoaded = false
if (typeof web3 !== 'undefined') {

  if (paramer.getParam('target')) {
    targetLoaded = true
    store.dispatch({
      type: 'TARGET_BLOCK',
      value: parseInt(paramer.getParam('target')),
    })

    web3.eth.getBlock(paramer.getParam('target'), function(err, block) {
      if (err) {
        console.error('Problem loading old block.', err)
      } else {
        store.dispatch({
          type: 'LATEST_BLOCK',
          value: block,
        })
      }
    })
  }

  web3.version.getNetwork(function(err, network) {
    if (err) {
      console.error('Problem accessing network.', err)
    }
    store.dispatch({ type: 'NETWORK', value: network })
  })

  blockChecker = setInterval(function() {
    web3.eth.getBlock('latest', function(err, block) {
      if (err) {
        return store.dispatch({
          type: 'ERROR',
          value: err,
        })
      }

      if (!targetLoaded) {
        targetLoaded = true
        store.dispatch({
          type: 'TARGET_BLOCK',
          value: parseInt(block.number) + 20,
        })
      }

      store.dispatch({
        type: 'LATEST_BLOCK',
        value: block,
      })
    })
  }, 1000)
}

render(h('.super', [
  h('style', styles),
  h(Provider, { store }, [
    h(Root),
  ]),
]),
container)

