import { renderHook, act } from '@testing-library/react';
import { useApi } from './useApi';
import { ApiClient } from '../services/api/client';
import { vi, describe, it, expect, beforeEach } from 'vitest';

const mockGet = vi.fn();
const mockPost = vi.fn();
const mockPut = vi.fn();
const mockPatch = vi.fn();
const mockDelete = vi.fn();

// Mock ApiClient
vi.mock('../services/api/client', () => ({
  ApiClient: vi.fn().mockImplementation(() => ({
    get: mockGet,
    post: mockPost,
    put: mockPut,
    patch: mockPatch,
    delete: mockDelete,
  })),
}));

describe('useApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle successful GET request', async () => {
    const mockData = { id: 1, name: 'Test' };
    mockGet.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useApi());

    await act(async () => {
      await result.current.get<typeof mockData>('/test');
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle loading state', () => {
    const { result } = renderHook(() => useApi());

    act(() => {
      result.current.get('/test');
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('should handle error state', async () => {
    const mockError = new Error('API Error');
    mockGet.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useApi());

    await act(async () => {
      await result.current.get('/test').catch(() => {});
    });

    expect(result.current.error).toBe(mockError);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
  });

  it('should clear error on new request', async () => {
    const mockError = new Error('API Error');
    mockGet.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useApi());

    await act(async () => {
      await result.current.get('/test').catch(() => {});
    });

    expect(result.current.error).toBe(mockError);

    const mockData = { id: 1, name: 'Test' };
    mockGet.mockResolvedValueOnce(mockData);

    await act(async () => {
      await result.current.get('/test');
    });

    expect(result.current.error).toBeNull();
    expect(result.current.data).toBe(mockData);
  });

  it('should support POST requests with body', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockBody = { name: 'Test' };
    mockPost.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useApi());

    await act(async () => {
      await result.current.post<typeof mockData>('/test', { body: mockBody });
    });

    expect(mockPost).toHaveBeenCalledWith('/test', { body: mockBody });
    expect(result.current.data).toEqual(mockData);
  });
});
