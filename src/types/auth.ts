import type { User } from './common';

export interface SignupRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  organization: {
    name: string;
    slug?: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
}

export interface SignupCompleteResponse {
  user: User;
  organization: Organization;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}
