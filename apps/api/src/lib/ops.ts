import { execFile } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import { fileURLToPath } from 'url'

const execFileAsync = promisify(execFile)

function monorepoRoot(): string {
  const here = path.dirname(fileURLToPath(import.meta.url))
  return path.resolve(here, '../../../..')
}

function databaseDir(): string {
  return path.join(monorepoRoot(), 'packages/database')
}

export async function runMigrations(): Promise<{ ok: boolean; output: string }> {
  const cwd = databaseDir()
  try {
    const { stdout, stderr } = await execFileAsync(
      'npx',
      ['prisma', 'migrate', 'deploy'],
      {
        cwd,
        env: { ...process.env },
        maxBuffer: 2 * 1024 * 1024,
      }
    )
    return { ok: true, output: [stdout, stderr].filter(Boolean).join('\n') || 'Migrations applied.' }
  } catch (err: unknown) {
    const e = err as { stdout?: string; stderr?: string; message?: string }
    const output = [e.stdout, e.stderr, e.message].filter(Boolean).join('\n')
    return { ok: false, output: output || 'Migration failed' }
  }
}

export async function runSeed(): Promise<{ ok: boolean; output: string }> {
  const cwd = databaseDir()
  try {
    const { stdout, stderr } = await execFileAsync('npx', ['--yes', 'tsx', 'prisma/seed.ts'], {
      cwd,
      env: { ...process.env },
      maxBuffer: 2 * 1024 * 1024,
    })
    return { ok: true, output: [stdout, stderr].filter(Boolean).join('\n') || 'Seed complete.' }
  } catch (err: unknown) {
    const e = err as { stdout?: string; stderr?: string; message?: string }
    const output = [e.stdout, e.stderr, e.message].filter(Boolean).join('\n')
    return { ok: false, output: output || 'Seed failed' }
  }
}
