import { useState, useEffect } from 'react';
import {
  TextField,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import Connect from '../features/connectMessage';
import { useAccount } from 'wagmi';
import { Header } from '../features/header';
import { supabase } from '../config/client';
import {
  occupationDropdownOptions,
  categoryDropdownOptions,
  searchStatusDropdownOptions,
  regionDropdownOptions,
  ageRangeDropdownOptions,
} from '../constants';
import { User } from '../utils/types';

import { sendWeb3Email } from '../utils/iexecApi';

export default function SendWeb3Email() {
  const { isConnected } = useAccount();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [subscribedUsers, setSubscribedUsers] = useState<User[]>([]);


  const [successMessages, setSuccessMessages] = useState<{ [key: string]: string | null }>({});
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string | null }>({});

  

  const handleCategorySelect = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const filteredCategories = categoryDropdownOptions.filter(
    (option) => !option.disabled
  );

  const shortAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const updateDatabase = async (user: User) => {
    const { data, error } = await supabase
      .from('subscribed_users')
      .update({ email_count_limit: user.email_count_limit - 1 })
      .eq('user_id', user.user_id);

    console.log('Database updated!', data);
    if (error) {
      throw new Error(
        `Failed to update database: ${error.message || 'Unknown error'}`
      );
    }
  };

  const sendEmail = async (user: User) => {
    try {
      await sendWeb3Email(user.encrypted_email, subject, message);
      await updateDatabase(user);
      setSuccessMessages({
        ...successMessages,
        [user.user_id]: `Successfully sent email to ${user.encrypted_email}`,
      });
      setErrorMessages({
        ...errorMessages,
        [user.user_id]: null,
      });
    } catch (error) {
      setSuccessMessages({
        ...successMessages,
        [user.user_id]: null,
      });
      setErrorMessages({
        ...errorMessages,
        [user.user_id]: `Failed to send email or update database: ${
          (error as Error).message || 'Unknown error'
        }`,
      });
    }
  };

  const fetchSubscribedUsers = async () => {
    const { data, error } = await supabase
      .from('subscribed_users')
      .select('*')
      .in('category', selectedCategories);

    if (error) {
      console.error('Error fetching data: ', error);
    } else {
      setSubscribedUsers(data);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchSubscribedUsers();
    })();
  }, [selectedCategories]);

  return (
    <Container disableGutters>
      {isConnected ? (
        <>
          <Header pageHeaderTitle={' '} showLogo={false} />
          <div>
            <h2 id="colortitulo2">Compose Email: </h2>
            <Grid
              id="entries"
              container
              spacing={2}
              sx={{ paddingBottom: '26px', width: '83%', marginLeft: '10%' }}
            >
              <Grid item xs={12} sm={2}>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    fontSize: '1.6rem',
                    fontWeight: '600',
                    fontFamily: 'sans-serif',
                    color: '#737373',
                  }}
                >
                  Subject:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  sx={{
                    borderRadius: '20px',
                    width: '80%',
                    border: '1px solid white',
                    background: '#B8B8DF',
                    color: 'white',
                  }}
                  variant="outlined"
                  placeholder="Enter subject"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    fontSize: '1.6rem',
                    fontWeight: '600',
                    fontFamily: 'sans-serif',
                    color: '#737373',
                  }}
                >
                  Message:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  sx={{
                    borderRadius: '20px',
                    width: '80%',
                    border: '1px solid white',
                    background: '#B8B8DF',
                    color: 'white',
                  }}
                  variant="outlined"
                  placeholder="Enter your message here"
                  fullWidth
                  multiline
                  rows={5}
                />
              </Grid>
            </Grid>
          </div>
          <div>
            <h2 id="colortitulo2">Choose Your Target Audience Category: </h2>
            <div id="newsletter">
              <p>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.6rem',
                    fontWeight: '600',
                    fontFamily: 'sans-serif',
                    color: '#737373',
                  }}
                >
                  Categories
                </Typography>
              </p>

              <div className="btn-group">
                {filteredCategories.slice(0, 5).map((category, index) => (
                  <Button
                    key={index}
                    id="btn-color-newsletter2"
                    variant="contained"
                    onClick={() => handleCategorySelect(category.value)}
                  >
                    {category.label}{' '}
                    {selectedCategories.includes(category.value) && '✔'}
                  </Button>
                ))}
              </div>

              <div className="btn-group">
                {filteredCategories.slice(5).map((category, index) => (
                  <Button
                    key={index}
                    id="btn-color-newsletter2"
                    variant="contained"
                    onClick={() => handleCategorySelect(category.value)}
                  >
                    {category.label}{' '}
                    {selectedCategories.includes(category.value) && '✔'}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div>
            {subscribedUsers && subscribedUsers.length > 0 && (
              <div>
                <h2 id="colortitulo2">Subscribed Users: </h2>

                <Grid
                  container
                  spacing={2}
                  sx={{
                    paddingBottom: '26px',
                    width: '83%',
                    marginLeft: '10%',
                    background: '#EDEDF8',
                    borderRadius: '20px',
                  }}
                >
                  {subscribedUsers.map(
                    (user: User, index) =>
                      user.email_count_limit > 0 && (
                        <Grid
                          item
                          sx={{ padding: '10px' }}
                          xs={12}
                          sm={6}
                          md={4}
                          key={index}
                        >
                          <Card
                            sx={{
                              background: '#DBDBEF',
                              borderRadius: '20px',
                              color: '#737373',
                              padding: '10px 20px',
                            }}
                          >
                            <CardContent>
                              <Typography
                                sx={{
                                  fontSize: '1.6rem',
                                  fontWeight: '600',
                                  fontFamily: 'sans-serif',
                                  color: '#737373',
                                }}
                                variant="body1"
                              >
                                {shortAddress(user.user_id)}
                              </Typography>
                              <Typography variant="body2">
                                Created At: {formatDate(user.created_at)}
                              </Typography>
                              <Typography variant="body2">
                                Email: {shortAddress(user.encrypted_email)}
                              </Typography>
                              <Typography variant="body2">
                                Occupation:{' '}
                                {occupationDropdownOptions.find(
                                  (opt) => opt.value === user.occupation
                                )?.label || user.occupation}{' '}
                              </Typography>
                              <Typography variant="body2">
                                Category:{' '}
                                {categoryDropdownOptions.find(
                                  (opt) => opt.value === user.category
                                )?.label || user.category}{' '}
                              </Typography>
                              <Typography variant="body2">
                                Search Status:{' '}
                                {searchStatusDropdownOptions.find(
                                  (opt) => opt.value === user.search_status
                                )?.label || user.search_status}{' '}
                              </Typography>
                              <Typography variant="body2">
                                Region:{' '}
                                {regionDropdownOptions.find(
                                  (opt) => opt.value === user.region
                                )?.label || user.region}{' '}
                              </Typography>
                              <Typography variant="body2">
                                Age Range:{' '}
                                {ageRangeDropdownOptions
                                  .find((opt) => opt.value === user.age_range)
                                  ?.label.split(' ')[0] || user.age_range}{' '}
                              </Typography>
                              <Typography variant="body2">
                                Email Count Limit: {user.email_count_limit}
                              </Typography>
                              <Typography variant="body2">
                                Email Price: {user.email_price}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button
                                id="btn-color-email"
                                variant="contained"
                                color="primary"
                                onClick={() => sendEmail(user)}
                              >
                                Send Email
                              </Button>
                              {successMessages[user.user_id] && (
                                <Typography
                                  sx={{
                                    padding: '0 10px',
                                    color: '#28db4f',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                  }}
                                  variant="body1"
                                >
                                  Sent!
                                </Typography>
                              )}
                              {errorMessages[user.user_id] && (
                                <Typography
                                  sx={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: '#ff0000',
                                    padding: '0 10px',
                                  }}
                                  variant="body1"
                                >
                                  Failed to send email, please try again later.
                                </Typography>
                              )}
                            </CardActions>
                          </Card>
                        </Grid>
                      )
                  )}
                </Grid>
                <div style={{ marginBottom: '20px', marginTop: '10px' }}>
                  <Typography variant="h6">
                    Number of Results: {subscribedUsers.length}
                  </Typography>
                  <Typography variant="h6">
                    Total Cost:{' '}
                    {subscribedUsers.reduce(
                      (acc, user) => acc + user.email_price,
                      0
                    )}{' '}
                    XRLC
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <Connect />
      )}
    </Container>
  );
}
