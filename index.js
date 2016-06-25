const render = require('react-dom').render
const h = require('react-hyperscript')
const configureStore = require('./lib/store')
const Provider = require('react-redux').Provider
const Root = require('./app/root.js')

var body = document.querySelector('body')
const container = document.createElement('div')
body.appendChild(container)

const store = configureStore({
  web3Found: typeof window.web3 !== 'undefined',
  coinCount: 2,
  loadingBlock: true,
  latestBlock: undefined,
  targetBlockNumber: undefined,
})

let blockChecker
if (typeof web3 !== 'undefined') {
  blockChecker = setInterval(function() {
    web3.eth.getBlock('latest', function(err, block) {
      if (err) {
        return store.dispatch({
          type: 'ERROR',
          value: err,
        })
      }

      store.dispatch({
        type: 'LATEST_BLOCK',
        value: block,
      })
    })
  }, 1000)
}

render(
  h(Provider, { store }, [
    h(Root),
  ]),
container)

