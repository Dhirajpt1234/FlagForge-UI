import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import { UserPermissions } from '../../config/menuConfig';

interface ProtectedLayoutProps {
  children: React.ReactNode;
  sidebarCollapsed: boolean;
  onToggleCollapse: () => void;
  userPermissions?: UserPermissions;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({
  children,
  sidebarCollapsed,
  onToggleCollapse, 
  userPermissions,
}) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={onToggleCollapse}
        userPermissions={userPermissions}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: sidebarCollapsed ? '72px' : '280px',
          transition: 'margin-left 0.3s ease',
          backgroundColor: '#0d1117',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ProtectedLayout;
