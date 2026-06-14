import React, { useState } from 'react';
import { Box, Typography, Link, Stack } from '@mui/material';
import Input from '../common/Input';
import Button from '../common/Button';

export interface ForgotPasswordFormProps {
  onSubmit?: (email: string) => void;
  onCancel?: () => void;
  loading?: boolean;
  error?: string;
  success?: boolean;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  onCancel,
  loading = false,
  error = undefined,
  success = false,
}) => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    
    onSubmit?.(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const isFormValid = email && validateEmail(email);

  if (success) {
    return (
      <Box>
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: '#c9d1d9',
            mb: 2,
          }}
        >
          Check your email
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: '#8b949e',
            mb: 3,
          }}
        >
          We've sent a password reset link to your email address.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          size="large"
          onClick={onCancel}
        >
          Back to login
        </Button>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: '#c9d1d9',
            mb: 1,
          }}
        >
          Forgot password?
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: '#8b949e',
            mb: 2,
          }}
        >
          Enter your email address and we'll send you a link to reset your password.
        </Typography>

        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError || !!error}
          helperText={emailError || error}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={!isFormValid || loading}
        >
          {loading ? 'Sending...' : 'Send reset link'}
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Link
            component="button"
            type="button"
            onClick={onCancel}
            sx={{
              color: '#58a6ff',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Back to login
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default ForgotPasswordForm;
