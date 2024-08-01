import UserApi from '../pages/userApi';

export async function loginAndGetToken(): Promise<string> {
  const userApi = new UserApi(process.env.BASE_URL || 'https://reqres.in/');
  const response = await userApi.login('eve.holt@reqres.in', 'cityslicka');
  return response.token;
}
