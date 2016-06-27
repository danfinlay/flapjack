const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect

const Main = require('./main')
const Fail = require('./fail')
const LoadingBlock = require('./loading-block')

module.exports = connect(mapStateToProps)(AppRoot)

function mapStateToProps (state) {
  return {
    view: state.currentView,
    nonce: state.nonce,
    web3Found: state.web3Found,
    loadingBlock: state.loadingBlock,
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

      h('.header', {
        style: {
          display: 'flex',
          justifyContent: 'center',
        }
      }, [
        h('img.logo', {
          src: './static/images/flapjack-logo.svg',
          style: {
            width: '90%',
            maxWidth: '800px',
          }
        }),
      ]),

      this.renderMain(),

    ])
  )
}

AppRoot.prototype.renderMain = function() {
  if (this.props.web3Found) {

    if (this.props.loadingBlock) {
      return h(LoadingBlock)
    } else {
      return h(Main)
    }

  } else {
    return h(Fail)
  }
}
