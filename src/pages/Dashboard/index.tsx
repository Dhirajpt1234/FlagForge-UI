import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of your application
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: { xs: '100%', md: 'calc(50% - 12px)', lg: 'calc(33.333% - 16px)' } }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Statistic 1
            </Typography>
            <Typography variant="h4">0</Typography>
          </Paper>
        </Box>
        <Box sx={{ flex: { xs: '100%', md: 'calc(50% - 12px)', lg: 'calc(33.333% - 16px)' } }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Statistic 2
            </Typography>
            <Typography variant="h4">0</Typography>
          </Paper>
        </Box>
        <Box sx={{ flex: { xs: '100%', md: 'calc(50% - 12px)', lg: 'calc(33.333% - 16px)' } }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Statistic 3
            </Typography>
            <Typography variant="h4">0</Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
