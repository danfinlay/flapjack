const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits

module.exports = LabeledInput

inherits(LabeledInput, Component)
function LabeledInput () {
  Component.call(this)
}

LabeledInput.prototype.render = function () {
  const props = this.props

  return (
    h('.labeled-input', {
      style: {
        display: 'flex',
        justifyContent: 'center',
      }
    }, [

      h('.thick-label', this.props.label),
      h('input', {
        type: 'number',
        min: 1,
        value: this.props.default,
        onChange:(event) => {
          this.props.onChange(event.target.value)
        },
      }),
    ])
  )
}
