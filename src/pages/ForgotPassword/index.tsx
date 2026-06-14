import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert, Snackbar } from '@mui/material';
import AuthCard from '../../components/common/AuthCard';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import { forgotPassword, clearError } from '../../redux/slices/authSlice';
import type { RootState, AppDispatch } from '../../redux/store';

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (email: string) => {
    dispatch(forgotPassword(email))
      .unwrap()
      .then(() => {
        setSuccess(true);
      })
      .catch(() => {
        setSuccess(false);
      });
  };

  const handleCancel = () => {
    navigate('/login');
  };

  const handleCloseSnackbar = () => {
    dispatch(clearError());
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
      </Box>

      <ForgotPasswordForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        error={error || undefined}
        success={success}
      />

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
    </AuthCard>
  );
};

export default ForgotPassword;
