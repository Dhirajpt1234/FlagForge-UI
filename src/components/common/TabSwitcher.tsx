import React from 'react';
import { Tabs, Tab, Box, SxProps, Theme } from '@mui/material';

export interface TabItem {
  label: string;
  value: string;
}

export interface TabSwitcherProps {
  tabs: readonly TabItem[];
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
  sx?: SxProps<Theme>;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
  tabs,
  value,
  onChange,
  sx,
}) => {
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Tabs
        value={value}
        onChange={onChange}
        variant="fullWidth"
        sx={{
          borderBottom: '1px solid #30363d',
          '& .MuiTabs-indicator': {
            backgroundColor: '#58a6ff',
            height: 2,
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              color: '#8b949e',
              '&.Mui-selected': {
                color: '#c9d1d9',
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabSwitcher;
