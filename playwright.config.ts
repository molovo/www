import { defineConfig } from '@playwright/test'

const port = 3100

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: `http://localhost:${port}` },
  webServer: {
    // instant() needs the testing API, which only exists in builds made with this flag
    command: `EXPOSE_TESTING_API=1 yarn build && yarn start -p ${port}`,
    port,
    timeout: 300_000,
    reuseExistingServer: !process.env.CI,
  },
})
