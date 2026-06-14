import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#58a6ff',
      light: '#79c0ff',
      dark: '#1f6feb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#a371f7',
      light: '#c397f7',
      dark: '#8a63d2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0d1117',
      paper: '#161b22',
    },
    text: {
      primary: '#c9d1d9',
      secondary: '#8b949e',
    },
    divider: '#30363d',
    error: {
      main: '#f85149',
      light: '#ff7b72',
      dark: '#da3633',
    },
    warning: {
      main: '#d29922',
      light: '#e3b341',
      dark: '#9e6a03',
    },
    info: {
      main: '#58a6ff',
      light: '#79c0ff',
      dark: '#1f6feb',
    },
    success: {
      main: '#3fb950',
      light: '#56d364',
      dark: '#2ea043',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 6,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          },
        },
        outlined: {
          borderWidth: 1.5,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          boxShadow: 'none',
          borderRadius: 6,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
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
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#161b22',
          borderBottom: '1px solid #30363d',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#161b22',
          borderRight: '1px solid #30363d',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: '#161b22',
            borderBottom: '1px solid #30363d',
            fontWeight: 600,
          },
          '& .MuiTableCell-body': {
            borderBottom: '1px solid #21262d',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#58a6ff',
          height: 2,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          '&.Mui-selected': {
            color: '#c9d1d9',
          },
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
