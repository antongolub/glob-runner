// node-engine >=10

const assert = require('assert')

const m = require('../fixtures/es5-module.cjs')

assert(typeof m.foo === 'string', 'foo is properly exported')
