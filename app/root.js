const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect

const Main = require('./main')
const Fail = require('./fail')

module.exports = connect(mapStateToProps)(AppRoot)

function mapStateToProps (state) {
  return {
    view: state.currentView,
    nonce: state.nonce,
    web3Found: state.web3Found,
  }
}

inherits(AppRoot, Component)
function AppRoot () {
  Component.call(this)
}

AppRoot.prototype.render = function () {
  const props = this.props

  return (
    h('.content', [
      h('div', {
        style: {
          background: '#AAA',
        },
      }, [
        h('h1', `Flapjack`),
        h('h2', `The secure way to flip a coin with a friend online, for free.`),
      ]),

      this.renderMain(),

    ])
  )
}

AppRoot.prototype.renderMain = function() {
  if (this.props.web3Found) {
    return h(Main, { store: this.props.store })
  } else {
    return h(Fail)
  }
}
