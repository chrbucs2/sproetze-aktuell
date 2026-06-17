import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')
const gitDir = resolve(projectRoot, '.git')
const hooksPath = resolve(projectRoot, '.githooks')

if (!existsSync(gitDir) || !existsSync(hooksPath)) {
  process.exit(0)
}

try {
  execFileSync('git', ['config', 'core.hooksPath', '.githooks'], {
    cwd: projectRoot,
    stdio: 'ignore',
  })
} catch {
  process.exit(0)
}

