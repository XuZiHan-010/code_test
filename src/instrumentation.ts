/** 应用服务启动时执行一次：启动简答题评分的定时扫描。 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  // 构建阶段不需要也不应该连接数据库
  if (process.env.NEXT_PHASE === "phase-production-build") return;
  const { startGradingTimer } = await import("@/server/grading/runner");
  startGradingTimer();
}
