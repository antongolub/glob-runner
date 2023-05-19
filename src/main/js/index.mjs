import { createRequire } from 'node:module'

const { run } = createRequire(import.meta.url)('./index.cjs')

export { run }
