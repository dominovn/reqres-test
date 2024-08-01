import ApiClient from './apiClient';

class UserApi {
  private apiClient: ApiClient;

  constructor(baseURL: string) {
    this.apiClient = new ApiClient(baseURL);
  }

  async login(email: string, password: string) {
    return this.apiClient.post('/api/login', { email, password });
  }

  async listUsers(token: string) {
    return this.apiClient.get('/api/users', { Authorization: `Bearer ${token}` });
  }

  async updateUser(userId: number, data: Record<string, any>, token: string) {
    return this.apiClient.put(`/api/users/${userId}`, data, { Authorization: `Bearer ${token}` });
  }

  async deleteUser(userId: number, token: string) {
    return this.apiClient.delete(`/api/users/${userId}`, { Authorization: `Bearer ${token}` });
  }
}

export default UserApi;
