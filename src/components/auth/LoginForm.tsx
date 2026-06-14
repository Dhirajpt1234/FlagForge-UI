import React from 'react';
import { Box, Typography, Link, Divider, Stack } from '@mui/material';
import Input from '../common/Input';
import Button from '../common/Button';
import SocialLoginButton from '../common/SocialLoginButton';

export interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  onGoogleLogin?: () => void;
  onGithubLogin?: () => void;
  onForgotPassword?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onGoogleLogin,
  onGithubLogin,
  onForgotPassword,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Form submission will be handled when backend is integrated
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
        />

        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
        />

        <Box sx={{ textAlign: 'right' }}>
          <Link
            component="button"
            type="button"
            onClick={onForgotPassword}
            sx={{
              color: '#58a6ff',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Forgot password?
          </Link>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={() => onSubmit?.({ email: '', password: '' })}
        >
          Continue
        </Button>

        <Divider sx={{ my: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: '#8b949e', px: 1 }}
          >
            or
          </Typography>
        </Divider>

        <Stack spacing={2}>
          <SocialLoginButton
            provider="google"
            onClick={onGoogleLogin}
          />
          <SocialLoginButton
            provider="github"
            onClick={onGithubLogin}
          />
        </Stack>

        <Typography
          variant="caption"
          sx={{
            textAlign: 'center',
            color: '#8b949e',
            fontSize: '0.75rem',
            mt: 2,
          }}
        >
          By clicking continue, you agree to our{' '}
          <Link
            href="#"
            sx={{
              color: '#58a6ff',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Terms
          </Link>{' '}
          and{' '}
          <Link
            href="#"
            sx={{
              color: '#58a6ff',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Privacy Policy
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoginForm;
