import React from 'react';
import { Box, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface LogoProps {
  collapsed: boolean;
  onToggle: () => void;
}

const FlagForgeLogo: React.FC<LogoProps> = ({ collapsed, onToggle }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 2,
        borderBottom: '1px solid #30363d',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 4H10V8H6V4Z"
              fill="#58a6ff"
            />
            <path
              d="M10 4H14V8H10V4Z"
              fill="#58a6ff"
            />
            <path
              d="M14 4H18V8H14V4Z"
              fill="#58a6ff"
            />
            <path
              d="M6 8H10V12H6V8Z"
              fill="#58a6ff"
            />
            <path
              d="M6 12H10V16H6V12Z"
              fill="#58a6ff"
            />
            <path
              d="M6 16H10V20H6V16Z"
              fill="#58a6ff"
            />
            <path
              d="M10 16H14V20H10V16Z"
              fill="#58a6ff"
            />
            <path
              d="M14 16H18V20H14V16Z"
              fill="#58a6ff"
            />
            <path
              d="M18 16H22V20H18V16Z"
              fill="#58a6ff"
            />
            <path
              d="M22 16H26V20H22V16Z"
              fill="#58a6ff"
            />
            <path
              d="M18 20H22V24H18V20Z"
              fill="#58a6ff"
            />
            <path
              d="M22 20H26V24H22V20Z"
              fill="#58a6ff"
            />
            <path
              d="M18 24H22V28H18V24Z"
              fill="#58a6ff"
            />
            <path
              d="M22 24H26V28H22V24Z"
              fill="#58a6ff"
            />
            <path
              d="M14 20H18V24H14V20Z"
              fill="#58a6ff"
            />
            <path
              d="M10 20H14V24H10V20Z"
              fill="#58a6ff"
            />
          </svg>
        </Box>
        {!collapsed && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#c9d1d9',
              letterSpacing: '-0.02em',
            }}
          >
            FlagForge
          </Typography>
        )}
      </Box>
      <Box
        onClick={onToggle}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          cursor: 'pointer',
          borderRadius: 1,
          color: '#8b949e',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: '#21262d',
            color: '#c9d1d9',
          },
        }}
      >
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </Box>
    </Box>
  );
};

export default FlagForgeLogo;
