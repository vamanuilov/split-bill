/**
 * API Client для взаимодействия с бэкендом
 */

const API_BASE_URL = '/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Произошла ошибка при запросе к API' };
    }

    return { data };
  } catch (error) {
    console.error('API request failed:', error);
    return { error: 'Не удалось выполнить запрос к серверу' };
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) => 
    fetchApi<T>(endpoint, { ...options, method: 'GET' }),
  
  post: <T>(endpoint: string, data: any, options?: RequestInit) => 
    fetchApi<T>(endpoint, { 
      ...options, 
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  put: <T>(endpoint: string, data: any, options?: RequestInit) => 
    fetchApi<T>(endpoint, { 
      ...options, 
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: <T>(endpoint: string, options?: RequestInit) => 
    fetchApi<T>(endpoint, { ...options, method: 'DELETE' }),
};
