import { cwd } from "node:process";
import { defineConfig, loadEnv } from "vieval";
import { ChatModels, chatModelFrom } from "vieval/plugins/chat-models";

const env = { ...loadEnv("test", cwd(), ""), ...process.env };
// Vieval 0.0.12 requires a model registration to execute module-defined cases.
const localModel = {
  id: "local",
  aliases: ["candidate"],
  model: "local",
  inferenceExecutor: "local",
  inferenceExecutorId: "local"
};

export default defineConfig({
  env,
  projects: [
    {
      name: "structure",
      root: ".",
      include: ["evals/structure.eval.ts"],
      models: [localModel],
      inferenceExecutors: [{ id: "local" }]
    },
    {
      name: "models",
      root: ".",
      include: ["evals/models.eval.ts"],
      models: env.OPENAI_API_KEY && env.EVAL_MODEL ? [] : [localModel],
      plugins:
        env.OPENAI_API_KEY && env.EVAL_MODEL
          ? [
              ChatModels({
                models: [
                  chatModelFrom({
                    aliases: ["candidate"],
                    inferenceExecutor: "openai",
                    apiKey: env.OPENAI_API_KEY,
                    baseURL: env.OPENAI_BASE_URL || "https://api.openai.com/v1/",
                    model: env.EVAL_MODEL
                  })
                ]
              })
            ]
          : [],
      runMatrix: {
        extend: { model: ["candidate"], scenario: ["baseline", "with-skills"] }
      }
    }
  ]
});
