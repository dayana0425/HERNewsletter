import { ChangeEvent, ReactNode, FC } from 'react';
import { Box, Typography, TextField, Button, Alert, CircularProgress, } from '@mui/material';
import { GrantedAccess } from '@iexec/dataprotector';

interface GrantAccessFormProps {
  protectedData: string;
  handleProtectedDataChange: (event: ChangeEvent<HTMLInputElement>) => void;
  authorizedUser: string;
  authorizedUserChange: (event: ChangeEvent<HTMLInputElement>) => void;
  grantAccessSubmit: () => void;
  loadingGrant: boolean;
  errorGrant: ReactNode;
  grantAccess: GrantedAccess | undefined;
  emailFrequency: string;
  handleEmailFrequencyChange: (event: ChangeEvent<HTMLInputElement>) => void;
  pricePerEmail: string;
  handlePricePerEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const GrantAccessForm: FC<GrantAccessFormProps> = ({
  protectedData,
  handleProtectedDataChange,
  authorizedUser,
  authorizedUserChange,
  grantAccessSubmit,
  loadingGrant,
  errorGrant,
  grantAccess,
  emailFrequency,
  handleEmailFrequencyChange,
  pricePerEmail,
  handlePricePerEmailChange,
}) => (
  <Box id="grantAccessForm">
    <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
      Grant access to HERNewsletter
    </Typography>
    <TextField
      required
      fullWidth
      label="Protected Email"
      variant="outlined"
      sx={{ mt: 3 }}
      value={protectedData}
      onChange={handleProtectedDataChange}
      type="text"
    />
    <TextField
      required
      fullWidth
      type="number"
      id="emailFrequency"
      label="Number of Emails to Receive"
      variant="outlined"
      value={emailFrequency}
      InputProps={{ inputProps: { min: 1 } }}
      onChange={handleEmailFrequencyChange}
      sx={{ mt: 3 }}
    />

    <TextField
      required
      fullWidth
      type="number"
      id="pricePerEmail"
      label="Price Per Email"
      variant="outlined"
      value={pricePerEmail}
      InputProps={{ inputProps: { min: 0 } }}
      onChange={handlePricePerEmailChange}
      sx={{ mt: 3 }}
    />
    <TextField
      required
      fullWidth
      id="authorizedUser"
      label="HERNewsletter Address"
      variant="outlined"
      sx={{ mt: 3 }}
      value={authorizedUser}
      onChange={authorizedUserChange}
      type="text"
    />
    <Button
      id="btn-color-wallet2"
      sx={{ backgroundColor: '#2F80ED', color: '#FFFFFF', mt: 2 }}
      onClick={grantAccessSubmit}
      variant="contained"
      disabled={loadingGrant}
    >
      Confirm & Grant Access
    </Button>

    {errorGrant && (
      <Alert sx={{ mt: 3, mb: 2 }} severity="error">
        <Typography variant="h6">Oops, something went wrong.</Typography>
        {errorGrant}
      </Alert>
    )}

    {grantAccess && !errorGrant && (
      <Alert sx={{ mt: 3, mb: 2, background: '#D9F2E6' }} severity="success">
        <Typography id="head6">
          Success! You've granted access to your secured data.
        </Typography>
        <Typography variant="body2">
          You can now receive emails from HERNewsletter based on your
          preferences.
        </Typography>
      </Alert>
    )}
    {loadingGrant && <CircularProgress id="spacingStyle"></CircularProgress>}
  </Box>
);

export default GrantAccessForm;
