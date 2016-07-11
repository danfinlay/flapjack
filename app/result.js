const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect

const ethUtil = require('ethereumjs-util')
const BN = ethUtil.BN

module.exports = connect(mapStateToProps)(ResultView)

function mapStateToProps (state) {
  return {
    block: state.latestBlock,
    targetBlock: state.targetBlock,
    coinCount: state.coinCount,
    resultBlock: state.resultBlock,
  }
}

inherits(ResultView, Component)
function ResultView () {
  Component.call(this)
}

ResultView.prototype.render = function () {
  const props = this.props
  const { resultBlock, block, targetBlock, coinCount } = props
  const result = roll(resultBlock.hash, coinCount)

  return (
    h('.jack-results', [
      h('h2', `Hot jack, here it is!`),
      h('h1.result', result),
    ])
  )
}

function roll(hash, mod) {
  const bnHash = new BN(hash, 16)
  const bnMod = new BN(mod, 10)
  const one = new BN(1, 10)
  return bnHash.mod(bnMod).add(one).toString(10)
}
