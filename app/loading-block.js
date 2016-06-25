const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect

module.exports = connect(mapStateToProps)(LoadingBlockView)

function mapStateToProps (state) {
  return {
    block: state.latestBlock,
  }
}

inherits(LoadingBlockView, Component)
function LoadingBlockView () {
  Component.call(this)
}

LoadingBlockView.prototype.render = function () {
  const props = this.props

  return (
    h('div', {
      style: {
        background: 'orange',
      },
    }, [
      'Loading the latest block...'
    ])
  )
}
