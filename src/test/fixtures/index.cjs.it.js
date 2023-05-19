// node-engine >=10

const assert = require('assert')

const m = require('./es5-module.cjs')

assert(typeof m.foo === 'string', 'foo is properly exported')
