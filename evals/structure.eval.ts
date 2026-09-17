import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { caseOf, describeTask, expect } from 'vieval'

function skillDirectories(root: string): string[] {
  const result: string[] = []
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const path = join(root, entry.name)
    if (!entry.isDirectory()) continue
    if (existsSync(join(path, 'SKILL.md'))) result.push(path)
    result.push(...skillDirectories(path))
  }
  return result
}

describeTask('skill-structure', () => {
  for (const path of skillDirectories('skills')) {
    const name = path.split(/[\\/]/).at(-1)!
    caseOf(path, () => {
      const text = readFileSync(join(path, 'SKILL.md'), 'utf8')
      const header = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
      expect(header).not.toBeNull()
      expect(header![1].split(/\r?\n/)).toContain(`name: ${name}`)
      expect(header![1]).toMatch(/^description: .+/m)
      expect(name).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      expect(name.length).toBeLessThanOrEqual(64)
      expect(text.slice(header![0].length).trim().length).toBeGreaterThan(0)
    })
  }

  caseOf('template', () => {
    const template = readFileSync('templates/SKILL.md', 'utf8')
    expect(template).toMatch(/^---\r?\n/)
    expect(template).toContain('name: skill-name')
    expect(template).toContain('## Scope')
    expect(template).toContain('## Verification')
  })
})
