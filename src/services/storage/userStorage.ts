import type { User } from '../../types';

const USER_DATA_KEY = 'flagforge_user_data';

export const userStorage = {
  setUserData: (user: User): void => {
    try {
      const serializedData = JSON.stringify(user);
      console.log("user data in serialized", serializedData);
      localStorage.setItem(USER_DATA_KEY, serializedData);
    } catch (error) {
      console.error('Error storing user data in localStorage:', error);
    }
  },

  getUserData: (): User | null => {
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
};

export default userStorage;
