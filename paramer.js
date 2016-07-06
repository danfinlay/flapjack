const qs = require('qs')
let queryParamObj
parseQueryParams()
updateQueryParams()
function parseQueryParams() {
  queryParamObj = qs.parse(window.location.href.split('#')[1])
}
function updateQueryParams() {
  const params = qs.stringify(queryParamObj)
  window.location.href = window.location.href.split('#')[0] + `#${params}`
}

module.exports = {
  getParam(key) {
    return queryParamObj[key]
  },
  getParams() {
    return queryParamObj
  },
  setParam(key, value) {
    this.updateParam(key, value)
  },
  updateParam(key, value) {
    queryParamObj[key] = value
    updateQueryParams()
  },
}
