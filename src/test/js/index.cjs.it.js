// node-engine ^12.20.0

const assert = require('assert') // eslint-disable-line @typescript-eslint/no-var-requires

const m = require('../fixtures/es5-module.cjs') // eslint-disable-line @typescript-eslint/no-var-requires

assert(typeof m.foo === 'string', 'foo is properly exported')
