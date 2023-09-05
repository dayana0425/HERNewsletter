import { Box, Button, Typography } from '@mui/material';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount, useConnect } from 'wagmi';
import { useEffect } from 'react';

/* 
This component is used to display a message to the user if they have disconnected their wallet
*/

export default function Connect() {
  const { open } = useWeb3Modal();
  const { error } = useConnect();
  const { isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    // if (isDisconnected) {
    //   open();
    // }
  }, [isDisconnected, open]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 4 }}>
        Your wallet is disconnected. To continue, please connect your wallet.
      </Typography>
      <Button id="btn-color-wallet" variant="contained" onClick={() => open()}>
        Connect Wallet
      </Button>
    </Box>
  );
}
