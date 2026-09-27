import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  reporter: "list",
  use: { baseURL: "http://localhost:3000", reducedMotion: "reduce", trace: "retain-on-failure", channel: process.env.PLAYWRIGHT_CHANNEL },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } } },
    { name: "mobile", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" } },
  ],
  webServer: { command: `${process.platform === "win32" ? "npm.cmd" : "npm"} run dev`, url: "http://localhost:3000", reuseExistingServer: !process.env.CI, timeout: 120_000 },
});
