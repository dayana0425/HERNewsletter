// CustomButton.jsx
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const CustomButton = ({ text, link }) => (
  <Button
    variant="contained"
    id="btn-color"
    component={RouterLink}
    to={link}
    sx={{
      bgcolor: '#DBDBEF',
      borderRadius: '20px',
      color: '#DA077C',
    }}
  >
    {text}
  </Button>
);

export default CustomButton;
