const fs = require('fs')
const { createRequire } = require('module')
const process = require('process')
const url = require('url')
const fg = require('fast-glob')
const semver = require('semver')

const enginesPattern = /^\/\/\s*node-engine\s+(.+)\n/
const noop = () => {
  /* noop */
}

const run = async ({
  pattern = process.argv.slice(2).filter((arg) => !arg.startsWith('--')),
  cwd = process.cwd(),
  cb = noop,
  parallel = process.argv.includes('--parallel'),
  silent = process.argv.includes('--silent'),
  nodeVersion = process.version,
  logger = silent ? { log: noop } : console,
  glob = fg,
} = {}) => {
  const allowEsm = semver.gte(nodeVersion, '12.20.0')
  const scripts = await glob(pattern, {
    cwd,
    onlyFiles: true,
    absolute: true,
  })

  if (scripts.length === 0) {
    logger.log(`No match found: ${pattern}`)
    return cb()
  }

  await scripts.reduce(async (r, script) => {
    if (!parallel) {
      await r
    }
    const contents = await fs.promises.readFile(script, { encoding: 'utf8' })
    const engines = (enginesPattern.exec(contents) || [])[1]
    const fileUrl = `${url
      .pathToFileURL(script)
      .toString()}?random=${Math.random().toString(36).slice(2)}`

    delete require.cache[script]

    if (engines && !semver.satisfies(nodeVersion, engines)) {
      logger.log(
        `Skipped ${script}. ${nodeVersion} does not satisfy ${engines}`,
      )
      return r
    }
    logger.log(`Loading ${script}...`)

    if (createRequire) {
      global.require = createRequire(fileUrl)
    }

    return Promise.all([r, allowEsm ? import(fileUrl) : require(script)])
  }, Promise.resolve())

  logger.log('Done')

  return cb()
}

module.exports = { run }
