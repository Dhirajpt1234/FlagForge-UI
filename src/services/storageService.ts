import type { User, Organization } from '../types';

const USER_DATA_KEY = 'flagforge_user_data';
const REFRESH_TOKEN_KEY = 'flagforge_refresh_token';

export const storageService = {
  setUserData: (user: User, organization: Organization | null): void => {
    const data = { user, organization };
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
  },

  getUserData: (): { user: User; organization: Organization | null } | null => {
    const data = localStorage.getItem(USER_DATA_KEY);
    if (data === null) {
      return null;
    }
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  },

  removeUserData: (): void => {
    localStorage.removeItem(USER_DATA_KEY);
  },

  setRefreshToken: (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  removeRefreshToken: (): void => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

export default storageService;
