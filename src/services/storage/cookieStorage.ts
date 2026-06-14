import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'flagforge_access_token';
const REFRESH_TOKEN_KEY = 'flagforge_refresh_token';

export const cookieStorage = {
  setAccessToken: (token: string): void => {
    Cookies.set(ACCESS_TOKEN_KEY, token, {
      secure: true,
      sameSite: 'strict',
      expires: 1, // 1 day
    });
  },

  getAccessToken: (): string | undefined => {
    return Cookies.get(ACCESS_TOKEN_KEY);
  },

  removeAccessToken: (): void => {
    Cookies.remove(ACCESS_TOKEN_KEY);
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

export default cookieStorage;
