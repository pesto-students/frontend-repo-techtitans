import { Typography, Box, CircularProgress } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate()
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setShowLoader(true);
    }, 200);
    
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 3000); 

    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh' 
      }}
    >
      {showLoader ? 
      <>
      <CircularProgress color='secondary' size={100} />
      <Typography variant="body1" mt={2} ml={2}>Redirecting to the Home page...</Typography> 
      </>
      
      :
      <Typography variant='h5' >
        You have successfully logged out!!!
      </Typography>}
    </Box>

  )
}

export default Logout