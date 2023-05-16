import assert from 'node:assert'
import process from 'node:process'
import {describe, it} from 'node:test'

import { run } from '../../main/js/index.cjs'

describe('glob-runner', () => {
  const cwd = process.cwd()
  const logger = {
    log(...args) {
      this.data.push(args)
    },
    data: [],
    reset() {
      this.data.length = 0
    }
  }

  it('loads test modules if found', (_, done) => {
    run({
      pattern: 'src/test/**/*.it.js',
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
      pattern: ['src/test/**/*.it.js'],
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
