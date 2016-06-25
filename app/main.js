const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect

const LoadingBlock = require('./loading-block')
const BlockDetails = require('./block-details')

module.exports = connect(mapStateToProps)(MainView)

function mapStateToProps (state) {
  return {
    coinCount: state.coinCount,
    loadingBlock: state.loadingBlock,
    latestBlock: state.latestBlock,
    targetBlockNumber: state.targetBlockNumber,
  }
}

inherits(MainView, Component)
function MainView () {
  Component.call(this)
}

MainView.prototype.render = function () {
  const props = this.props

  return (
    h('div', {
      style: {
        background: '#CECECE',
      },
    }, [

      h('p', [
        `You are flipping a ${props.coinCount} sided die.`,
        h('button', { onClick: () => this.props.dispatch({ type: 'ADD' }) }, 'Add Side'),
        h('button', { onClick: () => this.props.dispatch({ type: 'SUB' }) }, 'Remove Side'),
      ]),

      props.loadingBlock ?
        h(LoadingBlock) : h(BlockDetails)
    ])
  )
}
