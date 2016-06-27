const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect

module.exports = connect(mapStateToProps)(CookingView)

function mapStateToProps (state) {
  return {
    latestBlock: state.latestBlock.number,
    targetBlock: state.targetBlock,
  }
}

inherits(CookingView, Component)
function CookingView () {
  Component.call(this)
}

CookingView.prototype.render = function () {
  const props = this.props
  const { latestBlock, targetBlock } = props

  const timeRemaining = estimateTime(latestBlock, targetBlock)

  return (
    h('div', {
      style: {
      },
    }, [
      h('.cooking-message', [
        h('h3', 'Your jack is cooking!'),
        h('h3', `Should be ready ${timeRemaining}`),
      ]),


    ])
  )
}

function estimateTime(latest, target) {

  const blockDiff = target - latest
  const inSeconds = blockDiff * 14
  const inMinutes = inSeconds / 60
  const inHours   = inMinutes / 60
  const inDays    = inHours / 24

  if (inMinutes < 0.25) {
    return ' very soon!'
  } else if (inMinutes < 1) {
    return ' in less than a minute!'
  } else if (inMinutes < 90){
    const rounded = Math.round(inMinutes)
    return ` in ${rounded} minutes!`
  } else if (inHours < 36) {
    const rounded = Math.round(inHours)
    return ` in ${rounded} hours!`
  } else {
    const rounded = Math.round(inDays)
    return ` in ${rounded} days!`
  }

}
