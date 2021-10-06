// node-engine ^12.20.0 || ^14.13.1 || >=16.0.0
import assert from 'assert'

import { foo } from '../fixtures/es6-module.mjs'
import { foo as foo2 } from '../fixtures/es5-module.cjs'

assert(typeof foo === 'string', 'foo is properly exported from mjs')
assert(typeof foo2 === 'string', 'foo is properly exported from cjs')
