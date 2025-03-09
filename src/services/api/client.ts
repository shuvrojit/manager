export interface RequestOptions {
  params?: Record<string, string>;
  body?: unknown;
  headers?: Record<string, string>;
}

interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = import.meta.env.VITE_API_BASE_URL) {
    if (!baseUrl) {
      throw new Error('API base URL is required. Check environment variables.');
    }
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash if present
  }

  private async request<T>(
    endpoint: string,
    method: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, body, headers = {} } = options;

    // Build URL with query parameters
    const url = new URL(this.baseUrl + endpoint);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    // Build request options
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url.toString(), requestOptions);
      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message || 'Request failed') as ApiError;
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data as T;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  async get<T>(endpoint: string, options: Omit<RequestOptions, 'body'> = {}): Promise<T> {
    return this.request<T>(endpoint, 'GET', options);
  }

  async post<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, 'POST', options);
  }

  async put<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, 'PUT', options);
  }

  async patch<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, 'PATCH', options);
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', options);
  }
}
