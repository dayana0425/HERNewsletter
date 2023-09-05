import React from 'react';
import { Typography, Alert, Link, Box } from '@mui/material';

interface SecureDataBoxProps {
  protectedData: string | null;
  errorProtect: string | null;
  explorerUrl: string;
}

const DataSecuredMessage: React.FC<SecureDataBoxProps> = ({
  protectedData,
  errorProtect,
  explorerUrl,
}) => (
  <Box
    id="form-box"
    sx={{
      padding: '0.5rem',
      borderRadius: '8px',
    }}
  >
    {protectedData && !errorProtect && (
      <Alert
        sx={{ mt: 2, mb: 2, background: 'transparent' }}
        severity="success"
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          Your Data Is Secure!
        </Typography>
        <Typography variant="body2">
          We've successfully secured your email address.
        </Typography>
        <br />
        <Link
          href={explorerUrl + protectedData}
          target="_blank"
          sx={{
            mt: 1,
            color: '#DA077C',
            textDecoration: 'underline',
          }}
        >
          Click here to view your secured data
        </Link>

        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
          Next Step: Grant Access for HERNewsletter
        </Typography>
        <Typography variant="caption">
          To start receiving our newsletter, you'll need to grant access to
          HERNewsletter to send you emails.
          <br />
          You can set the frequency and even decide on the price you'd like to
          receive for us to send you emails.
        </Typography>
      </Alert>
    )}
  </Box>
);

export default DataSecuredMessage;