export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  phoneNumber?: string;
  timezone?: string;
  locale: string;
  isActive: boolean;
  lastLoginAt?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
}
