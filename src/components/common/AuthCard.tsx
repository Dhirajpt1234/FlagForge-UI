import React from 'react';
import { Box, Card, CardContent, SxProps, Theme } from '@mui/material';

export interface AuthCardProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, sx }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d1117',
        backgroundImage: `
          linear-gradient(rgba(48, 54, 61, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(48, 54, 61, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        p: 2,
        ...sx,
      }}
    >
      <Card
        sx={{
          maxWidth: 480,
          width: '100%',
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          borderRadius: 2,
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
        }}
      >
        <CardContent sx={{ p: 4 }}>{children}</CardContent>
      </Card>
    </Box>
  );
};

export default AuthCard;
