import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'flagforge_access_token';

export const cookieService = {
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
};

export default cookieService;
