// tests/api.spec.js

const { test, expect, request } = require('@playwright/test');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const BASE_URL = process.env.BASE_URL || '';
const EMAIL = process.env.EMAIL || '';
const PASSWORD = process.env.PASSWORD || '';
const INVALID_PASSWORD = process.env.INVALID_PASSWORD || '';

let token;

test.describe('Reqres API Tests', () => {
  
  // Before all tests, obtain a valid token for authentication
  test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(`${BASE_URL}/api/login`, {
      data: {
        email: EMAIL,
        password: PASSWORD,
      },
    });

    expect(loginResponse.ok()).toBeTruthy();
    const loginData = await loginResponse.json();
    token = loginData.token;
  });

  // Test cases for POST /api/login
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

  // Test cases for GET /api/users
  test.describe('GET /api/users', () => {

    test('Fetch users with valid token', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      expect(Array.isArray(responseBody.data)).toBeTruthy();
    });

    test('Fetch users with invalid token', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/users`, {
        headers: {
          Authorization: 'Bearer invalidtoken',
        },
      });

      expect(response.status()).toBe(401);
    });

    test('Fetch users with query parameters', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/users`, {
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

  // Test cases for PUT /api/users/:id
  test.describe('PUT /api/users/:id', () => {

    test('Update user with valid ID and token', async ({ request }) => {
      const response = await request.put(`${BASE_URL}/api/users/2`, {
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

    test('Update user with invalid ID', async ({ request }) => {
      const response = await request.put(`${BASE_URL}/api/users/999`, {
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

    test('Update user with missing fields', async ({ request }) => {
      const response = await request.put(`${BASE_URL}/api/users/2`, {
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

  // Test cases for DELETE /api/users/:id
  test.describe('DELETE /api/users/:id', () => {

    test('Delete user with valid ID and token', async ({ request }) => {
      const response = await request.delete(`${BASE_URL}/api/users/2`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status()).toBe(204);
    });

    test('Delete user with invalid ID', async ({ request }) => {
      const response = await request.delete(`${BASE_URL}/api/users/999`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status()).toBe(404);
    });

    test('Delete user with invalid token', async ({ request }) => {
      const response = await request.delete(`${BASE_URL}/api/users/2`, {
        headers: {
          Authorization: 'Bearer invalidtoken',
        },
      });

      expect(response.status()).toBe(401);
    });

  });

  // End-to-End Test 1: Login, Fetch Users, and Update a User
  test('E2E Test 1: Login, Fetch Users, and Update a User', async ({ request }) => {
    // Login
    const loginResponse = await request.post(`${BASE_URL}/api/login`, {
      data: {
        email: EMAIL,
        password: PASSWORD,
      },
    });

    expect(loginResponse.status()).toBe(200);
    const loginData = await loginResponse.json();
    const authToken = loginData.token;

    // Fetch Users
    const usersResponse = await request.get(`${BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(usersResponse.status()).toBe(200);
    const usersData = await usersResponse.json();
    const userId = usersData.data[0].id; // Get the first user's ID

    // Update User
    const updateResponse = await request.put(`${BASE_URL}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
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

  // End-to-End Test 2: Login and Delete a User
  test('E2E Test 2: Login and Delete a User', async ({ request }) => {
    // Login
    const loginResponse = await request.post(`${BASE_URL}/api/login`, {
      data: {
        email: EMAIL,
        password: PASSWORD,
      },
    });

    expect(loginResponse.status()).toBe(200);
    const loginData = await loginResponse.json();
    const authToken = loginData.token;

    // Delete User
    const deleteResponse = await request.delete(`${BASE_URL}/api/users/2`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(deleteResponse.status()).toBe(204);
  });

});

