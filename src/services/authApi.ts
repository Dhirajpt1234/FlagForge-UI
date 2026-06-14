import { apiService } from './api';
import type {
  SignupRequest,
  LoginRequest,
  AuthResponse,
  SignupCompleteResponse,
  ForgotPasswordResponse,
  ResetPasswordRequest,
} from '../types';
import { getAuthRoute, AUTH_ROUTES } from '../config/authRoutes';

export const authApi = {
  login: (data: LoginRequest) =>
    apiService.post<AuthResponse>(getAuthRoute(AUTH_ROUTES.LOGIN), data),

  signup: (data: SignupRequest) =>
    apiService.post<SignupCompleteResponse>(getAuthRoute(AUTH_ROUTES.SIGNUP), data),

  refreshToken: (data: { refreshToken: string }) =>
    apiService.post<AuthResponse>(getAuthRoute(AUTH_ROUTES.REFRESH), data),

  logout: (refreshToken: string) =>
    apiService.post<void>(getAuthRoute(AUTH_ROUTES.LOGOUT), { refreshToken }),

  forgotPassword: (email: string) =>
    apiService.post<ForgotPasswordResponse>(getAuthRoute(AUTH_ROUTES.FORGOT_PASSWORD), { email }),

  resetPassword: (data: ResetPasswordRequest) =>
    apiService.post<void>(getAuthRoute(AUTH_ROUTES.RESET_PASSWORD), data),

  getProfile: () =>
    apiService.get<any>(getAuthRoute(AUTH_ROUTES.PROFILE)),
};

export default authApi;
