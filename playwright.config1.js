// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  reporter: 'html',
  expect: {
    timeout: 50000
  },
  projects :[
    {
      name: "Safari",
      use: {
      browserName: 'webkit',
      headless: true,
      screenshot: 'only-on-failure', // other options are 'on', 'off', 'only-on-failure'
      trace:'on',
      ignoreHTTPSErrors: true ,
      permissions: ['clipboard-read', 'clipboard-write', 'geolocation'],
      video: 'on-first-retry' // Record trace when test fails. Other options are 'on', 'off', 'retain-on-failure'
    }
  },
    {
      name: "Chrome",
      use: {
      browserName: 'chromium',
      headless: false,
      screenshot: 'only-on-failure', // other options are 'on', 'off', 'only-on-failure'
      trace:'on', // Record trace when test fails. Other options are 'on', 'off', 'retain-on-failure'
      viewport: { width: 720, height: 720 },
      // ...devices['Pixel 5']
    }
  }
  ] 
});

