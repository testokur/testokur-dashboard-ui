import { webApiClient } from '.';

describe('http', () => {
  it('get returns json response', async () => {
    const mockFetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: '12345',
          }),
      }),
    );
    window.fetch = mockFetch;
    localStorage.setItem('access_token', 'token-1234');

    const response = await webApiClient.get('api/v1/statistics');
    expect(response.data).toEqual('12345');
    expect(mockFetch.mock.calls[0][0]).toBe(`${window._env_.webapiUrl}/api/v1/statistics`);
    expect(mockFetch.mock.calls[0][1].headers.Authorization).toBe(`Bearer ${localStorage.getItem('access_token')}`);
  });
});
