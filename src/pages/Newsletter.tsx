import { Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import Connect from '../features/connectMessage';
import { useAccount } from 'wagmi';
import { Header } from '../features/header';

export default function Front() {
  const { isConnected } = useAccount();

  return (
    <Container disableGutters>
      {isConnected ? (
        <>
          <Header pageHeaderTitle={' '} showLogo={false} />
          <div
            id="newsletter"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '20px 70px',
            }}
          >
            <div id="newsletter2" style={{ flex: 1, marginRight: '20px' }}>
              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  fontSize: '1.6rem',
                  fontWeight: '600',
                  fontFamily: 'sans-serif',
                  color: '#737373',
                }}
              >
                Subscribe to H.E.R. news
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '1rem',
                  fontWeight: '400',
                  color: '#737373',
                  fontFamily: 'sans-serif',
                }}
              >
                Receive new entries directly to your inbox
              </Typography>
            </div>
            <div style={{ flex: 1, marginRight: '20px' }}></div>
            <div id="newsletter2">
              <Button
                id="btn-color-newsletter"
                component={RouterLink}
                to="/signup"
                variant="contained"
                color="primary"
              >
                Subscribe
              </Button>
            </div>
          </div>
          {/* seccion entries */}
          <div
            id="entries"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '20px 70px',
            }}
          >
            <div style={{ flex: 1, marginRight: '20px', textAlign: 'center' }}>
              <Typography
                style={{ margin: '4px', fontWeight: '500' }}
                variant="body1"
              >
                Entries
              </Typography>
            </div>
          </div>
          {/* imagen1 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '20px 40px',
            }}
          >
            <div style={{ flex: 1, marginRight: '20px', textAlign: 'center' }}>
              <a href="https://h3rnewsletter.substack.com/" target="_blank">
                <img
                  src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F12d8879d-38f6-4328-b35e-817c7c1a9f67_1280x640.jpeg"
                  alt="index"
                  style={{ width: '47%', height: 'auto', marginRight: '8px' }}
                  className="mr-auto"
                />
              </a>
            </div>
          </div>
          {/* imagen2 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '20px 40px',
            }}
          >
            <div style={{ flex: 1, marginRight: '20px', textAlign: 'center' }}>
              <a href="https://h3rnewsletter.substack.com/" target="_blank">
                <img
                  src="http://desarrollo-de-sitios-web.com/img/news.jpg"
                  alt="index"
                  style={{
                    width: '30%',
                    height: 'auto',
                    marginRight: '8px',
                    marginTop: '-14px',
                  }}
                  className="mr-auto"
                />
              </a>
            </div>
          </div>
        </>
      ) : (
        <Connect />
      )}
    </Container>
  );
}
