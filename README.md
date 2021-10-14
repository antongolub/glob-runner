# glob-runner
Tiny helper to search and exec js files by glob pattern with optional Node.js version restrictions

[![CI](https://github.com/antongolub/glob-runner/workflows/CI/badge.svg)](https://github.com/antongolub/glob-runner/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/5d67778a971ca545b8a2/maintainability)](https://codeclimate.com/github/antongolub/glob-runner/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5d67778a971ca545b8a2/test_coverage)](https://codeclimate.com/github/antongolub/glob-runner/test_coverage)
[![npm (tag)](https://img.shields.io/npm/v/glob-runner)](https://www.npmjs.com/package/glob-runner)

### Install
```shell
yarn add glob-runner
```

### Usage
#### JS/TS
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

#### CLI
```shell
glob-runner src/test/**/*.it.js
# Loading /gh/glob-runner/src/test/js/index.mjs.it.js...
# Done
```

#### Node engine 
Every running script can define its own Node.js engine requirements
through special annotation at the beginning of the file:
```js
// node-engine ^12.20.0 || ^14.13.1 || >=16.0.0
```
If current the runtime does not match the pattern, invocation will be skipped.
This feature might be useful for writing integration tests for several Node.js versions.
For example, `require` API with `node:` prefix [needs v16.0.0+](https://nodejs.org/api/modules.html#modules_core_modules),
so your script may look like:

```js
// node-engine >=16.0.0

import {read} from 'node:fs'

read('/foo/bar')
```


## Alternatives
* https://github.com/fahad19/glob-run

### License
[MIT](./LICENSE)
