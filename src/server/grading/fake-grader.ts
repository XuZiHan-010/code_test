import type { ShortAnswerGrader } from "./grader";

/**
 * 不联网的评分器，供开发和自动化测试使用。按答案的开头决定结果：
 * 【对】判对，【错】判错，【失败】模拟评分服务出错，其余一律判错。
 */
export const fakeGrader: ShortAnswerGrader = {
  async grade({ userAnswer }) {
    const answer = userAnswer.trim();
    if (answer.startsWith("【失败】")) {
      throw new Error("假评分器：模拟评分服务不可用");
    }
    if (answer.startsWith("【对】")) {
      return { verdict: "correct", feedback: "（假评分器）答案以【对】开头，判为答对。" };
    }
    if (answer.startsWith("【错】")) {
      return { verdict: "incorrect", feedback: "（假评分器）答案以【错】开头，判为答错。" };
    }
    return {
      verdict: "incorrect",
      feedback: "（假评分器）答案没有以【对】开头，判为答错。",
    };
  },
};
