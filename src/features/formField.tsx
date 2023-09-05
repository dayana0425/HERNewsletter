import React, { ChangeEvent, ReactNode } from 'react';
import { TextField, Select, SelectChangeEvent } from '@mui/material';

type FormFieldProps = {
  label: string;
  type: 'text' | 'email' | 'select' | 'number';
  value: string;
  onChange: | (( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => void) | ((event: SelectChangeEvent<string>) => void);
  children?: ReactNode;
  sx?: any;
  required?: boolean;
  id?: string;
  error?: boolean;
  helperText?: React.ReactNode;
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  value,
  onChange,
  children,
  sx,
  required,
  id,
  error,
  helperText,
  ...rest
}) => (
  <tr>
    <td>{label}</td>
    <td className="second-column">
      {type === 'select' ? (
        <Select
          fullWidth
          id={id}
          value={value}
          variant='outlined'
          onChange={onChange as (event: SelectChangeEvent<string>) => void}
          sx={sx}
          required={required}
          error={error}
          {...rest}
        >
          {children}
        </Select>
      ) : (
        <TextField
          fullWidth
          id={id}
          type={type}
          value={value}
          onChange={onChange as (event: ChangeEvent<HTMLInputElement>) => void}
          variant="outlined"
          sx={sx}
          required={required}
          error={error}
          helperText={helperText}
          {...rest}
        />
      )}
    </td>
  </tr>
);

export default FormField;
