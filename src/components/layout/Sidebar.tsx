import React, { useState, useMemo } from 'react';
import { Box, Drawer, Avatar, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import FlagForgeLogo from '../common/FlagForgeLogo';
import NavigationSection, { NavigationItem } from './NavigationSection';
import UserProfileSection, { UserInfo, Organization } from './UserProfileSection';
import OrganizationSwitcher from './OrganizationSwitcher';
import { menuConfig, filterMenuByPermissions, UserPermissions, MenuItem } from '../../config/menuConfig';

export interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  userPermissions?: UserPermissions;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse, userPermissions }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [orgSwitcherOpen, setOrgSwitcherOpen] = useState(false);

  const filteredMenuConfig = useMemo(() => {
    if (userPermissions) {
      return filterMenuByPermissions(menuConfig, userPermissions);
    }
    return menuConfig;
  }, [userPermissions]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleSignOut = () => {
    console.log('Sign out clicked');
  };

  const handleSwitchOrganization = () => {
    setOrgSwitcherOpen(true);
  };

  const handleOrgSwitch = (orgId: string) => {
    console.log('Switching to organization:', orgId);
  };

  const handleToggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const convertMenuItemToNavigationItem = (item: MenuItem): NavigationItem => {
    const IconComponent = item.icon;
    return {
      label: item.label,
      icon: IconComponent ? <IconComponent /> : undefined,
      path: item.path || '',
    };
  };

  const mockUser: UserInfo = {
    name: 'Ada Lovelace',
    email: 'ada@acmecorp.com',
    initials: 'AL',
  };

  const mockOrganizations: Organization[] = [
    {
      id: '1',
      name: 'Acme Corp',
      initials: 'AC',
    },
    {
      id: '2',
      name: 'Tech Startup',
      initials: 'TS',
    },
    {
      id: '3',
      name: 'Enterprise Inc',
      initials: 'EI',
    },
  ];

  const currentOrgId = '1';

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        open
        sx={{
          width: collapsed ? 72 : 280,
          flexShrink: 0,
          transition: 'width 0.3s ease',
          '& .MuiDrawer-paper': {
            width: collapsed ? 72 : 280,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',
            borderRight: '1px solid #30363d',
            backgroundColor: '#161b22',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <FlagForgeLogo collapsed={collapsed} onToggle={onToggleCollapse} />

          <Box
            sx={{
              px: 2,
              py: 2,
              borderBottom: '1px solid #30363d',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: '#58a6ff',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                {mockOrganizations.find((org) => org.id === currentOrgId)?.initials || 'AC'}
              </Avatar>
              {!collapsed && (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: '#c9d1d9',
                    fontSize: '0.875rem',
                  }}
                >
                  Acme Corp
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', py: 2 }}>
            {filteredMenuConfig.sections.map((section) => {
              const navigationItems = section.items.map(convertMenuItemToNavigationItem);
              const isExpanded = expandedSections[section.id] ?? section.defaultExpanded ?? true;

              if (section.title === '' && !section.collapsible) {
                return (
                  <Box key={section.id} sx={{ px: 2, mb: 1 }}>
                    {navigationItems.map((item: NavigationItem) => (
                      <NavigationSection
                        key={item.path}
                        title=""
                        items={[item]}
                        expanded={true}
                        onToggle={() => {}}
                        collapsed={collapsed}
                        currentPath={location.pathname}
                        onNavigate={handleNavigate}
                      />
                    ))}
                  </Box>
                );
              }

              return (
                <NavigationSection
                  key={section.id}
                  title={section.title}
                  items={navigationItems}
                  expanded={isExpanded}
                  onToggle={() => handleToggleSection(section.id)}
                  collapsed={collapsed}
                  currentPath={location.pathname}
                  onNavigate={handleNavigate}
                />
              );
            })}
          </Box>

          <UserProfileSection
            user={mockUser}
            organizations={mockOrganizations}
            collapsed={collapsed}
            onSignOut={handleSignOut}
            onSwitchOrganization={handleSwitchOrganization}
          />
        </Box>
      </Drawer>

      <OrganizationSwitcher
        open={orgSwitcherOpen}
        onClose={() => setOrgSwitcherOpen(false)}
        organizations={mockOrganizations}
        currentOrgId={currentOrgId}
        onSwitch={handleOrgSwitch}
      />
    </>
  );
};

export default Sidebar;
