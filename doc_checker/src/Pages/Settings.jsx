import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ChangeProfilePicture from '../components/ChangeProfilePicture';
import ChangeProfileSetting from '../components/ChangeProfileSetting';
import { useSelector } from 'react-redux';
import useAxios from '../hooks/UseAxios.hook'
import { CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import { setUser } from '../redux/slicer';
import { useDispatch } from 'react-redux';
import { GENERIC_ERROR } from '../Constants';

function Settings() {
    const user = useSelector(state => state.user.user)
    const [selectedImage, setSelectedImage] = useState(user?.image || "");
    const [sizeError, setSizeError] = useState(false)
    const [typeError, setTypeError] = useState(false)
    const { data, error, loading, setUrl, setBody, setMethod } = useAxios({
        autoFetch: false
    });
    const dispatch = useDispatch()

    useEffect(() => {
        if (data && Object.keys(data).length) {
            sessionStorage.setItem('userInfo', JSON.stringify({ accessToken: user.accessToken, ...data.data }))
            dispatch(setUser({ accessToken: user.accessToken, ...data.data }))
        }
    }, [data, dispatch, user.accessToken])

    return (
        <Box display="flex" flexDirection="column" height="80vh" ml={5}>
            <Typography variant="h4" ml={5} mt={2} mb={2} sx={{ fontWeight: 'bold' }}>
                Settings
            </Typography>
            {error ?
                <Alert severity="error">{error?.response?.data?.message || error?.message || GENERIC_ERROR}</Alert> :
                data && <Alert severity="success">{data?.message}</Alert>
            }
            {
                loading ?
                    <Box display="flex" justifyContent="center" width="100%" >
                        <CircularProgress color='secondary' size={100} />
                    </Box>
                    :
                    <Box display="flex" flexGrow={1} overflow="hidden" sx={{ border: '1px solid #E4E6EA' }}>

                        <ChangeProfilePicture selectedImage={selectedImage} setSelectedImage={setSelectedImage}
                            user={user} data={data} sizeError={sizeError} setSizeError={setSizeError}
                            typeError={typeError} setTypeError={setTypeError} />
                        <Box
                            component="section"
                            sx={{ flexGrow: 1, overflowY: 'auto', padding: 5 }}
                        >
                            <Grid container spacing={4} direction="column">
                                <Grid item>
                                    <ChangeProfileSetting user={user} selectedImage={selectedImage}
                                        setUrl={setUrl} setBody={setBody} setMethod={setMethod}
                                        setSizeError={setSizeError} setTypeError={setTypeError}
                                    />
                                </Grid>
                            </Grid>
                        </Box>


                    </Box>
            }

        </Box>
    );
}

export default Settings;
