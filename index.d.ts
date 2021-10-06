declare module 'glob-runner' {
  type ICallable<A extends any[] = any[], R = any> = (...args: A) => R

  export const run: (pattern: string | string[], cwd?: string, cb?: ICallable) => Promise<void>
}
