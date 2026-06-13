export interface User {
  id: string;
  email: string;
  name: string;
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
