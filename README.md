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

await run({
  pattern: 'src/test/**/*.it.js', // required
  cwd: process.cwd(),             // optional
  cb: () => {},                   // optional
})

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

**Node engine**
You can describe the Node engine requirements using a special 
annotation at the beginning of the file:
```js
// node-engine ^12.20.0 || ^14.13.1 || >=16.0.0

require('test-code-goes-below')
```

### License
[MIT](./LICENSE)
