import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to FlagForge
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          A scalable and robust React application
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
