import { ApiService } from '../apiService';
import { AppConstants } from '../../constants/AppConstants';

describe('ApiService', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it('fetch returns data on ok response', async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ hello: 'world' }),
    });

    const result = await ApiService.fetch<{ hello: string }>('/test');

    expect(fetchMock).toHaveBeenCalledWith(`${AppConstants.api.baseUrl}/test`, expect.any(Object));
    expect(result).toEqual({
      data: { hello: 'world' },
      error: null,
      status: 200,
    });
  });

  it('fetch returns error message on non-ok response', async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: false,
      status: 400,
      json: jest.fn().mockResolvedValue({ message: 'Bad Request' }),
    });

    const result = await ApiService.fetch('/test');

    expect(result.data).toBeNull();
    expect(result.error).toBe('Bad Request');
    expect(result.status).toBe(500);
  });

  it('fetch falls back on non-ok response when message is missing', async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: false,
      status: 400,
      json: jest.fn().mockResolvedValue({}),
    });

    const result = await ApiService.fetch('/test');

    expect(result.data).toBeNull();
    expect(result.error).toBe('Network response was not ok');
    expect(result.status).toBe(500);
  });

  it('fetch returns fallback error on thrown error', async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockRejectedValue(new Error('Boom'));

    const result = await ApiService.fetch('/test');

    expect(result.data).toBeNull();
    expect(result.error).toBe('Boom');
    expect(result.status).toBe(500);
  });

  it('fetch falls back when thrown error message is empty', async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockRejectedValue(new Error(''));

    const result = await ApiService.fetch('/test');

    expect(result.data).toBeNull();
    expect(result.error).toBe('Something went wrong');
    expect(result.status).toBe(500);
  });

  it('get uses GET method', async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ ok: true }),
    });

    await ApiService.get('/get-test');

    expect(fetchMock).toHaveBeenCalledWith(
      `${AppConstants.api.baseUrl}/get-test`,
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('post uses POST method and stringifies body', async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: true,
      status: 201,
      json: jest.fn().mockResolvedValue({ created: true }),
    });

    const body = { a: 1 };
    await ApiService.post('/post-test', body);

    expect(fetchMock).toHaveBeenCalledWith(
      `${AppConstants.api.baseUrl}/post-test`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(body),
      }),
    );
  });
});
