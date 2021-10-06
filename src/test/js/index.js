import {run} from '../../main/js'
import {jest} from '@jest/globals'
import process from "process";

describe('glob-runner', () => {
  const spiedConsole = jest.spyOn(console, 'log')
  const cwd = process.cwd()

  beforeEach(() => {
    spiedConsole.mockReset()
  })

  it('loads test modules if found', (done) => {
    run('src/test/**/*.it.js', cwd,() => {
      expect(spiedConsole).toHaveBeenCalledTimes(3)
      expect(spiedConsole).toHaveBeenCalledWith(expect.stringMatching(/^Skipped/))
      expect(spiedConsole).toHaveBeenCalledWith(expect.stringMatching(/^Loading/))
      expect(spiedConsole).toHaveBeenLastCalledWith('Done')

      done()
    })
  })

  it('skips running otherwise', (done) => {
    run(['src/not-found/*.js'], cwd, () => {
      expect(spiedConsole).toHaveBeenCalledTimes(1)
      expect(spiedConsole).toHaveBeenLastCalledWith('No match found: src/not-found/*.js')

      done()
    })
  })
})