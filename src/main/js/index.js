import fs from 'fs'
import {globbySync} from 'globby'
import process from 'process'
import semver from 'semver'
import url from 'url'
import { createRequire } from 'module'

export const engineDirectiveRe = /^\/\/\s*node-engine\s+(.+)\n/

export const run = ({
  pattern= process.argv.slice(2),
  cwd = process.cwd(),
  cb = () => {},
  nodeVersion = process.version,
}) => {
  const tests = globbySync(pattern, {
    cwd,
    onlyFiles: true,
    absolute: true,
  })

  if (tests.length === 0) {
    console.log(`No match found: ${pattern}`)
    return Promise.resolve(cb())

  } else {
    return tests.reduce((r, module) =>
        r.then(() =>
          fs.promises.readFile(module, {encoding: 'utf8'}).then(c => {
            const engineDirective = (engineDirectiveRe.exec(c) || [])[1]
            const fileUrl = url.pathToFileURL(module)

            if (engineDirective && !semver.satisfies(nodeVersion, engineDirective)) {
              console.log(`Skipped ${module}. ${nodeVersion} does not satisfy ${engineDirective}`)
              return r
            }

            console.log(`Loading ${module}...`)

            global.require = createRequire(fileUrl)

            return import(fileUrl)
          })
        )

      , Promise.resolve())
      .then(() => console.log('Done'))
      .then(cb)
  }
}
