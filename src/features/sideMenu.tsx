import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import BookIcon from '../assets/svgs/BookIcon';
import LockIcon from '../assets/svgs/LockIcon';

type SideMenuProps = {
  showLogo?: boolean;
};

const iconStyle = {
  fill: 'gray',
  marginRight: '8px',
  width: '16px',
  height: '16px',
};

export const SideMenu: React.FC<SideMenuProps> = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        anchor="left"
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <List>
            <ListItem button component={RouterLink} to="/entries">
              <LockIcon style={iconStyle} />
              <ListItemText primary="Entries" />
            </ListItem>
            <ListItem button component={RouterLink} to="/nfts">
              <LockIcon style={iconStyle} />
              <ListItemText primary="NFTs" />
            </ListItem>
            <ListItem button component={RouterLink} to="/tokens">
              <LockIcon style={iconStyle} />
              <ListItemText primary="Tokens" />
            </ListItem>
            <ListItem button component={RouterLink} to="/settings">
              <LockIcon style={iconStyle} />
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button component={RouterLink} to="/support">
              <LockIcon style={iconStyle} />
              <ListItemText primary="Support" />
            </ListItem>
            <ListItem button component={RouterLink} to="/profile">
              <BookIcon style={iconStyle} />
              <ListItemText primary="Profile" />
            </ListItem>
          </List>

          <List style={{ flexGrow: 1, flexShrink: 0, marginTop: '20vh' }}>
            <ListItem button component={RouterLink} to="/">
              <img
                src="https://substackcdn.com/image/fetch/w_224,h_224,c_fill,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fda95c68e-65aa-496d-bc5d-605dafe241b9_4168x4168.jpeg"
                alt="Logo"
                style={{ width: '100px', height: '100px' }}
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};
