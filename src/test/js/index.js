import {jest} from '@jest/globals'
import process from 'process'

import {run} from '../../main/js'

describe('glob-runner', () => {
  const spiedConsole = jest.spyOn(console, 'log')
  const cwd = process.cwd()

  beforeEach(() => {
    spiedConsole.mockReset()
  })

  it('loads test modules if found', (done) => {
    run({
      pattern: 'src/test/**/*.it.js',
      cwd,
      cb: () => {
        expect(spiedConsole).toHaveBeenCalledTimes(3)
        expect(spiedConsole).toHaveBeenCalledWith(expect.stringMatching(/^Skipped/))
        expect(spiedConsole).toHaveBeenCalledWith(expect.stringMatching(/^Loading/))
        expect(spiedConsole).toHaveBeenLastCalledWith('Done')

        done()
      }
    })
  })

  it('skips running on nodejs version mismatch', (done) => {
    run({
      pattern: ['src/test/**/*.it.js'],
      cwd,
      nodeVersion: '8.0.0',
      cb: () => {
        expect(spiedConsole).toHaveBeenCalledTimes(3)
        expect(spiedConsole).nthCalledWith(2, expect.stringMatching(/^Skipped/))
        expect(spiedConsole).toHaveBeenLastCalledWith('Done')

        done()
      }
    })
  })

  it('exits if no file found by pattern', (done) => {
    run({
      pattern: ['src/not-found/*.js'],
      cwd,
      cb:() => {
        expect(spiedConsole).toHaveBeenCalledTimes(1)
        expect(spiedConsole).toHaveBeenLastCalledWith('No match found: src/not-found/*.js')

        done()
      }
    })
  })
})
