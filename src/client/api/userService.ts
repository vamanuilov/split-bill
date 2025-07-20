import { apiClient } from './apiClient';
import type { Currency } from '../types';

interface UserSettings {
  theme?: 'light' | 'dark';
  currency?: Currency;
  friends?: string[];
}

export const userService = {
  getSettings: () => 
    apiClient.get<UserSettings>('/user/settings'),
  
  updateSettings: (settings: Partial<UserSettings>) => 
    apiClient.put<UserSettings>('/user/settings', settings),  
  
  getFriends: () => 
    apiClient.get<string[]>('/user/friends'),
  
  addFriend: (name: string) => 
    apiClient.post<string[]>('/user/friends', { name }),
  
  removeFriend: (name: string) => 
    apiClient.delete<string[]>(`/user/friends/${encodeURIComponent(name)}`),
};
