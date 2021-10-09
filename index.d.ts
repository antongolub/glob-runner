declare module 'glob-runner' {
  type ICallable<A extends any[] = any[], R = any> = (...args: A) => R

  export const run: (options?: {
    pattern: string | string[],
    cwd?: string,
    cb?: ICallable,
    nodeVersion?: string
  }) => Promise<void>
}
