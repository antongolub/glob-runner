# glob-runner
Tiny helper to search and exec js files by glob pattern

### Install
```shell
yarn add glob-runner
```

### Usage
```js
import { run } from 'glob-runner'

await run('src/test/**/*.it.js')

// Skipped /gh/glob-runner/src/test/js/index.cjs.it.js. v16.7.0 does not satisfy ^12.20.0
// Loading /gh/glob-runner/src/test/js/index.mjs.it.js...
// Done
```

### License
[MIT](./LICENSE)
