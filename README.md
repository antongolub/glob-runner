# glob-runner
Tiny helper to search and exec js files by glob pattern

### Install
```shell
yarn add glob-runner
```

### Usage
**JS/TS**
```js
import { run } from 'glob-runner'

const pattern = 'src/test/**/*.it.js' // required
const cwd = process.cwd()             // optional
const cb = () => {}                   // optional

await run(pattern, cwd, cb)

// Skipped /gh/glob-runner/src/test/js/index.cjs.it.js. v16.7.0 does not satisfy ^12.20.0
// Loading /gh/glob-runner/src/test/js/index.mjs.it.js...
// Done
```

**CLI**
```shell
glob-runner src/test/**/*.it.js
# Loading /gh/glob-runner/src/test/js/index.mjs.it.js...
# Done
```

### License
[MIT](./LICENSE)
