import { useEffect, useState } from 'react';
import { Container, Grid, Button, Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Header } from '../features/header';
import { useAccount } from 'wagmi';
import { checkUserInDatabase } from '../utils/utils';

const Front = () => {
  const { address } = useAccount();
  const [isUserInDatabase, setIsUserInDatabase] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const check = async () => {
      const isUser = await checkUserInDatabase(address as string);
      setIsUserInDatabase(isUser);
    };
    check();
  }, [address]);

  return (
    <Container disableGutters>
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="80vh"
        overflow="hidden"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h2" id="titulo" sx={{ mt: 2 }}>
              Latest from H.E.R. News
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                fontSize: '1.6rem',
                fontWeight: '500',
                color: '#737373',
              }}
            >
              {isUserInDatabase
                ? 'Welcome back!'
                : 'Stay up-to-date with the latest trends, gain insights, and explore opportunities to grow with H.E.R. DAO LATAM.'}
            </Typography>

            {!isUserInDatabase ? (
              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                width="76%"
              >
                <Button
                  variant="contained"
                  id="btn-color"
                  component={RouterLink}
                  to="signup"
                  sx={{
                    bgcolor: '#DBDBEF',
                    borderRadius: '20px',
                    color: '#DA077C',
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="contained"
                  id="btn-color"
                  component={RouterLink}
                  to="/newsletter"
                  sx={{
                    bgcolor: '#DBDBEF',
                    borderRadius: '20px',
                    color: '#DA077C',
                  }}
                >
                  Learn More
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                id="btn-color"
                component={RouterLink}
                to="/signup"
                sx={{
                  bgcolor: '#DBDBEF',
                  borderRadius: '20px',
                  color: '#DA077C',
                  mt: 2,
                }}
              >
                Update Settings
              </Button>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <img
              src="https://desarrollo-de-sitios-web.com/img/index.jpg"
              alt="index"
              style={{ width: 'auto', height: '500px', marginRight: '8px' }}
              className="mr-auto"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Front;
