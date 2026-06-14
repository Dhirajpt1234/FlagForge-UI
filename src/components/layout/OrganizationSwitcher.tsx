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
import AddIcon from '@mui/icons-material/Add';

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
  onCreateOrganization: (name: string) => Promise<void>;
  isLoading?: boolean;
}

const OrganizationSwitcher: React.FC<OrganizationSwitcherProps> = ({
  open,
  onClose,
  organizations,
  currentOrgId,
  onSwitch,
  onCreateOrganization,
  isLoading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

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
    setShowCreateForm(false);
    setNewOrgName('');
  };

  const handleCreateOrganization = async () => {
    if (!newOrgName.trim()) {
      return;
    }
    setIsCreating(true);
    try {
      await onCreateOrganization(newOrgName.trim());
      setShowCreateForm(false);
      setNewOrgName('');
      onClose();
    } catch (error) {
      console.error('Failed to create organization:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
    setNewOrgName('');
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
        {showCreateForm ? (
          <Box>
            <TextField
              fullWidth
              label="Organization Name"
              placeholder="Enter organization name"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
              disabled={isCreating}
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
                '& .MuiInputLabel-root': {
                  color: '#8b949e',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#58a6ff',
                },
              }}
            />
          </Box>
        ) : (
          <>
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
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        {showCreateForm ? (
          <>
            <Button
              onClick={handleToggleCreateForm}
              disabled={isCreating}
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
            <Button
              onClick={handleCreateOrganization}
              disabled={!newOrgName.trim() || isCreating}
              variant="contained"
              sx={{
                backgroundColor: '#58a6ff',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#79c0ff',
                },
                '&:disabled': {
                  backgroundColor: '#30363d',
                  color: '#8b949e',
                },
              }}
            >
              {isCreating ? 'Creating...' : 'Create'}
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleToggleCreateForm}
              startIcon={<AddIcon />}
              sx={{
                color: '#58a6ff',
                '&:hover': {
                  backgroundColor: 'rgba(88, 166, 255, 0.1)',
                },
              }}
            >
              Create New Organization
            </Button>
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
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default OrganizationSwitcher;
