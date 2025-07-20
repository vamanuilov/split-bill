import { apiClient } from './apiClient';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token?: string;
}

export const authService = {
  login: (credentials: LoginRequest) => 
    apiClient.post<AuthResponse>('/auth/login', credentials),
  
  register: (userData: RegisterRequest) => 
    apiClient.post<AuthResponse>('/auth/register', userData),
  
  getCurrentUser: () => 
    apiClient.get<User>('/auth/me'),
  
  logout: () => 
    apiClient.post<void>('/auth/logout', {}),
};
