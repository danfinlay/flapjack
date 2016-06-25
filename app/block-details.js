const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect

const ethUtil = require('ethereumjs-util')
const BN = ethUtil.BN

module.exports = connect(mapStateToProps)(BlockDetailView)

function mapStateToProps (state) {
  return {
    block: state.latestBlock,
    coinCount: state.coinCount,
  }
}

inherits(BlockDetailView, Component)
function BlockDetailView () {
  Component.call(this)
}

BlockDetailView.prototype.render = function () {
  const props = this.props
  const result = roll(props.block.hash, props.coinCount)

  return (
    h('div', {
      style: {
        background: '#CCDDEE',
      },
    }, [
      h('p', [
        `The current coin is number`,
        h('span', { style: { fontWeight: 'bold' } }, ` ${props.block.number}`),
      ]),

      h('h2', `The Roll is ${result}`),
    ])
  )
}

function roll(hash, mod) {
  const bnHash = new BN(hash, 16)
  const bnMod = new BN(mod, 10)
  return bnHash.mod(bnMod).toString(10)
}
