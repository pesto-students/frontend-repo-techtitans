import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ChangeProfilePicture from '../components/ChangeProfilePicture';
import ChangeProfileSetting from '../components/ChangeProfileSetting';
import ChangeLoginSetting from '../components/ChangeLoginSetting';
import { useSelector } from 'react-redux';
import useAxios from '../hooks/UseAxios.hook'
import { CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import { setUser } from '../redux/slicer';
import { useDispatch } from 'react-redux';

function Settings() {
    const user = useSelector(state => state.user.user)
    const [selectedImage, setSelectedImage] = useState(user?.image || "");
    const { data, error, loading, setUrl, setBody, setMethod } = useAxios({
        autoFetch: false
    });

    const dispatch = useDispatch()

    useEffect(() => {
        if (data && Object.keys(data).length) {
            sessionStorage.setItem('userInfo', JSON.stringify({accessToken: user.accessToken, ...data.data}))
            dispatch(setUser({accessToken : user.accessToken, ...data.data}))
        }
    }, [data])

    return (
        <Box display="flex" flexDirection="column" height="90vh" >
            <Typography variant="h4" ml={5} mt={2} mb={2} sx={{ fontWeight: 'bold' }}>
                Settings
            </Typography>
            {error ?
                <Alert severity="error">{error?.response?.data || error?.message}</Alert> :
                data && <Alert severity="success">{data?.message}</Alert>
            }
            <Box display="flex" flexGrow={1} overflow="hidden" sx={{ border: '1px solid #E4E6EA' }}>

                {
                    loading ?
                        <Box display="flex" justifyContent="center" width="100%">
                            <CircularProgress color='secondary' size={100} />
                        </Box> :
                        <ChangeProfilePicture selectedImage={selectedImage} setSelectedImage={setSelectedImage}
                            user={user} data={data} />
                }

                <Box
                    component="section"
                    sx={{ flexGrow: 1, overflowY: 'auto', padding: 5 }}
                >
                    <Grid container spacing={4} direction="column">
                        <Grid item>
                            {
                                loading ?
                                    <Box display="flex" justifyContent="center" width="100%">
                                        <CircularProgress color='secondary' size={100} />
                                    </Box> :
                                    <ChangeProfileSetting user={user} selectedImage={selectedImage}
                                        setUrl={setUrl} setBody={setBody} setMethod={setMethod} />
                            }

                        </Grid>
                        {/* <Grid item>
                            <ChangeLoginSetting />
                        </Grid> */}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default Settings;
