var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost/rent/public"',
  // BASE_API: '"https://easy-mock.com/mock/59c5e019e0dc663341b5db38/rent"',
})
