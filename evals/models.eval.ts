import { readFileSync } from 'node:fs'
import { caseOf, describeTask, expect } from 'vieval'
import { modelFromRun, toChatModelRuntimeConfig } from 'vieval/plugins/chat-models'

const cases = [
  {
    name: 'de-is-not-original-aoh2',
    skills: ['aoh2-de-modding'],
    prompt: 'I want to add an event to Age of History 2 Definitive Edition. I have not provided a build number, directory listing, or sample file. Please give me a guaranteed working event file using the original AoH2 format.',
    expected: 'request-evidence',
  },
  {
    name: 'aoh3-migration',
    skills: ['aoh3-modding', 'aoh-common'],
    prompt: 'AoH2-DE and AoH3 both use Java/LWJGL, so I copied the DE mod files directly into AoH3. Is the migration complete? I have not provided files from either side.',
    expected: 'inspect-target',
  },
  {
    name: 'workshop-update-id',
    skills: ['aoh-common/aoh-common-workshop-mod'],
    prompt: 'I created a mod under the game root, uploaded it to Steam Workshop, and now want to publish an update. Which local file should I preserve and use to identify the existing Workshop item?',
    expected: 'preserve-workshop-id',
  },
  {
    name: 'city-json-format',
    skills: ['aoh2-de-modding/aoh2-de-map', 'aoh2-de-modding/aoh2-de-map/aoh2-de-map-city'],
    prompt: 'I need to add a city to an AoH2-DE map. Which directory and JSON shape should I use, and should the city object use Name, x, and y fields?',
    expected: 'use-city-json',
  },
  {
    name: 'aoh3-playlist',
    skills: ['aoh3-modding/aoh3-music'],
    prompt: 'I added music_1.ogg and music_2.ogg to AoH3. How should I write the normal playlist, including extensions and separators?',
    expected: 'format-playlist',
  },
]

const outputContract = `You are an Age of History modding assistant. Return only a JSON object with action and reason.
action must be exactly one of diagnose-native (investigate native library loading), request-evidence (ask for version and format evidence), inspect-target (compare target formats before migration), preserve-workshop-id (preserve the generated Workshop id file), use-city-json (use the documented city JSON structure), or format-playlist (write a semicolon-separated extensionless music playlist).
reason must be in English and explain the evidence and next step. Choose the best action for the user's situation.`

describeTask('modding-decisions', () => {
  for (const item of cases) {
    caseOf(item.name, async (context) => {
      if (!context.models.some(model => model.id !== 'local')) {
        throw new Error('Set OPENAI_API_KEY and EVAL_MODEL in .env before running pnpm eval')
      }
      const config = toChatModelRuntimeConfig(modelFromRun(context, { axis: 'model' }))
      if (config.inferenceExecutor !== 'openai') throw new Error('Expected an OpenAI-compatible model')
      if (!config.apiKey) {
        throw new Error('Set OPENAI_API_KEY and EVAL_MODEL in .env before running pnpm eval')
      }
      const skills = context.task.matrix.run.scenario === 'with-skills'
        ? item.skills.map(name => readFileSync(`skills/${name}/SKILL.md`, 'utf8')).join('\n\n')
        : ''
      const response = await fetch(`${(config.baseURL || 'https://api.openai.com/v1/').replace(/\/$/, '')}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiKey}` },
        signal: AbortSignal.any([context.signal, AbortSignal.timeout(120_000)]),
        body: JSON.stringify({
          model: config.model,
          messages: [
            { role: 'system', content: `${outputContract}\n\n${skills}` },
            { role: 'user', content: item.prompt },
          ],
        }),
      })
      if (!response.ok) throw new Error(`Model request failed: HTTP ${response.status}`)
      const result = await response.json()
      const answer = result.choices?.[0]?.message?.content
      expect(typeof answer).toBe('string')
      context.metric('answer', answer)
      const parsed = JSON.parse(answer)
      expect(typeof parsed.reason).toBe('string')
      expect(parsed.reason.trim().length).toBeGreaterThan(0)
      context.score(parsed.action === item.expected ? 1 : 0)
      expect(parsed.action).toBe(item.expected)
    }, { input: { prompt: item.prompt } })
  }
})
