import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error = false,
  helperText,
  fullWidth = true,
  ...props
}) => {
  return (
    <TextField
      label={label}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      variant="outlined"
      {...props}
    />
  );
};

export default Input;
