import { useState, useMemo, useCallback } from 'react';
import { ApiClient, RequestOptions } from '../services/api/client';

interface UseApiState<T = unknown> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

type ApiMethods = {
  get: <T>(endpoint: string, options?: Omit<RequestOptions, 'body'>) => Promise<T>;
  post: <T>(endpoint: string, options?: RequestOptions) => Promise<T>;
  put: <T>(endpoint: string, options?: RequestOptions) => Promise<T>;
  patch: <T>(endpoint: string, options?: RequestOptions) => Promise<T>;
  delete: <T>(endpoint: string, options?: RequestOptions) => Promise<T>;
};

export function useApi<T = unknown>(): UseApiState<T> & ApiMethods {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const apiClient = useMemo(() => new ApiClient(), []);

  const handleRequest = useCallback(async <R>(requestFn: () => Promise<R>): Promise<R> => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const result = await requestFn();
      setState((prev) => ({
        ...prev,
        data: result as T,
        isLoading: false,
      }));
      return result;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error as Error,
        isLoading: false,
      }));
      throw error;
    }
  }, []);

  const get = useCallback(
    <R>(endpoint: string, options?: Omit<RequestOptions, 'body'>): Promise<R> =>
      handleRequest(() => apiClient.get<R>(endpoint, options)),
    [handleRequest, apiClient]
  );

  const post = useCallback(
    <R>(endpoint: string, options?: RequestOptions): Promise<R> =>
      handleRequest(() => apiClient.post<R>(endpoint, options)),
    [handleRequest, apiClient]
  );

  const put = useCallback(
    <R>(endpoint: string, options?: RequestOptions): Promise<R> =>
      handleRequest(() => apiClient.put<R>(endpoint, options)),
    [handleRequest, apiClient]
  );

  const patch = useCallback(
    <R>(endpoint: string, options?: RequestOptions): Promise<R> =>
      handleRequest(() => apiClient.patch<R>(endpoint, options)),
    [handleRequest, apiClient]
  );

  const delete_ = useCallback(
    <R>(endpoint: string, options?: RequestOptions): Promise<R> =>
      handleRequest(() => apiClient.delete<R>(endpoint, options)),
    [handleRequest, apiClient]
  );

  return {
    ...state,
    get,
    post,
    put,
    patch,
    delete: delete_,
  };
}
