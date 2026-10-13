import { z } from "zod";

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);

const envSchema = z
  .object({
    DATABASE_URL: z.string().min(1, "必须设置 DATABASE_URL"),
    GRADER: z.preprocess(emptyToUndefined, z.enum(["deepseek", "fake"]).default("deepseek")),
    DEEPSEEK_API_KEY: z.preprocess(emptyToUndefined, z.string().optional()),
    DEEPSEEK_MODEL: z.preprocess(emptyToUndefined, z.string().default("deepseek-flash")),
    GRADING_DAILY_CAP: z.preprocess(
      emptyToUndefined,
      z.coerce.number().int().positive().default(5000),
    ),
  })
  .refine((env) => env.GRADER !== "deepseek" || Boolean(env.DEEPSEEK_API_KEY), {
    path: ["DEEPSEEK_API_KEY"],
    message: "GRADER=deepseek 时必须设置 DEEPSEEK_API_KEY",
  });

export type Env = z.infer<typeof envSchema>;

let cached: Env | undefined;

/** 首次调用时校验环境变量；不在模块加载时校验，这样构建阶段不需要数据库和密钥。 */
export function getEnv(): Env {
  if (cached) return cached;
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("；");
    throw new Error(`环境变量配置有误：${details}`);
  }
  cached = result.data;
  return cached;
}
