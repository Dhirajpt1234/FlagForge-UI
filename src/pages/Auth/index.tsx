import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert, Snackbar } from '@mui/material';
import AuthCard from '../../components/common/AuthCard';
import TabSwitcher, { TabItem } from '../../components/common/TabSwitcher';
import LoginForm from '../../components/auth/LoginForm';
import SignupForm from '../../components/auth/SignupForm';
import { login, signup, clearError } from '../../redux/slices/authSlice';
import type { RootState, AppDispatch } from '../../redux/store';

const Auth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('login');
  const [showSocialLoginPopup, setShowSocialLoginPopup] = useState(false);

  const { loading, error, isAuthenticated, token, refreshToken } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated && token) {
      localStorage.setItem('authToken', token);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      navigate('/dashboard');
    }
  }, [isAuthenticated, token, refreshToken, navigate]);

  const tabs: readonly TabItem[] = [
    { label: 'Log in', value: 'login' },
    { label: 'Sign up', value: 'signup' },
  ] as const;

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: string
  ): void => {
    setActiveTab(newValue);
    dispatch(clearError());
  };

  const handleLoginSubmit = (data: { email: string; password: string }) => {
    dispatch(login(data));
  };

  const handleSignupSubmit = (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    organizationName: string;
  }) => {
    dispatch(signup(data));
  };

  const handleGoogleLogin = () => {
    setShowSocialLoginPopup(true);
  };

  const handleGithubLogin = () => {
    setShowSocialLoginPopup(true);
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleCloseSnackbar = () => {
    dispatch(clearError());
  };

  const handleClosePopup = () => {
    setShowSocialLoginPopup(false);
  };

  return (
    <AuthCard>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            color: '#c9d1d9',
            mb: 1,
          }}
        >
          Flagforge
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: '#8b949e',
          }}
        >
          {activeTab === 'login'
            ? 'Welcome back! Please log in to your account.'
            : 'Create your account to get started.'}
        </Typography>
      </Box>

      <TabSwitcher
        tabs={tabs}
        value={activeTab}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
      />

      {activeTab === 'login' ? (
        <LoginForm
          onSubmit={handleLoginSubmit}
          onGoogleLogin={handleGoogleLogin}
          onGithubLogin={handleGithubLogin}
          onForgotPassword={handleForgotPassword}
          loading={loading}
        />
      ) : (
        <SignupForm
          onSubmit={handleSignupSubmit}
          onGoogleLogin={handleGoogleLogin}
          onGithubLogin={handleGithubLogin}
          loading={loading}
        />
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          {error}
        </Alert>
      </Snackbar>

      {showSocialLoginPopup && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
          onClick={handleClosePopup}
        >
          <Box
            sx={{
              backgroundColor: '#161b22',
              padding: 3,
              borderRadius: 2,
              maxWidth: 400,
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant="h6" sx={{ color: '#c9d1d9', mb: 2 }}>
              Social Login
            </Typography>
            <Typography variant="body2" sx={{ color: '#8b949e', mb: 3 }}>
              This feature is currently not available.
            </Typography>
            <Typography
              variant="button"
              sx={{
                color: '#58a6ff',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
              onClick={handleClosePopup}
            >
              Close
            </Typography>
          </Box>
        </Box>
      )}
    </AuthCard>
  );
};

export default Auth;
