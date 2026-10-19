import { getEnv } from "@/env";
import { createDeepSeekComplete, createDeepSeekGrader } from "./deepseek-grader";
import { fakeGrader } from "./fake-grader";

export interface GradeInput {
  type?: "short" | "fill" | "code";
  blankCount?: number;
  blankOrder?: "ordered" | "unordered";
  stem: string;
  referenceAnswer: string;
  userAnswer: string;
}

export interface GradeResult {
  verdict: "correct" | "incorrect";
  /** 给用户看的中文评语 */
  feedback: string;
}

export interface ShortAnswerGrader {
  /** 成功时返回判定和评语；任何失败都抛出错误，由调用方决定何时重试 */
  grade(input: GradeInput): Promise<GradeResult>;
}

let cached: ShortAnswerGrader | undefined;

/** 按环境变量 GRADER 选择评分器：deepseek（默认）或 fake */
export function getGrader(): ShortAnswerGrader {
  if (cached) return cached;
  const env = getEnv();
  cached =
    env.GRADER === "fake"
      ? fakeGrader
      : createDeepSeekGrader({
          complete: createDeepSeekComplete({
            apiKey: env.DEEPSEEK_API_KEY!,
            model: env.DEEPSEEK_MODEL,
          }),
        });
  return cached;
}
