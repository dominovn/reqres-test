import { expect, test } from '@playwright/test';
import { config } from '../utils/config';

test.describe('Environment Tests', () => {
  test('Verify Test Environment', async ({ request }) => {
    const response = await request.get(`${config.baseUrl}/api/users`);
    expect(response.ok()).toBeTruthy();
    expect(response.url()).toContain('test');
  });

  test('Verify Stage Environment', async ({ request }) => {
    const response = await request.get(`${config.baseUrl}/api/users`);
    expect(response.ok()).toBeTruthy();
    expect(response.url()).toContain('stage');
  });
});
