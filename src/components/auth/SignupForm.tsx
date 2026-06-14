import React from 'react';
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
}

const SignupForm: React.FC<SignupFormProps> = ({
  onSubmit,
  onGoogleLogin,
  onGithubLogin,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Form submission will be handled when backend is integrated
  };

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
          />
          <Input
            name="lastName"
            label="Last name"
            placeholder="Doe"
            autoComplete="family-name"
            fullWidth
          />
        </Stack>

        <Input
          name="email"
          label="Work email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
        />

        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
        />

        <Input
          name="organizationName"
          label="Organization name"
          placeholder="Acme Inc."
          autoComplete="organization"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={() =>
            onSubmit?.({
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              organizationName: '',
            })
          }
        >
          Create account
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
