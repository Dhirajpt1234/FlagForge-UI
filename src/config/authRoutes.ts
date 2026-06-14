export const AUTH_ROUTES = {
  BASE: '/api/auth',
  V1: '/v1',
  SIGNUP: '/signup',
  LOGIN: '/login',
  REFRESH: '/refresh',
  LOGOUT: '/logout',
  PROFILE: '/profile',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const;

export const getAuthRoute = (route: string): string => {
  return `${AUTH_ROUTES.BASE}${AUTH_ROUTES.V1}${route}`;
};

export default AUTH_ROUTES;
