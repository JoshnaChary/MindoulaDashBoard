import { AppConstants } from '../constants/AppConstants';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export const ApiService = {
  fetch: async <T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> => {
    try {
      const response = await fetch(`${AppConstants.api.baseUrl}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok');
      }

      return {
        data,
        error: null,
        status: response.status,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.message || 'Something went wrong',
        status: 500,
      };
    }
  },

  get: <T>(url: string, options?: RequestInit) => {
    return ApiService.fetch<T>(url, { ...options, method: 'GET' });
  },

  post: <T, U = Record<string, unknown>>(url: string, body: U, options?: RequestInit) => {
    return ApiService.fetch<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
};
