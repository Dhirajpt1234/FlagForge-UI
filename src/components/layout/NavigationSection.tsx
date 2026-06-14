import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, Typography } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export interface NavigationItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

export interface NavigationSectionProps {
  title: string;
  items: NavigationItem[];
  expanded: boolean;
  onToggle: () => void;
  collapsed: boolean;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const NavigationSection: React.FC<NavigationSectionProps> = ({
  title,
  items,
  expanded,
  onToggle,
  collapsed,
  currentPath,
  onNavigate,
}) => {
  const hasTitle = title && title.length > 0;

  return (
    <Box>
      {hasTitle && (
        <Box
          onClick={onToggle}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            cursor: 'pointer',
            color: '#8b949e',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#c9d1d9',
            },
          }}
        >
          {!collapsed && <Typography variant="caption">{title}</Typography>}
          {!collapsed && hasTitle && (expanded ? <ExpandLess /> : <ExpandMore />)}
        </Box>
      )}
      <Collapse in={expanded || collapsed || !hasTitle} timeout="auto" unmountOnExit>
        <List sx={{ py: 0 }}>
          {items.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                selected={currentPath === item.path}
                onClick={() => onNavigate(item.path)}
                sx={{
                  minHeight: 40,
                  px: collapsed ? 0 : 2,
                  py: 1,
                  color: '#8b949e',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  '&.Mui-selected': {
                    backgroundColor: collapsed ? 'rgba(88, 166, 255, 0.1)' : 'rgba(88, 166, 255, 0.1)',
                    color: '#58a6ff',
                    borderLeft: collapsed ? 'none' : '3px solid #58a6ff',
                    paddingLeft: collapsed ? 0 : 'calc(16px - 3px)',
                  },
                  '&:hover': {
                    backgroundColor: '#21262d',
                    color: '#c9d1d9',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: 'rgba(88, 166, 255, 0.15)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? 'auto' : 36,
                    color: 'inherit',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Box>
  );
};

export default NavigationSection;
