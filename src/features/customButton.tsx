import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface CustomButtonProps extends ButtonProps {
  text: string;
  link: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, link, ...rest }) => (
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
    {...rest}
  >
    {text}
  </Button>
);

export default CustomButton;
