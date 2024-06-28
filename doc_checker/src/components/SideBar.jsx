import React from 'react';
import { styled } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logo from '../images/logo.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BasicModal from './Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ROLES } from '../Constants';
import { red } from '@mui/material/colors';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const LogoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  cursor: 'pointer',
}));

const LogoImage = styled('img')(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%', // Makes the logo round
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: red[500],
  cursor: 'pointer', // Add cursor pointer to indicate it's clickable
}));

const UserDetails = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginRight: theme.spacing(2),
  color: theme.palette.common.white,
}));

const ProfileImage = styled('img')(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
  borderRadius: '50%',
  cursor: 'pointer',
}));

const Navbar = () => {
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const navigateToHome = () => {
    if (user.role === ROLES.CUSTOMER) {
      navigate('/customer-home');
    }
    if (user.role === ROLES.EXPERT) {
      navigate('/expert-home');
    }
    if (user.role === ROLES.ADMIN) {
      navigate('/admin-home');
    }
  };

  const handleLogout = () => {
    navigate('/logout');
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    handleMenuClose();
    navigate('/settings');
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    openModal();
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          <LogoContainer onClick={navigateToHome}>
            <LogoImage src={logo} alt="Logo" />
            <Typography variant="h6" noWrap ml={1}>DocChecker</Typography>
          </LogoContainer>
          <div style={{ flexGrow: 1 }} />
          <UserDetails>
            <Typography variant="body1" textAlign="right">{user?.fullname}</Typography>
            <Typography variant="body2" textAlign="right">{user?.emailId}</Typography>
          </UserDetails>
          {user?.image ? (
            <ProfileImage
              src={user.image}
              alt={user?.fullname}
              onClick={handleAvatarClick}
            />
          ) : (
            <StyledAvatar onClick={handleAvatarClick}>
              {user?.firstname?.charAt(0).toUpperCase()}
            </StyledAvatar>
          )}
          
          <Menu sx={{ mt: 1 }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {
              user.role !== ROLES.ADMIN &&
              <>
                <MenuItem onClick={handleSettingsClick} >
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </MenuItem>
                <Divider />
              </>
            }
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </StyledAppBar>
      {showModal &&
        <BasicModal
          openModal={openModal}
          closeModal={closeModal}
          showModal={showModal}
          modalTitle="Are you sure you want to logout?"
          modalActions={
            <Stack spacing={2} direction="row" sx={{ margin: 'auto' }}>
              <Button variant="contained" onClick={handleLogout}>
                Confirm
              </Button>
              <Button variant="contained" onClick={closeModal}>
                Cancel
              </Button>
            </Stack>
          }
        />
      }
    </>
  );
};

export default Navbar;
