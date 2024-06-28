import { Typography, Box, CircularProgress } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/UseAxios.hook'
import { setUser } from '../redux/slicer';
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import { GENERIC_ERROR } from '../Constants';

function Logout() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false)
  const { data, error, loading, } = useAxios({
    url: '/auth/signout',
    method: 'GET',
    autoFetch: true
  });

  useEffect(() => {
    if(data && Object.keys(data).length > 0) {
      sessionStorage.clear();
      dispatch(setUser({}));
      setShowError(false)
      navigate('/');
    }
    if(error) {
      setShowError(true)
    }
    // eslint-disable-next-line
  }, [data, error]);


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh' 
      }}
    >
      {loading ? 
      <>
      <CircularProgress color='secondary' size={100} />
      <Typography variant="body1" mt={2} ml={2}>Logging you out...</Typography> 
      </>
      
      : 
      showError ? <Alert severity="error">{error?.response?.data || error?.message || GENERIC_ERROR }</Alert> :
      <Typography variant='h5' >
        {data?.message}
      </Typography>}
    </Box>

  )
}

export default Logout