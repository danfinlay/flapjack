const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect

const LabeledInput = require('./components/labeled-input')
const Cooking = require('./cooking')
const Result = require('./result')

module.exports = connect(mapStateToProps)(MainView)

function mapStateToProps (state) {
  return {
    coinCount: state.coinCount,
    loadingBlock: state.loadingBlock,
    latestBlock: state.latestBlock,
    targetBlock: state.targetBlock,
    resultBlock: state.resultBlock,
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '26px',
      },
    }, [

      h('h3', 'Now serving order #'),
      h('h3', props.latestBlock.number),

      h('p', 'New jacks ready approx. every 14 seconds.'),

      h(LabeledInput, {
        label: 'Flip a number between 1 and...',
        default: props.coinCount,
        onChange: (value) => {
          this.props.dispatch({
            type: 'NEW_RANGE',
            value,
          })
        },
      }),
      h(LabeledInput, {
        label: 'Have it ready on order number...',
        default: props.targetBlock,
        onChange: (value) => {
          this.props.dispatch({
            type: 'TARGET_BLOCK',
            value,
          })
        },
      }),

      this.renderResults(),
    ])
  )
}

MainView.prototype.renderResults = function() {
  const props = this.props
  const current = props.latestBlock.number
  const target  = props.targetBlock
  const result = props.resultBlock

  if (target > current || !result) {
    return h(Cooking)
  } else {
    return h(Result)
  }
}
