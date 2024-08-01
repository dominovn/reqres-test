import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import UserApi from '../pages/userApi';

const userApi = new UserApi(process.env.BASE_URL || 'https://reqres.in/');
let token: string;
let response: any;
let userId: number;

Given('I perform a successful login', async function () {
  const loginResponse = await userApi.login('eve.holt@reqres.in', 'cityslicka');
  token = loginResponse.token;
});

Given('I update a user\'s details', async function () {
  userId = 2; // Example user ID
  const newUserData = {
    name: 'Jane Smith',
    job: 'Product Manager',
  };
  response = await userApi.updateUser(userId, newUserData, token);
  expect(response).toHaveProperty('name', newUserData.name);
  expect(response).toHaveProperty('job', newUserData.job);
});

Then('the user should no longer exist', async function () {
  const userResponse = await userApi.listUsers(token);
  const userExists = userResponse.data.some((user: any) => user.id === userId);
  expect(userExists).toBeFalsy();
});

When('I try to access resources without a valid token', async function () {
  response = await userApi.listUsers('invalid_token');
});

Then('I should receive an unauthorized error', async function () {
  expect(response).toHaveProperty('error');
  expect(response.error).toEqual('Unauthorized');
});
