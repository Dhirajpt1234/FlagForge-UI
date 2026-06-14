import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { setUserFromStorage } from '../redux/slices/authSlice';
import { userStorage, organizationStorage, cookieStorage } from '../services/storage';
import type { RootState, AppDispatch } from '../redux/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { loading, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = cookieStorage.getAccessToken();
      const userData = userStorage.getUserData();
      const organizationData = organizationStorage.getOrganization();

      if (accessToken && userData && !user) {
        // User is authenticated but user data not in Redux state, restore from localStorage
        dispatch(setUserFromStorage({
          user: userData,
          organization: organizationData,
        }));
      }
    };

    checkAuth();
  }, [dispatch, user]);

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

  const accessToken = cookieStorage.getAccessToken();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
