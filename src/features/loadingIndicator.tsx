// LoadingIndicator.tsx or LoadingIndicator.jsx
import React from 'react';
import { CircularProgress, Container } from '@mui/material';

const LoadingIndicator: React.FC = () => (
  <Container
    sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CircularProgress />
  </Container>
);

export default LoadingIndicator;
