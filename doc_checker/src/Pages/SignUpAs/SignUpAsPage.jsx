import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import image from '../../images/landing_page_img.png';
import logo from '../../images/logo.png';
import './SignUpAsPage.css';
import { Stack, Button, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from "react-router-dom";

const SignUpAsPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ bgcolor: '#EFF0FB', height: '100vh' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {!isSmallScreen && (
          <Grid item xs={6} className='cusGrid'>
            <img 
              src={image} 
              alt='landing_image'
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Grid>
        )}

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          item xs={isSmallScreen ? 12 : 6}
          sx={{ bgcolor: '#EFF0FB' }}
        >
          <Stack direction="column" spacing={3} alignItems="center">
            <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
              <img src={logo} alt='DocChecker_Logo' style={{ height: '40px' }} />
              <h1>DocChecker</h1>
            </Stack>

            <h1>Sign Up As?</h1>

            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              spacing={3}
            >
              <Button variant="contained" onClick={() => navigate("/signup")}>Customer</Button>
              <Button variant="contained" onClick={() => navigate("/expert/signup")}>Expert</Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpAsPage;
