class Client {
  private baseUrl: string;

  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async get(url: string): Promise<any> {
    const response = await fetch(this.createUrl(url), this.createRequest('GET'));

    return await response.json();
  }

  public async post(url: string, data?: any): Promise<any> {
    const response = await fetch(this.createUrl(url), this.createRequest('POST', data));

    return await response.json();
  }

  public async delete(url: string): Promise<any> {
    const response = await fetch(this.createUrl(url), this.createRequest('DELETE'));

    return await response.json();
  }

  private createUrl(url: string): string {
    const fullUrl = `${this.baseUrl}/${url}`;
    return fullUrl.replace(/([^:]\/)\/+/g, '$1');
  }

  private createRequest(method: string, data?: any): RequestInit {
    const request: RequestInit = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: data === undefined ? undefined : JSON.stringify(data),
    };
    return request;
  }
}

export const webApiClient = new Client(window._env_.webapiUrl);
export const identityApiClient = new Client(window._env_.identityApiUrl);
export const notificationApiClient = new Client(window._env_.notificationApiUrl);
export const reportApiClient = new Client(window._env_.reportApiUrl);
export const sabitApiClient = new Client(window._env_.sabitApiUrl);
export { HttpStatusCode } from './HttpStatusCode';
