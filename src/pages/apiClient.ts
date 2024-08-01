import { request, APIRequestContext } from '@playwright/test';

class ApiClient {
  private requestContext: APIRequestContext;

  constructor(baseURL: string) {
    this.requestContext = request.newContext({
      baseURL,
    });
  }

  async post(endpoint: string, data: Record<string, any>) {
    const response = await this.requestContext.post(endpoint, {
      data,
    });
    return response.json();
  }

  async get(endpoint: string, headers: Record<string, string> = {}) {
    const response = await this.requestContext.get(endpoint, {
      headers,
    });
    return response.json();
  }

  async put(endpoint: string, data: Record<string, any>, headers: Record<string, string> = {}) {
    const response = await this.requestContext.put(endpoint, {
      data,
      headers,
    });
    return response.json();
  }

  async delete(endpoint: string, headers: Record<string, string> = {}) {
    const response = await this.requestContext.delete(endpoint, {
      headers,
    });
    return response.json();
  }
}

export default ApiClient;
