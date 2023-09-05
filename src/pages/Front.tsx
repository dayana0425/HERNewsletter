import { useEffect, useState } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { Header } from '../features/header';
import { useAccount } from 'wagmi';
import { checkUserInDatabase } from '../utils/utils';
import LoadingIndicator from '../features/loadingIndicator';
import CustomButton from '../features/customButton';

const Front = () => {
  const { address } = useAccount();
  const [isUserInDatabase, setIsUserInDatabase] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const isUser = await checkUserInDatabase(address as string);
      setIsUserInDatabase(isUser);
      setIsLoading(false);
    };
    fetchData();
  }, [address]);

  if (isLoading) return <LoadingIndicator />;

  const buttonText = isUserInDatabase ? ['Update Settings', 'Read Newsletter'] : ['Get Started', 'Learn More'];
  const buttonLink = isUserInDatabase ? ['signup', 'newsletter'] : ['signup', '/newsletter'];
  const userMessage = isUserInDatabase
    ? 'Welcome back!'
    : 'Stay up-to-date with the latest trends, gain insights, and explore opportunities to grow with H.E.R. DAO LATAM.';

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
            <Typography variant="body1" sx={{ mt: 2, fontSize: '1.6rem', fontWeight: '500', color: '#737373' }}>
              {userMessage}
            </Typography>
            <Box mt={2} display="flex" justifyContent="space-between" width="76%">
              {Array.isArray(buttonText)
                ? buttonText.map((text, index) => (
                    <CustomButton key={index} text={text} link={buttonLink[index]} />
                  ))
                : <CustomButton text={buttonText} link={buttonLink} />
              }
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img
              src="https://desarrollo-de-sitios-web.com/img/index.jpg"
              alt="index"
              style={{ width: 'auto', height: '500px', marginRight: '8px' }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Front;
