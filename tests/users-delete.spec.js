// tests/users-delete.spec.js
const { test, expect, request } = require('@playwright/test');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const BASE_URL = process.env.BASE_URL || '';

test.describe('DELETE /api/users/:id', () => {

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

  test('Delete user with valid ID and token', async () => {
    const token = await getToken();
    const apiContext = await request.newContext();
    const response = await apiContext.delete(`${BASE_URL}/api/users/2`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(204);
  });

  test('Delete user with invalid ID', async () => {
    const token = await getToken();
    const apiContext = await request.newContext();
    const response = await apiContext.delete(`${BASE_URL}/api/users/999`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(404);
  });

  test('Delete user with invalid token', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.delete(`${BASE_URL}/api/users/2`, {
      headers: {
        Authorization: 'Bearer invalidtoken',
      },
    });

    expect(response.status()).toBe(401);
  });

});
