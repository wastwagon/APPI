import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

const here = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(here, '../../..')

config({ path: path.join(repoRoot, '.env') })
