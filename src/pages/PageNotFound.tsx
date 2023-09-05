import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const goBackHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h1" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="h3" gutterBottom>
        We couldn't find the page you're looking for.
      </Typography>
      <Button variant="contained" id="btn-color-wallet" onClick={goBackHome}>
        Go Home
      </Button>
    </Box>
  );
};

export default PageNotFound;
