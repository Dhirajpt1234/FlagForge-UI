import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AuthCard from '../../components/common/AuthCard';
import TabSwitcher, { TabItem } from '../../components/common/TabSwitcher';
import LoginForm from '../../components/auth/LoginForm';
import SignupForm from '../../components/auth/SignupForm';

const Auth: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('login');

  const tabs: readonly TabItem[] = [
    { label: 'Log in', value: 'login' },
    { label: 'Sign up', value: 'signup' },
  ] as const;

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: string
  ): void => {
    setActiveTab(newValue);
  };

  const handleLoginSubmit = (data: { email: string; password: string }) => {
    console.log('Login submit:', data);
    // Backend integration will be added later
  };

  const handleSignupSubmit = (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    organizationName: string;
  }) => {
    console.log('Signup submit:', data);
    // Backend integration will be added later
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Backend integration will be added later
  };

  const handleGithubLogin = () => {
    console.log('GitHub login clicked');
    // Backend integration will be added later
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Backend integration will be added later
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
        />
      ) : (
        <SignupForm
          onSubmit={handleSignupSubmit}
          onGoogleLogin={handleGoogleLogin}
          onGithubLogin={handleGithubLogin}
        />
      )}
    </AuthCard>
  );
};

export default Auth;
