// tests/login.spec.js
const { test, expect, request } = require('@playwright/test');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const BASE_URL = process.env.BASE_URL || '';
const EMAIL = process.env.EMAIL || '';
const PASSWORD = process.env.PASSWORD || '';
const INVALID_PASSWORD = process.env.INVALID_PASSWORD || '';

test.describe('POST /api/login', () => {
  
  test('Successful login with valid credentials', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/login`, {
      data: {
        email: EMAIL,
        password: PASSWORD,
      },
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
  });

  test('Unsuccessful login with invalid credentials', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/login`, {
      data: {
        email: EMAIL,
        password: INVALID_PASSWORD,
      },
    });

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error', 'user not found');
  });

  test('Unsuccessful login with missing fields', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/login`, {
      data: {
        email: EMAIL,
      },
    });

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error', 'Missing password');
  });

});
