import { FC } from 'react';
import {
  SelectChangeEvent,
  Typography,
  Alert,
  Button,
  CircularProgress,
} from '@mui/material';
import FormField from '../features/formField';
import MenuItem from '@mui/material/MenuItem';
import { State } from '../utils/types';

interface SignFormProps {
  state: State;
  handleChange: (key: keyof State, value: any) => void;
  protectedDataSubmit: () => void;
  areFieldsFilled: () => boolean;
  occupationDropdownOptions: any[];
  categoryDropdownOptions: any[];
  searchStatusDropdownOptions: any[];
  regionDropdownOptions: any[];
  ageRangeDropdownOptions: any[];
}

const SignUpForm: FC<SignFormProps> = ({
  state,
  handleChange,
  protectedDataSubmit,
  areFieldsFilled,
  occupationDropdownOptions,
  categoryDropdownOptions,
  searchStatusDropdownOptions,
  regionDropdownOptions,
  ageRangeDropdownOptions,
}) => {
  return (
    <div>
      <table
        style={{
          fontFamily: 'Arial',
          fontWeight: '600',
          color: 'gray',
          textAlign: 'left',
          margin: '10px 48px',
        }}
      >
        <tbody>
          <FormField
            label="Email"
            type="email"
            value={state.email}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => handleChange('email', e.target.value)}
            id="email"
            sx={{ mt: 3 }}
            required
            error={!state.isValidEmail}
            helperText={
              !state.isValidEmail ? 'Please enter a valid email address' : ''
            }
          />
          <FormField
            label="Occupation"
            type="select"
            value={state.occupation}
            onChange={(e: SelectChangeEvent<string>) =>
              handleChange('occupation', e.target.value)
            }
            id="occupation"
            sx={{ mt: 3 }}
            required
          >
            {occupationDropdownOptions.map((option: any, index: number) => (
              <MenuItem
                key={index}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </MenuItem>
            ))}
          </FormField>
          <FormField
            label="Categories"
            type="select"
            value={state.category}
            onChange={(e: SelectChangeEvent<string>) =>
              handleChange('category', e.target.value)
            }
            id="occupation"
            sx={{ mt: 3 }}
            required
          >
            {categoryDropdownOptions.map((option: any, index: number) => (
              <MenuItem
                key={index}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </MenuItem>
            ))}
          </FormField>
          <FormField
            label="Searching for"
            type="select"
            value={state.searchingFor}
            onChange={(e: SelectChangeEvent<string>) =>
              handleChange('searchingFor', e.target.value)
            }
            id="searchingFor"
            sx={{ mt: 3 }}
            required
          >
            {searchStatusDropdownOptions.map((option: any, index: number) => (
              <MenuItem
                key={index}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </MenuItem>
            ))}
          </FormField>
          <FormField
            label="Region"
            type="select"
            value={state.region}
            onChange={(e: SelectChangeEvent<string>) =>
              handleChange('region', e.target.value)
            }
            id="region"
            sx={{ mt: 3 }}
            required
          >
            {regionDropdownOptions.map((option: any, index: number) => (
              <MenuItem
                key={index}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </MenuItem>
            ))}
          </FormField>
          <FormField
            label="Age"
            type="select"
            value={state.age}
            onChange={(e: SelectChangeEvent<string>) =>
              handleChange('age', e.target.value)
            }
            id="age"
            sx={{ mt: 3 }}
            required
          >
            {ageRangeDropdownOptions.map((option: any, index: number) => (
              <MenuItem
                key={index}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </MenuItem>
            ))}
          </FormField>{' '}
        </tbody>
      </table>

      {state.errorProtect && (
        <Alert sx={{ mt: 3, mb: 2 }} severity="error">
          <Typography variant="h6"> Creation failed </Typography>
          {state.errorProtect}
        </Alert>
      )}
      {!state.loadingProtect && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '30px',
          }}
        >
          <Button
            id="btn-color-wallet2"
            onClick={protectedDataSubmit}
            variant="contained"
            disabled={!areFieldsFilled()}
          >
            Subscribe
          </Button>
        </div>
      )}
      {state.loadingProtect && (
        <CircularProgress
          sx={{ display: 'block', margin: '20px auto', color: 'black' }}
        ></CircularProgress>
      )}
    </div>
  );
};

export default SignUpForm;
