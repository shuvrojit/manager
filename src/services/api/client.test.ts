import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ApiClient } from './client';

describe('ApiClient', () => {
  let client: ApiClient;

  const TEST_API_URL = 'https://api.example.com';

  beforeEach(() => {
    // Create client with test URL
    client = new ApiClient(TEST_API_URL);
    // Reset fetch mock before each test
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('GET requests', () => {
    it('should make a GET request successfully', async () => {
      const mockData = { id: 1, name: 'Test' };
      const mockResponse = new Response(JSON.stringify(mockData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const result = await client.get<typeof mockData>('/test');

      expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/test', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(result).toEqual(mockData);
    });

    it('should handle query parameters correctly', async () => {
      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      await client.get('/test', { params: { id: '1', filter: 'active' } });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/test?id=1&filter=active',
        expect.any(Object)
      );
    });
  });

  describe('POST requests', () => {
    it('should make a POST request with body', async () => {
      const requestBody = { name: 'Test' };
      const mockResponse = new Response(JSON.stringify({ id: 1, ...requestBody }), {
        status: 201,
      });
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const result = await client.post('/test', { body: requestBody });

      expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      expect(result).toEqual({ id: 1, name: 'Test' });
    });
  });

  describe('Error handling', () => {
    it('should throw error for non-2xx responses', async () => {
      const errorResponse = new Response(JSON.stringify({ message: 'Not Found' }), {
        status: 404,
      });
      global.fetch = vi.fn().mockResolvedValue(errorResponse);

      await expect(client.get('/nonexistent')).rejects.toThrow('Not Found');
    });

    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(client.get('/test')).rejects.toThrow('Network error');
    });
  });
});
