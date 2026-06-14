import React, { useState, useMemo, useEffect } from 'react';
import { Box, Drawer, Avatar, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FlagForgeLogo from '../common/FlagForgeLogo';
import NavigationSection, { NavigationItem } from './NavigationSection';
import UserProfileSection, { UserInfo, Organization } from './UserProfileSection';
import OrganizationSwitcher from './OrganizationSwitcher';
import { menuConfig, filterMenuByPermissions, UserPermissions, MenuItem } from '../../config/menuConfig';
import { RootState } from '../../redux/store';
import { getUserOrganizations, createOrganization, switchOrganization, logout } from '../../redux/slices/authSlice';
import type { AppDispatch } from '../../redux/store';

export interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  userPermissions?: UserPermissions;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse, userPermissions }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [orgSwitcherOpen, setOrgSwitcherOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const organization = useSelector((state: RootState) => state.auth.organization);
  const organizations = useSelector((state: RootState) => state.auth.organizations);
  const isLoading = useSelector((state: RootState) => state.auth.loading);

  useEffect(() => {
    if (user && organizations.length === 0) {
      dispatch(getUserOrganizations());
    }
  }, [user?.id, organizations.length, dispatch]);

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
    dispatch(logout());
    navigate('/auth');
  };

  const handleSwitchOrganization = () => {
    setOrgSwitcherOpen(true);
  };

  const handleOrgSwitch = (orgId: string) => {
    dispatch(switchOrganization(orgId));
  };

  const handleCreateOrganization = async (name: string) => {
    const slug = name.toLowerCase().replace(/ /g, '-');
    await dispatch(createOrganization({ name, slug }));
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

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userInfo: UserInfo = user
    ? {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        initials: getInitials(`${user.firstName} ${user.lastName}`),
      }
    : {
        name: 'Loading...',
        email: '',
        initials: '...',
      };

  const orgList: Organization[] = organizations.map((org) => ({
    id: org.id,
    name: org.name,
    initials: getInitials(org.name),
  }));

  const currentOrgId = organization?.id || '';

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
                {orgList.find((org) => org.id === currentOrgId)?.initials || '...'}
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
                  {organization?.name || 'Loading...'}
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
            user={userInfo}
            organizations={orgList}
            collapsed={collapsed}
            onSignOut={handleSignOut}
            onSwitchOrganization={handleSwitchOrganization}
          />
        </Box>
      </Drawer>

      <OrganizationSwitcher
        open={orgSwitcherOpen}
        onClose={() => setOrgSwitcherOpen(false)}
        organizations={orgList}
        currentOrgId={currentOrgId}
        onSwitch={handleOrgSwitch}
        onCreateOrganization={handleCreateOrganization}
        isLoading={isLoading}
      />
    </>
  );
};

export default Sidebar;
