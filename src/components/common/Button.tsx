import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  disabled,
  ...props
}) => {
  return (
    <MuiButton
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </MuiButton>
  );
};

export default Button;
