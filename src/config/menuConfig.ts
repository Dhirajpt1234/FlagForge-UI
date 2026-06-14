import DashboardIcon from '@mui/icons-material/Dashboard';
import FlagIcon from '@mui/icons-material/Flag';
import LayersIcon from '@mui/icons-material/Layers';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SpeedIcon from '@mui/icons-material/Speed';

export type MenuItemType = 'link' | 'external' | 'divider' | 'header';

export type IconComponent = React.ElementType;

export interface MenuItem {
  id: string;
  type: MenuItemType;
  label: string;
  icon?: IconComponent;
  path?: string;
  externalUrl?: string;
  badge?: string | number;
  description?: string;
  permissions?: string[];
  roles?: string[];
  visible: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  children?: MenuItem[];
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
  permissions?: string[];
  roles?: string[];
  visible: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export interface MenuConfig {
  sections: MenuSection[];
}

export const menuConfig: MenuConfig = {
  sections: [
    {
      id: 'main-navigation',
      title: '',
      visible: true,
      collapsible: false,
      items: [
        {
          id: 'search',
          type: 'link',
          label: 'Search',
          icon: SearchIcon,
          path: '/search',
          visible: true,
          permissions: [],
          roles: [],
        },
        {
          id: 'create',
          type: 'link',
          label: 'Create',
          icon: AddIcon,
          path: '/create',
          visible: true,
          permissions: [],
          roles: [],
        },
      ],
    },
    {
      id: 'feature-flags',
      title: 'Feature Flags',
      visible: true,
      collapsible: true,
      defaultExpanded: true,
      permissions: [],
      roles: [],
      items: [
        {
          id: 'flags',
          type: 'link',
          label: 'Flags',
          icon: FlagIcon,
          path: '/flags',
          visible: true,
          permissions: [],
          roles: [],
        },
      ],
    },
    {
      id: 'organization',
      title: 'Organization',
      visible: true,
      collapsible: true,
      defaultExpanded: true,
      permissions: [],
      roles: [],
      items: [
        {
          id: 'org-overview',
          type: 'link',
          label: 'Overview',
          icon: DashboardIcon,
          path: '/organization/overview',
          visible: true,
          permissions: [],
          roles: [],
        },
        {
          id: 'users',
          type: 'link',
          label: 'Users',
          icon: GroupsIcon,
          path: '/organization/users',
          visible: true,
          permissions: [],
          roles: [],
        },
        {
          id: 'environments',
          type: 'link',
          label: 'Environments',
          icon: LayersIcon,
          path: '/organization/environments',
          visible: true,
          permissions: [],
          roles: [],
        },
        {
          id: 'org-settings',
          type: 'link',
          label: 'Settings',
          icon: SettingsIcon,
          path: '/organization/settings',
          visible: true,
          permissions: [],
          roles: [],
        },
      ],
    },
    {
      id: 'analytics',
      title: 'Analytics',
      visible: true,
      collapsible: true,
      defaultExpanded: true,
      permissions: [],
      roles: [],
      items: [
        {
          id: 'dashboard',
          type: 'link',
          label: 'Dashboard',
          icon: BarChartIcon,
          path: '/analytics/dashboard',
          visible: true,
          permissions: [],
          roles: [],
        },
        {
          id: 'usage-reports',
          type: 'link',
          label: 'Usage Reports',
          icon: AssessmentIcon,
          path: '/analytics/usage-reports',
          visible: true,
          permissions: [],
          roles: [],
        },
        {
          id: 'performance-metrics',
          type: 'link',
          label: 'Performance Metrics',
          icon: SpeedIcon,
          path: '/analytics/performance-metrics',
          visible: true,
          permissions: [],
          roles: [],
        },
      ],
    },
  ],
};

export interface UserPermissions {
  permissions: string[];
  roles: string[];
}

export const filterMenuByPermissions = (
  config: MenuConfig,
  userPermissions: UserPermissions
): MenuConfig => {
  const { permissions: userPerms, roles: userRoles } = userPermissions;

  const hasAccess = (item: MenuItem | MenuSection): boolean => {
    if (!item.visible) return false;

    if (item.permissions && item.permissions.length > 0) {
      const hasPermission = item.permissions.some((perm) => userPerms.includes(perm));
      if (!hasPermission) return false;
    }

    if (item.roles && item.roles.length > 0) {
      const hasRole = item.roles.some((role) => userRoles.includes(role));
      if (!hasRole) return false;
    }

    return true;
  };

  const filterMenuItem = (item: MenuItem): MenuItem => {
    const filteredItem = { ...item };

    if (item.children && item.children.length > 0) {
      filteredItem.children = item.children
        .filter((child) => hasAccess(child))
        .map(filterMenuItem);
    }

    return filteredItem;
  };

  const filteredSections = config.sections
    .filter((section) => hasAccess(section))
    .map((section) => ({
      ...section,
      items: section.items
        .filter((item) => hasAccess(item))
        .map(filterMenuItem),
    }));

  return {
    sections: filteredSections,
  };
};

export const findMenuItemById = (
  config: MenuConfig,
  id: string
): MenuItem | null => {
  for (const section of config.sections) {
    for (const item of section.items) {
      if (item.id === id) return item;
      if (item.children) {
        for (const child of item.children) {
          if (child.id === id) return child;
        }
      }
    }
  }
  return null;
};

export const getMenuPath = (config: MenuConfig, id: string): string | null => {
  const item = findMenuItemById(config, id);
  return item?.path || null;
};
