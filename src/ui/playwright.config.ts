import { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'https://www.libib.com/',
    headless: false,
    screenshot: 'only-on-failure',
    viewport: { height: 1400, width: 1600 },
    actionTimeout: 10000,
    navigationTimeout: 30000,
    channel: 'chrome'
  },
};

export default config;
