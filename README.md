# Age of History Modding Skills

AI skills for developing mods for the Age of History series.

## Installation

```bash
npx skills add TASA-Ed/age-of-history-mod-dev-skills
# 或使用 pnpm
pnpx skills add TASA-Ed/age-of-history-mod-dev-skills
```

You can install only selected game-specific and common skills:

```bash
npx skills add TASA-Ed/age-of-history-mod-dev-skills --skill aoh2-de-modding aoh-common
```

## Structure

```text
templates/
  SKILL.md                      # Skill authoring template
skills/
  aoh-common/SKILL.md           # General Game Development Guidelines
    common-patch/SKILL.md       # Guide to Modifying Game Logic
    ...
  aoh-mod-upgrade/SKILL.md      # Module Upgrade Guide
  aoh2-de-modding/SKILL.md      # AoH2 Definitive Edition Development Guidelines
    map/SKILL.md                # Map content
      map-city/SKILL.md         # Cities and mountains
      ...
    ...
  aoh3-modding/SKILL.md         # AoH3 Development Guidelines
    music/SKILL.md              # Music playlists
    ...
evals/
  structure.eval.ts             # Offline structure checks
  models.eval.ts                # Model decision evaluation
vieval.config.ts                # Structure and model projects
.env.example                    # Model connection settings
```

The original non-DE AoH2 release is out of scope.

## Setup and Verification

Node.js is required:

```sh
pnpm install --frozen-lockfile
pnpm test
```

`pnpm test` checks the Skill file structure. It does not call a model or prove that the game knowledge is correct.

Create a root `.env` based on `.env.example` with `OPENAI_API_KEY`, `EVAL_MODEL`, and the optional `OPENAI_BASE_URL`. The URL should be an API root containing `/v1/`, and the model must support `/chat/completions` and text output. Then run:

```sh
pnpm eval
```

The current evaluation has 6 cases x 2 scenarios, for 12 model requests. Model usage may incur charges.

`baseline` does not inject skills. `with-skills` injects the real `SKILL.md` files selected by each case. The prompt, output contract, and scoring are otherwise identical. Change `EVAL_MODEL` and run the evaluation again to compare models; results are saved in `.vieval/reports/`.

The score checks whether the structured decision matches the expected action, while reports retain raw answers for manual review. This is a basic behavior test; it does not evaluate free-form answer quality, automatic skill selection, tool execution, or real mod development. The `baseline` also uses assertions, so an unexpected baseline answer can make the command fail; interpret it together with the scenario scores.
