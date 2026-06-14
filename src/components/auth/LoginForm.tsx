import React, { useState } from 'react';
import { Box, Typography, Link, Divider, Stack } from '@mui/material';
import Input from '../common/Input';
import Button from '../common/Button';
import SocialLoginButton from '../common/SocialLoginButton';

export interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  onGoogleLogin?: () => void;
  onGithubLogin?: () => void;
  onForgotPassword?: () => void;
  loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onGoogleLogin,
  onGithubLogin,
  onForgotPassword,
  loading = false,
}) => {
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: { email: string; password: string } = {
      email: '',
      password: '',
    };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } 
    // TODO: Add password validation
    // else if (formData.password.length < 8) {
    //   newErrors.password = 'Password must be at least 8 characters';
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const newErrors = { ...errors };
    
    if (name === 'email') {
      if (!value) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(value)) {
        newErrors.email = 'Please enter a valid email';
      } else {
        newErrors.email = '';
      }
    }
    
    if (name === 'password') {
      if (!value) {
        newErrors.password = 'Password is required';
      } 
      // TODO: Add password validation
      // else if (value.length < 8) {
      //   newErrors.password = 'Password must be at least 8 characters';
      // } else {
        newErrors.password = '';
      // }
    }
    
    setErrors(newErrors);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit?.(formData);
    }
  };

  const isFormValid = formData.email &&
   formData.password && 
   // TODO: Add password validation
   // formData.password.length >= 8 && 
   validateEmail(formData.email);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
        />

        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleInputChange}
          error={!!errors.password}
          helperText={errors.password}
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
          disabled={!isFormValid || loading}
        >
          {loading ? 'Signing in...' : 'Continue'}
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
