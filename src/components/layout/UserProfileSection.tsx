import React, { useState } from 'react';
import { Box, Avatar, Typography, Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
  initials: string;
}

export interface Organization {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
}

export interface UserProfileSectionProps {
  user: UserInfo;
  organizations: Organization[];
  collapsed: boolean;
  onSignOut: () => void;
  onSwitchOrganization: () => void;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  user,
  organizations,
  collapsed,
  onSignOut,
  onSwitchOrganization,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box
      sx={{
        mt: 'auto',
        borderTop: '1px solid #30363d',
        px: 2,
        py: 2,
      }}
    >
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          cursor: 'pointer',
          px: 0.5,
          py: 1,
          borderRadius: 1,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: '#21262d',
          },
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            backgroundColor: '#a371f7',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          {user.initials || getInitials(user.name)}
        </Avatar>
        {!collapsed && (
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#c9d1d9',
                fontSize: '0.875rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#8b949e',
                fontSize: '0.75rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user.email}
            </Typography>
          </Box>
        )}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: '#161b22',
            border: '1px solid #30363d',
            minWidth: 200,
            mt: 1,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={onSwitchOrganization}>
          <ListItemIcon>
            <SwapHorizIcon sx={{ color: '#8b949e', fontSize: 20 }} />
          </ListItemIcon>
          <ListItemText
            primary="Switch Organization"
            sx={{
              '& .MuiTypography-root': {
                color: '#c9d1d9',
                fontSize: '0.875rem',
              },
            }}
          />
        </MenuItem>
        <Divider sx={{ borderColor: '#30363d' }} />
        <MenuItem onClick={onSignOut}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: '#f85149', fontSize: 20 }} />
          </ListItemIcon>
          <ListItemText
            primary="Sign Out"
            sx={{
              '& .MuiTypography-root': {
                color: '#f85149',
                fontSize: '0.875rem',
              },
            }}
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfileSection;
