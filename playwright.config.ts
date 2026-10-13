import { defineConfig } from "@playwright/test";

const port = 3100;

// 端到端冒烟流程：用假评分器和测试库启动应用，不调用真实的大模型接口。
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: false,
  workers: 1,
  use: { baseURL: `http://localhost:${port}` },
  webServer: {
    command: `npm run dev -- --port ${port}`,
    url: `http://localhost:${port}/api/health`,
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      GRADER: "fake",
      DATABASE_URL:
        process.env.TEST_DATABASE_URL ?? "postgres://quiz:quiz@localhost:54329/quiz_test",
    },
  },
});
