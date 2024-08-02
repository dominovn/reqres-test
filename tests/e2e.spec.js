// tests/e2e.spec.js
const { test, expect, request } = require('@playwright/test');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const BASE_URL = process.env.BASE_URL || '';

test.describe('End-to-End Tests', () => {

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

  test('E2E Test 1: Login, Fetch Users, and Update a User', async () => {
    const token = await getToken();
    const apiContext = await request.newContext();
    
    // Fetch Users
    const usersResponse = await apiContext.get(`${BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(usersResponse.status()).toBe(200);
    const usersData = await usersResponse.json();
    const userId = usersData.data[0].id; // Get the first user's ID

    // Update User
    const updateResponse = await apiContext.put(`${BASE_URL}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: 'Jane Doe',
        job: 'Product Manager',
      },
    });

    expect(updateResponse.status()).toBe(200);
    const updateData = await updateResponse.json();
    expect(updateData).toHaveProperty('name', 'Jane Doe');
    expect(updateData).toHaveProperty('job', 'Product Manager');
  });

  test('E2E Test 2: Login and Delete a User', async () => {
    const token = await getToken();
    const apiContext = await request.newContext();
    
    // Delete User
    const deleteResponse = await apiContext.delete(`${BASE_URL}/api/users/2`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(deleteResponse.status()).toBe(204);
  });

});
