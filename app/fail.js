const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect

module.exports = connect(mapStateToProps)(AppRoot)

function mapStateToProps (state) {
  return {}
}

inherits(AppRoot, Component)
function AppRoot () {
  Component.call(this)
}

AppRoot.prototype.render = function () {
  const props = this.props

  return (
    h('.error', [
      h('p', 'Sorry, no web3 object detected!'),
      h('p', 'Flapjack requires an Ethereum-capable browser.'),
      h('p', [
        'Consider using ',
        h('a', {href: 'https://metamask.io/'}, 'MetaMask!'),
      ])
    ])
  )
}
