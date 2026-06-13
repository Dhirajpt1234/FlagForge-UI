import { useState, useCallback } from 'react';
import { ApiResponse, ApiError } from '../types';

interface UseAxiosResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: () => Promise<void>;
  reset: () => void;
}

export const useAxios = <T>(
  axiosCall: () => Promise<ApiResponse<T>>
): UseAxiosResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosCall();
      setData(response.data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [axiosCall]);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, execute, reset };
};
