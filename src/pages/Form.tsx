import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Typography, Box, Container } from '@mui/material';
import { DataSchema, DataSchemaEntryType } from '@iexec/dataprotector';
import Connect from '../features/connectMessage';
import { Header } from '../features/header';
import GrantAccessForm from '../features/grantAccess';
import RevokeAccessForm from '../features/revokeAccess';
import DataSecuredMessage from '../features/dataSecuredMessage';
import SignUpForm from '../features/signupForm';
import UpdatePreferencesForm from '../features/updatePreferencesForm';
import LoadingIndicator from '../features/loadingIndicator';
import {
  protectDataFunc,
  grantAccessFunc,
  revokeAccessFunc,
} from '../utils/iexecApi';
import { IEXEC_EXPLORER_URL } from '../config/config';
import {
  occupationDropdownOptions,
  categoryDropdownOptions,
  searchStatusDropdownOptions,
  regionDropdownOptions,
  ageRangeDropdownOptions,
} from '../constants';
import { supabase } from '../config/client/';
import { State, initialState } from '../utils/types';
import { checkUserInDatabase, getUserData } from '../utils/utils';
import { User } from '../utils/types';


export default function Form() {
  const { isConnected, address } = useAccount();
  const [state, setState] = useState(initialState);
  const [isUserInDatabase, setIsUserInDatabase] = useState<boolean | null>( null );
  const [userData, setUserData] = useState<User | null>({} as User);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (key: keyof State, value: any) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  const addToDB = async () => {
    const subscribedUser = {
      user_id: address,
      encrypted_email: state.protectedData,
      occupation: state.occupation,
      category: state.category,
      search_status: state.searchingFor,
      region: state.region,
      age_range: state.age,
      email_count_limit: state.emailFrequency,
      email_price: state.pricePerEmail,
    };

    const { data, error } = await supabase
      .from('subscribed_users')
      .upsert([subscribedUser], { conflictFields: ['user_id'] });

    if (error) {
      console.error('Supabase Upsert Error:', error);
    } else {
      console.log('Successfully upserted data:', data);
    }
  };

  const protectedDataSubmit = async () => {
    handleChange('errorProtect', '');
    if (state.email) {
      const data: DataSchema = {
        email: state.email as DataSchemaEntryType,
      };

      try {
        handleChange('loadingProtect', true);
        const ProtectedDataAddress = await protectDataFunc(
          data,
          'Subscriber ' + address
        );
        handleChange('protectedData', ProtectedDataAddress);
        handleChange('errorProtect', '');
        handleChange('formSubmittedSuccessfully', true);
      } catch (error) {
        handleChange('errorProtect', String(error));
      }
      handleChange('loadingProtect', false);
    } else {
      handleChange('errorProtect', 'Please enter a valid email address');
    }
  };

  const grantAccessSubmit = async () => {
    handleChange('errorGrant', '');
    try {
      handleChange('authorizedUser', state.authorizedUser);
      handleChange('loadingGrant', true);

      const accessHash = await grantAccessFunc(
        state.protectedData,
        state.authorizedUser,
        state.pricePerEmail,
        state.emailFrequency
      );

      await addToDB();

      handleChange('errorGrant', '');
      handleChange('grantAccess', accessHash);
    } catch (error) {
      handleChange('errorGrant', String(error));
      handleChange('grantAccess', undefined);
    }
    handleChange('loadingGrant', false);
  };

  const revokeAccessSubmit = async () => {
    handleChange('revokeAccess', '');
    try {
      handleChange('loadingRevoke', true);

      const tx = await revokeAccessFunc(
        state.protectedData,
        state.authorizedUser
      );

      if (tx) {
        const { error: updateError } = await supabase
          .from('subscribed_users')
          .update({ email_count_limit: 0 })
          .eq('user_id', state.authorizedUser);

        if (updateError) {
          console.error('Failed to update email count limit:', updateError);
        }
      }

      handleChange('revokeAccess', tx);
    } catch (error) {
      handleChange('errorRevoke', String(error));
      handleChange('revokeAccess', '');
    }

    handleChange('loadingRevoke', false);
  };

  useEffect(() => {
    const check = async () => {
      setIsLoading(true);
      const isUser = await checkUserInDatabase(address as string);
      const user = await getUserData(address as string);
      setIsUserInDatabase(isUser);
      setUserData(user as User);
      handleChange('protectedData', user?.encrypted_email || '');
      handleChange('emailFrequency', user?.email_count_limit || 0);
      handleChange('pricePerEmail', user?.email_price || 0);
      handleChange('occupation', user?.occupation || '');
      handleChange('category', user?.category || '');
      handleChange('searchingFor', user?.search_status || '');
      handleChange('region', user?.region || '');
      handleChange('age', user?.age_range || '');
      setIsLoading(false);
    };

    check();
  }, [address, isConnected]);

  const areFieldsFilled = () => {
    return !!(
      state.email &&
      state.isValidEmail &&
      state.occupation &&
      state.category &&
      state.searchingFor &&
      state.region &&
      state.age
    );
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }
  
  return (
    <Container
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isConnected && !isUserInDatabase ? (
        state.formSubmittedSuccessfully ? (
          <>
            <Header pageHeaderTitle={' '} showLogo={false} />
            <DataSecuredMessage
              protectedData={state.protectedData}
              errorProtect={state.errorProtect}
              explorerUrl={IEXEC_EXPLORER_URL}
            />
            {state.protectedData && (
              <GrantAccessForm
                protectedData={state.protectedData}
                handleProtectedDataChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => handleChange('protectedData', e.target.value)}
                emailFrequency={state.emailFrequency.toString()}
                handleEmailFrequencyChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => handleChange('emailFrequency', Number(e.target.value))}
                pricePerEmail={state.pricePerEmail.toString()}
                handlePricePerEmailChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => handleChange('pricePerEmail', Number(e.target.value))}
                authorizedUser={state.authorizedUser}
                authorizedUserChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => handleChange('authorizedUser', e.target.value)}
                grantAccessSubmit={grantAccessSubmit}
                loadingGrant={state.loadingGrant}
                errorGrant={state.errorGrant}
                grantAccess={state.grantAccess}
              />
            )}
          </>
        ) : (
          <>
            <Header pageHeaderTitle={' '} showLogo={false} />
            <h2 id="colortitulo2">Subscribe to HERNewsletter</h2>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.2rem', fontWeight: '500', color: '#737373' }}
            >
              Elevate your Web3 journey with insights, trends, and secure ways
              to monetize your data privately.
            </Typography>
            <Box id="form-box">
              <SignUpForm
                state={state}
                handleChange={handleChange}
                protectedDataSubmit={protectedDataSubmit}
                areFieldsFilled={areFieldsFilled}
                occupationDropdownOptions={occupationDropdownOptions}
                categoryDropdownOptions={categoryDropdownOptions}
                searchStatusDropdownOptions={searchStatusDropdownOptions}
                regionDropdownOptions={regionDropdownOptions}
                ageRangeDropdownOptions={ageRangeDropdownOptions}
              />
            </Box>
          </>
        )
      ) : isUserInDatabase && isConnected ? (
        <>
          <Header pageHeaderTitle={' '} showLogo={false} />
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              fontSize: '1.6rem',
              fontWeight: '500',
              color: '#737373',
            }}
          >
            You can recieve: {userData?.email_count_limit} emails.
          </Typography>

          {userData && userData.email_count_limit > 0 && (
            <RevokeAccessForm
              protectedData={state.protectedData}
              handleProtectedDataChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChange('protectedData', e.target.value)}
              revokeAccessSubmit={revokeAccessSubmit}
              loadingRevoke={state.loadingRevoke}
              errorRevoke={state.errorRevoke}
              revokeAccess={state.revokeAccess}
            />
          )}
          {userData && userData.email_count_limit === 0 && (
            <div>
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  fontSize: '1.6rem',
                  fontWeight: '500',
                  color: '#737373',
                }}
              >
                Update your preferences.
              </Typography>

              <Box id="form-box">
                <UpdatePreferencesForm
                  state={state}
                  handleChange={handleChange}
                  areFieldsFilled={areFieldsFilled}
                  occupationDropdownOptions={occupationDropdownOptions}
                  categoryDropdownOptions={categoryDropdownOptions}
                  searchStatusDropdownOptions={searchStatusDropdownOptions}
                  regionDropdownOptions={regionDropdownOptions}
                  ageRangeDropdownOptions={ageRangeDropdownOptions}
                />
              </Box>

              <GrantAccessForm
                protectedData={state.protectedData}
                handleProtectedDataChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => handleChange('protectedData', e.target.value)}
                emailFrequency={state.emailFrequency.toString()}
                handleEmailFrequencyChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => handleChange('emailFrequency', Number(e.target.value))}
                pricePerEmail={state.pricePerEmail.toString()}
                handlePricePerEmailChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => handleChange('pricePerEmail', Number(e.target.value))}
                authorizedUser={state.authorizedUser}
                authorizedUserChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => handleChange('authorizedUser', e.target.value)}
                grantAccessSubmit={grantAccessSubmit}
                loadingGrant={state.loadingGrant}
                errorGrant={state.errorGrant}
                grantAccess={state.grantAccess}
              />
            </div>
          )}
        </>
      ) : (
        <Connect />
      )}
    </Container>
  );
}
