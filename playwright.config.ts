import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 30000,
  use: {
    baseURL: process.env.BASE_URL || 'https://reqres.in/',
    extraHTTPHeaders: {
      // Authorization header will be set in tests
    },
  },
  reporter: [['list'], ['html', { outputFolder: 'reports', open: 'never' }]],
  projects: [
    {
      name: 'Test Environment',
      use: {
        baseURL: 'https://test.reqres.in/',
      },
    },
    {
      name: 'Stage Environment',
      use: {
        baseURL: 'https://stage.reqres.in/',
      },
    },
  ],
};

export default config;
