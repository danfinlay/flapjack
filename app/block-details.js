const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect

module.exports = connect(mapStateToProps)(BlockDetailView)

function mapStateToProps (state) {
  return {
    block: state.latestBlock,
  }
}

inherits(BlockDetailView, Component)
function BlockDetailView () {
  Component.call(this)
}

BlockDetailView.prototype.render = function () {
  const props = this.props

  return (
    h('div', {
      style: {
        background: '#CCDDEE',
      },
    }, [
      h('p', `The current block is number ${props.block.number}`),
      h('p', `The block hash is ${props.block.hash}`),
      h('p', `Your coin will be flipped on the next block...`),
    ])
  )
}
