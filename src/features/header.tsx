import React from 'react';
import { AppBar, Toolbar, Grid, Button, Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';
import { SideMenu } from './sideMenu';

type HeaderProps = {
  showLogo?: boolean;
  pageHeaderTitle?: string;
};

export const Header: React.FC<HeaderProps> = ({
  showLogo = true,
  pageHeaderTitle,
}) => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  const shortAddress = (address: string) =>
    address.slice(0, 6) + '...' + address.slice(-4);
  const handleOpenWeb3Modal = () => open();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ backgroundColor: 'transparent', width: '100%' }}
    >
      <Toolbar disableGutters={true}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={4}>
            {showLogo ? (
              <img
                src="https://substackcdn.com/image/fetch/w_224,h_224,c_fill,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fda95c68e-65aa-496d-bc5d-605dafe241b9_4168x4168.jpeg"
                alt="Logo"
                style={{ width: '100px', height: '100px', marginRight: '8px' }}
              />
            ) : (
              <SideMenu showLogo={showLogo} />
            )}
          </Grid>

          <Grid item xs={4} style={{ textAlign: 'center' }}>
            {pageHeaderTitle ? (
              <Typography id="pageHeader" variant="h6">
                {pageHeaderTitle}
              </Typography>
            ) : (
              <Typography id="colortitulo" variant="h6">
                <RouterLink to="/email">Send Email</RouterLink>
              </Typography>
            )}
          </Grid>

          <Grid item xs={4} style={{ textAlign: 'right' }}>
            {isConnected ? (
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                  id="btn-color-wallet"
                  variant="contained"
                  onClick={() => disconnect()}
                >
                  Disconnect
                </Button>
                <Box id="info-box-wallet">
                  <Typography>
                    Welcome,{' '}
                    <span style={{ color: 'white' }}>
                      {shortAddress(address as string)}{' '}
                    </span>
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Button
                id="btn-color-wallet"
                variant="contained"
                onClick={() => handleOpenWeb3Modal()}
              >
                Connect Wallet
              </Button>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
