import axiosInstance from '../config/axios';
import { ApiResponse, PaginatedResponse } from '../types';

export const apiService = {
  get: <T>(url: string) => axiosInstance.get<ApiResponse<T>>(url),
  post: <T>(url: string, data: unknown) => axiosInstance.post<ApiResponse<T>>(url, data),
  put: <T>(url: string, data: unknown) => axiosInstance.put<ApiResponse<T>>(url, data),
  patch: <T>(url: string, data: unknown) => axiosInstance.patch<ApiResponse<T>>(url, data),
  delete: <T>(url: string) => axiosInstance.delete<ApiResponse<T>>(url),
  getPaginated: <T>(url: string, params: Record<string, unknown>) =>
    axiosInstance.get<ApiResponse<PaginatedResponse<T>>>(url, { params }),
};
