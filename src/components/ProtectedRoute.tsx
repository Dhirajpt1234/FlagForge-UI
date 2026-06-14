import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { cookieService } from '../services/cookieService';
import { storageService } from '../services/storageService';
import { fetchProfile, logoutSuccess } from '../redux/slices/authSlice';
import type { RootState, AppDispatch } from '../redux/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = cookieService.getAccessToken();
      const userData = storageService.getUserData();

      if (accessToken && userData) {
        // User is authenticated, fetch fresh profile data
        try {
          await dispatch(fetchProfile()).unwrap();
        } catch (error) {
          // If profile fetch fails, logout user
          dispatch(logoutSuccess());
        }
      }
    };

    checkAuth();
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const accessToken = cookieService.getAccessToken();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
