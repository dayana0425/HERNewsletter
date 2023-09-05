import { GrantedAccess } from '@iexec/dataprotector';

export interface State {
  loadingProtect: boolean;
  errorProtect: string;
  loadingGrant: boolean;
  errorGrant: string;
  loadingRevoke: boolean;
  errorRevoke: string;
  protectedData: string;
  grantAccess: GrantedAccess | undefined;
  revokeAccess: string;
  email: string;
  isValidEmail: boolean;
  emailFrequency: number;
  pricePerEmail: number;
  authorizedUser: string;
  occupation: string;
  category: string;
  searchingFor: string;
  region: string;
  age: string;
  formSubmittedSuccessfully: boolean;
}

export const initialState: State = {
  loadingProtect: false,
  errorProtect: '',
  loadingGrant: false,
  errorGrant: '',
  loadingRevoke: false,
  errorRevoke: '',
  protectedData: '',
  grantAccess: undefined,
  revokeAccess: '',
  email: '',
  isValidEmail: true,
  emailFrequency: 0,
  pricePerEmail: 0,
  authorizedUser: '0xC0c630f5c9A78A75a92617852AD0F4E80BF252Cf', // my address
  occupation: '',
  category: '',
  searchingFor: '',
  region: '',
  age: '',
  formSubmittedSuccessfully: false,
};

export type User = {
    user_id: string;
    created_at: string;
    encrypted_email: string;
    occupation: string;
    category: string;
    search_status: string;
    region: string;
    age_range: string;
    email_count_limit: number;
    email_price: number;
  };
  