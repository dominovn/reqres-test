import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import UserApi from '../pages/userApi';

const userApi = new UserApi(process.env.BASE_URL || 'https://reqres.in/');
let token: string;
let response: any;

Given('I have a valid token', async function () {
  const loginResponse = await userApi.login('eve.holt@reqres.in', 'cityslicka');
  token = loginResponse.token;
});

When('I retrieve the list of users', async function () {
  response = await userApi.listUsers(token);
});

Then('the response should contain a list of users', async function () {
  expect(response).toHaveProperty('data');
  expect(response.data.length).toBeGreaterThan(0);
});

Given('I have a user to update', async function () {
  this.userId = 2; // Example user ID
  this.newUserData = {
    name: 'John Doe',
    job: 'Software Developer',
  };
});

When('I update the user\'s details', async function () {
  response = await userApi.updateUser(this.userId, this.newUserData, token);
});

Then('the user details should be updated successfully', async function () {
  expect(response).toHaveProperty('name', this.newUserData.name);
  expect(response).toHaveProperty('job', this.newUserData.job);
});

Given('I have a user to delete', async function () {
  this.userId = 2; // Example user ID
});

When('I delete the user', async function () {
  response = await userApi.deleteUser(this.userId, token);
});

Then('the user should be deleted successfully', async function () {
  expect(response).toEqual({});
});
