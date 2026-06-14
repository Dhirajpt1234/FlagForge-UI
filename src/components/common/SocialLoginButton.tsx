import React from 'react';
import { Button, SxProps, Theme } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

export interface SocialLoginButtonProps {
  provider: 'google' | 'github';
  onClick?: () => void;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onClick,
  fullWidth = true,
  sx,
}) => {
  const getIcon = () => {
    return provider === 'google' ? <GoogleIcon /> : <GitHubIcon />;
  };

  const getButtonText = () => {
    return provider === 'google' ? 'Continue with Google' : 'Continue with GitHub';
  };

  return (
    <Button
      variant="outlined"
      fullWidth={fullWidth}
      onClick={onClick}
      startIcon={getIcon()}
      sx={{
        py: 1.5,
        borderColor: '#30363d',
        color: '#c9d1d9',
        '&:hover': {
          borderColor: '#8b949e',
          backgroundColor: 'rgba(139, 148, 158, 0.1)',
        },
        ...sx,
      }}
    >
      {getButtonText()}
    </Button>
  );
};

export default SocialLoginButton;
