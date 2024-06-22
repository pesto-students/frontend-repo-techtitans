import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import image from '../../images/landing_page_img.png'
import './SignUpAsPage.css'
import { Stack, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
const SignUpAsPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ bgcolor: '#EFF0FB' }} >

        <Grid container spacing={2}>
          <Grid item xs={6} className='cusGrid'>
            <img 
              src={image} 
              alt='landing_image'
              />
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            item xs={6}>
            <Stack direction="column" spacing={3} alignItems="center">

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


    </div>
  );
};

export default SignUpAsPage;
