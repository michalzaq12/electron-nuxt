import { cpus } from 'os'
const isWindows = (process.platform === 'win32' || process.platform === 'win64')

export default {
  files: [
    'test/e2e/specs/**/*'
  ],
  sources: [
    'src/**/*'
  ],
  require: [
    './test/e2e/setup.js'
  ],
  concurrency: isWindows ? 1 : cpus().length
}
