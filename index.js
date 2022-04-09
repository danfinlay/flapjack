const render = require('react-dom').render
const h = require('react-hyperscript')
const configureStore = require('./lib/store')
const Provider = require('react-redux').Provider
const Root = require('./app/root.js')
const styles = require('./app/styles')

var body = document.querySelector('body')
const container = document.createElement('div')
body.appendChild(container)

const store = configureStore({
  web3Found: typeof window.ethereum !== 'undefined',
  coinCount: 2,
  loadingBlock: true,
  latestBlock: undefined,
  targetBlock: undefined,
})

let blockChecker
let targetLoaded = false
if (typeof ethereum !== 'undefined') {
  blockChecker = setInterval(function() {
    ethereum.request({
      method: 'eth_getBlockByNumber',
      params:[ 'latest', true ],
    })
    .then((block) => {
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
    .catch((err) => {
      store.dispatch({
        type: 'ERROR',
        value: err,
      })
    });
  }, 1000);
}

render(h('.super', [
  h('style', styles),
  h(Provider, { store }, [
    h(Root),
  ]),
]),
container)

