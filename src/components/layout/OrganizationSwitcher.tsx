import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';

export interface Organization {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
}

export interface OrganizationSwitcherProps {
  open: boolean;
  onClose: () => void;
  organizations: Organization[];
  currentOrgId: string;
  onSwitch: (orgId: string) => void;
}

const OrganizationSwitcher: React.FC<OrganizationSwitcherProps> = ({
  open,
  onClose,
  organizations,
  currentOrgId,
  onSwitch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSwitch = (orgId: string) => {
    onSwitch(orgId);
    onClose();
    setSearchQuery('');
  };

  const handleClose = () => {
    onClose();
    setSearchQuery('');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          color: '#c9d1d9',
          fontWeight: 600,
          pb: 2,
        }}
      >
        Switch Organization
      </DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <TextField
          fullWidth
          placeholder="Search organizations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#8b949e' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#0d1117',
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#8b949e',
                },
              },
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#58a6ff',
                  borderWidth: 2,
                },
              },
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#30363d',
            },
            '& .MuiOutlinedInput-input': {
              color: '#c9d1d9',
            },
          }}
        />
        <List sx={{ py: 0 }}>
          {filteredOrganizations.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#8b949e' }}>
                No organizations found
              </Typography>
            </Box>
          ) : (
            filteredOrganizations.map((org) => (
              <ListItem
                key={org.id}
                disablePadding
                sx={{ mb: 1 }}
              >
                <ListItemButton
                  onClick={() => handleSwitch(org.id)}
                  selected={org.id === currentOrgId}
                  sx={{
                    borderRadius: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(88, 166, 255, 0.1)',
                    },
                    '&:hover': {
                      backgroundColor: '#21262d',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'rgba(88, 166, 255, 0.15)',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        backgroundColor: '#58a6ff',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}
                    >
                      {org.initials || getInitials(org.name)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={org.name}
                    sx={{
                      '& .MuiTypography-root': {
                        color: '#c9d1d9',
                        fontWeight: 500,
                      },
                    }}
                  />
                  {org.id === currentOrgId && (
                    <CheckIcon sx={{ color: '#58a6ff', fontSize: 20 }} />
                  )}
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleClose}
          sx={{
            color: '#8b949e',
            '&:hover': {
              backgroundColor: '#21262d',
              color: '#c9d1d9',
            },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrganizationSwitcher;
