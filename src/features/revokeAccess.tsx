import { ChangeEvent, ReactNode, FC } from 'react';
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';

interface RevokeAccessFormProps {
  protectedData: string;
  handleProtectedDataChange: (event: ChangeEvent<HTMLInputElement>) => void;
  revokeAccessSubmit: () => void;
  loadingRevoke: boolean;
  errorRevoke: ReactNode;
  revokeAccess: string;
}

const RevokeAccessForm: FC<RevokeAccessFormProps> = ({
  protectedData,
  handleProtectedDataChange,
  revokeAccessSubmit,
  loadingRevoke,
  errorRevoke,
  revokeAccess,
}) => (
  <Box id="grantAccessForm">
    <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
      Revoke access to HERNewsletter
    </Typography>
    <TextField
      required
      fullWidth
      id="dataorderAddresssetAddress"
      label="Protected Email"
      variant="outlined"
      sx={{ mt: 3 }}
      value={protectedData}
      onChange={handleProtectedDataChange}
      type="text"
    />
    {!loadingRevoke && (
      <Button
        id="btn-color-wallet2"
        sx={{ backgroundColor: '#2F80ED', color: '#FFFFFF', mt: 2 }}

        onClick={revokeAccessSubmit}
        variant="contained"
      >
        Revoke Access
      </Button>
    )}
    {loadingRevoke && (
      <CircularProgress id="spacingStyle"></CircularProgress>
    )}
    {revokeAccess && !errorRevoke && (
      <Alert sx={{ mt: 3, mb: 2 }} severity="success">
        <Typography variant="h6">
          You have successfully revoked access!
        </Typography>
      </Alert>
    )}
    {errorRevoke && (
      <Alert sx={{ mt: 3, mb: 2 }} severity="error">
        <Typography variant="h6">Revoke Access failed</Typography>
        {errorRevoke}
      </Alert>
    )}
  </Box>
);

export default RevokeAccessForm;
