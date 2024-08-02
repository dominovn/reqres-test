// tests/users-get.spec.js
const { test, expect, request } = require('@playwright/test');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const BASE_URL = process.env.BASE_URL || '';

test.describe('GET /api/users', () => {

  const getToken = async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(`${BASE_URL}/api/login`, {
      data: {
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      },
    });

    const loginData = await loginResponse.json();
    return loginData.token;
  };

  test('Fetch users with valid token', async () => {
    const token = await getToken();
    const apiContext = await request.newContext();
    const response = await apiContext.get(`${BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody.data)).toBeTruthy();
  });

  test('Fetch users with invalid token', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.get(`${BASE_URL}/api/users`, {
      headers: {
        Authorization: 'Bearer invalidtoken',
      },
    });

    expect(response.status()).toBe(401);
  });

  test('Fetch users with query parameters', async () => {
    const token = await getToken();
    const apiContext = await request.newContext();
    const response = await apiContext.get(`${BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: 2,
      },
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody.data)).toBeTruthy();
    expect(responseBody.page).toBe(2);
  });

});
