import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import UserApi from '../pages/userApi';

const userApi = new UserApi(process.env.BASE_URL || 'https://reqres.in/');
let token: string;
let response: any;

Given('I have valid login credentials', async function () {
  this.email = 'eve.holt@reqres.in';
  this.password = 'cityslicka';
});

Given('I have invalid login credentials', async function () {
  this.email = 'invalid@example.com';
  this.password = 'wrongpassword';
});

When('I perform a successful login', async function () {
  response = await userApi.login(this.email, this.password);
  token = response.token;
});

When('I perform an unsuccessful login', async function () {
  response = await userApi.login(this.email, this.password);
});

Then('I should receive a token', async function () {
  expect(response).toHaveProperty('token');
  expect(token).not.toBeNull();
});

Then('I should receive an error message', async function () {
  expect(response).toHaveProperty('error');
  expect(response.error).toEqual('user not found');
});
