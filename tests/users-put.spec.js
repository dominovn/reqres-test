// tests/users-put.spec.js
const { test, expect, request } = require('@playwright/test');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const BASE_URL = process.env.BASE_URL || '';

test.describe('PUT /api/users/:id', () => {

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

  test('Update user with valid ID and token', async () => {
    const token = await getToken();
    const apiContext = await request.newContext();
    const response = await apiContext.put(`${BASE_URL}/api/users/2`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: 'John Doe',
        job: 'Software Developer',
      },
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('name', 'John Doe');
    expect(responseBody).toHaveProperty('job', 'Software Developer');
  });

  test('Update user with invalid ID', async () => {
    const token = await getToken();
    const apiContext = await request.newContext();
    const response = await apiContext.put(`${BASE_URL}/api/users/999`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: 'John Doe',
        job: 'Software Developer',
      },
    });

    expect(response.status()).toBe(404);
  });

  test('Update user with missing fields', async () => {
    const token = await getToken();
    const apiContext = await request.newContext();
    const response = await apiContext.put(`${BASE_URL}/api/users/2`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: 'John Doe',
      },
    });

    expect(response.status()).toBe(400);
  });

});
