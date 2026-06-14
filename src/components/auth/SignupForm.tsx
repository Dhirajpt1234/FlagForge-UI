import React, { useState } from 'react';
import { Box, Typography, Link, Divider, Stack } from '@mui/material';
import Input from '../common/Input';
import Button from '../common/Button';
import SocialLoginButton from '../common/SocialLoginButton';

export interface SignupFormProps {
  onSubmit?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    organizationName: string;
  }) => void;
  onGoogleLogin?: () => void;
  onGithubLogin?: () => void;
  loading?: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({
  onSubmit,
  onGoogleLogin,
  onGithubLogin,
  loading = false,
}) => {
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    organizationName: string;
  }>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    organizationName: '',
  });

  const [errors, setErrors] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    organizationName: string;
  }>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    organizationName: '',
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // const hasUpperCase = /[A-Z]/.test(password);
    // const hasLowerCase = /[a-z]/.test(password);
    // const hasNumber = /[0-9]/.test(password);
    // const hasMinLength = password.length >= 8;
    return true; // TODO: currently dont validate password strength. later remove it.
    // return hasUpperCase && hasLowerCase && hasNumber && hasMinLength;
  };

  const validateForm = (): boolean => {
    const newErrors: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      organizationName: string;
    } = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      organizationName: '',
    };
    let isValid = true;

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
      isValid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
      isValid = false;
    }

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
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (!formData.organizationName) {
      newErrors.organizationName = 'Organization name is required';
      isValid = false;
    } else if (formData.organizationName.length < 2) {
      newErrors.organizationName = 'Organization name must be at least 2 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const newErrors = { ...errors };
    
    if (name === 'firstName') {
      if (!value) {
        newErrors.firstName = 'First name is required';
      } else if (value.length < 2) {
        newErrors.firstName = 'First name must be at least 2 characters';
      } else {
        newErrors.firstName = '';
      }
    }
    
    if (name === 'lastName') {
      if (!value) {
        newErrors.lastName = 'Last name is required';
      } else if (value.length < 2) {
        newErrors.lastName = 'Last name must be at least 2 characters';
      } else {
        newErrors.lastName = '';
      }
    }
    
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
      } else if (!validatePassword(value)) {
        newErrors.password = 'Password must be at least 8 characters';
      } else {
        newErrors.password = '';
      }
    }
    
    if (name === 'organizationName') {
      if (!value) {
        newErrors.organizationName = 'Organization name is required';
      } else if (value.length < 2) {
        newErrors.organizationName = 'Organization name must be at least 2 characters';
      } else {
        newErrors.organizationName = '';
      }
    }
    
    setErrors(newErrors);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit?.(formData);
    }
  };

  const isFormValid =
    formData.firstName.length >= 2 &&
    formData.lastName.length >= 2 &&
    validateEmail(formData.email) &&
    validatePassword(formData.password) &&
    formData.organizationName.length >= 2;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2.5}>
        <Stack direction="row" spacing={2}>
          <Input
            name="firstName"
            label="First name"
            placeholder="John"
            autoComplete="given-name"
            fullWidth
            value={formData.firstName}
            onChange={handleInputChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <Input
            name="lastName"
            label="Last name"
            placeholder="Doe"
            autoComplete="family-name"
            fullWidth
            value={formData.lastName}
            onChange={handleInputChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Stack>

        <Input
          name="email"
          label="Work email"
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
          autoComplete="new-password"
          value={formData.password}
          onChange={handleInputChange}
          error={!!errors.password}
          helperText={errors.password}
        />

        <Input
          name="organizationName"
          label="Organization name"
          placeholder="Acme Inc."
          autoComplete="organization"
          value={formData.organizationName}
          onChange={handleInputChange}
          error={!!errors.organizationName}
          helperText={errors.organizationName}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={!isFormValid || loading}
        >
          {loading ? 'Creating account...' : 'Create account'}
        </Button>

        <Divider sx={{ my: 1 }}>
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

export default SignupForm;
