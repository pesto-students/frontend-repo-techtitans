import React from 'react';
import { styled } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import logo from '../images/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BasicModal from './Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { setUser } from '../redux/slicer';
import { ROLES } from '../Constants';
import { red } from '@mui/material/colors';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const LogoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
}));

const LogoImage = styled('img')(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%', // Makes the logo round
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(1),
  backgroundColor: red[500],
}));

const UserInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const ProfileImage = styled('img')(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
  borderRadius: '50%',
  marginRight: theme.spacing(1),
}));

const UserNameEmail = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '1rem',
}));

const ClickableDiv = styled('div')(() => ({
  cursor: 'pointer',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  height: theme.mixins.toolbar.minHeight,
}));

const Navbar = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleHomeClick = () => {
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
    sessionStorage.clear();
    dispatch(setUser({}));
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <LogoContainer>
            <LogoImage src={logo} alt="Logo" />
            <Typography variant="h6" noWrap ml={1}>DocChecker</Typography>
          </LogoContainer>
          <div style={{ flexGrow: 1 }} />
          {user?.image ? (
            <ProfileImage src={user.image} alt={user?.fullname} />
          ) : (
            <StyledAvatar>{user?.firstname?.charAt(0).toUpperCase()}</StyledAvatar>
          )}
        </Toolbar>
      </StyledAppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <DrawerHeader />
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ClickableDiv onClick={handleHomeClick}>
              <ListItem>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </ClickableDiv>
            <Divider />
            {
              user.role !== ROLES.ADMIN &&
              <>
                <ClickableDiv onClick={() => navigate('/settings')}>
                  <ListItem>
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItem>
                </ClickableDiv>
                <Divider />
              </>
            }
            <UserInfo>
              {user?.image ? (
                <ProfileImage src={user.image} alt={user?.fullname} />
              ) : (
                <StyledAvatar>{user?.firstname?.charAt(0).toUpperCase()}</StyledAvatar>
              )}
              <UserNameEmail>
                <Typography variant="body1">{user?.fullname}</Typography>
                <Typography variant="body2">{user?.emailId}</Typography>
              </UserNameEmail>
            </UserInfo>
            <Divider />
            <ClickableDiv onClick={openModal}>
              <ListItem>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItem>
            </ClickableDiv>
          </List>
        </div>
      </Drawer>
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
