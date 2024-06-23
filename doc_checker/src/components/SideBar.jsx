import React from 'react';
import { styled } from '@mui/system';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
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

const DrawerContainer = styled('div')(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  [theme.breakpoints.down('sm')]: {
    width: 200,
  },
}));

const DrawerPaper = styled('div')(({ theme }) => ({
  width: 240,
  backgroundColor: '#f5f5f5',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    width: 200,
  },
}));

const LogoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  fontWeight: 'bold',
  fontSize: 10,
  [theme.breakpoints.down('sm')]: {
    fontSize: 10,
  },
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
  width: theme.spacing(7),
  height: theme.spacing(7),
  borderRadius: '50%',
  marginRight: theme.spacing(1),
}));

const UserNameEmail = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '1rem',  // Added margin-left to create space
}));

const ClickableDiv = styled('div')(() => ({
  cursor: 'pointer',
}));

const BottomSection = styled('div')({
  marginTop: 'auto', // Pushes the bottom section to the bottom of the drawer
});

const Sidebar = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

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

  return (
    <>
      <Drawer
        className={DrawerContainer}
        variant="permanent"
        classes={{
          paper: DrawerPaper,
        }}
      >
        <div>
          <LogoContainer>
            <img src={logo} alt="Logo" className={ProfileImage} />
            <Typography variant="h5" style={{ fontSize: '24px', fontWeight: 'bold' }}>DocChecker</Typography>
          </LogoContainer>
          <List className={DrawerContainer}>
            <ClickableDiv onClick={handleHomeClick}>
              <ListItem>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </ClickableDiv>
          </List>
        </div>
        <BottomSection>
          <Divider />
          <UserInfo>
            {user?.image ? (
              <img src={user.image} alt={user?.fullname} className={ProfileImage} />
            ) : (
              <StyledAvatar>{user?.firstname?.charAt(0).toUpperCase()}</StyledAvatar>
            )}
            <UserNameEmail>
              <Typography variant="body1">{user?.fullname}</Typography>
              <Typography variant="body2">{user?.emailId}</Typography>
            </UserNameEmail>
          </UserInfo>
          <Divider />
          <List>
            <ClickableDiv onClick={() => navigate('/settings')}>
              <ListItem>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </ClickableDiv>
            <ClickableDiv onClick={openModal}>
              <ListItem>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItem>
            </ClickableDiv>
          </List>
        </BottomSection>
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

export default Sidebar;
