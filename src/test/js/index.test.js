import assert from 'node:assert'
import { createRequire } from 'node:module'
import { describe, it } from 'node:test'

const require = createRequire(import.meta.url)
const cases = [
  ['src/index (cjs)', require('../../main/js/index.cjs').run],
  ['src/index (mjs)', (await import('../../main/js/index.mjs')).run],
  ['target (cjs)', require('glob-runner').run],
  ['target (mjs)', (await import('glob-runner')).run],
];

cases.forEach(([name, run]) => {
  describe(name, () => {
    const cwd = process.cwd()
    const logger = {
      log(...args) {
        this.data.push(args)
      },
      data: [],
      reset() {
        this.data.length = 0
      },
    }

    it('loads test modules if found', (_, done) => {
      run({
        pattern: 'src/test/fixtures/*.it.js',
        cwd,
        cb: () => {
          assert.equal(logger.data.length, 3)
          assert(logger.data[1][0].startsWith('Loading'))
          assert.equal(logger.data[2][0], 'Done')
          logger.reset()
          done()
        },
        logger,
      })
    })

    it('skips running on nodejs version mismatch', (_, done) => {
      run({
        pattern: ['src/test/fixtures/*.it.js'],
        cwd,
        nodeVersion: '8.0.0',
        cb: () => {
          assert.equal(logger.data.length, 3)
          assert(logger.data[1][0].startsWith('Skipped'))
          assert.equal(logger.data[2][0], 'Done')

          logger.reset()
          done()
        },
        logger,
      })
    })

    it('exits if no file found by pattern', (_, done) => {
      run({
        pattern: ['src/not-found/*.js'],
        cwd,
        cb: () => {
          assert.equal(logger.data.length, 1)
          assert.equal(logger.data[0][0], 'No match found: src/not-found/*.js')
          logger.reset()
          done()
        },
        logger,
      })
    })
  })

})
