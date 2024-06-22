import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import image from '../images/landing_page_img.png'
import Logo from '../images/logo.png'
import './SignUpAs/SignUpAsPage.css'
import { Stack, Button, Container, Typography, TextField } from '@mui/material';
import useAxios from '../hooks/UseAxios.hook'
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slicer';
import BasicModal from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../Constants'
import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';
import ProvideEmail from '../components/ProvideEmail';


const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalActions, setModalActions] = React.useState()
    const [modalTitle, setModalTitle] = React.useState('')
    const { setMethod, setBody, data, error, setUrl, loading, setHeaders } = useAxios({
        //url: '/auth/login',
        // headers: { 'Content-Type': 'application/json' },
        autoFetch: false
    });
    console.log(error)

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    // useEffect(() => {
    //     if(loading) {

    //     }
    //     if (data && Object.keys(data).length) {

    //     }

    // }, [data])

    const handleSubmitEmail = () => {
        setUrl('/auth/forgotPassword')
        setBody({
            "emailId": email
        })
        setMethod('POST')
        setHeaders({ 'Content-Type': 'application/json' })

    }

    return (
        <div>
            <Box >

                <Grid container spacing={2}>
                    <Grid item xs={6} className='parentDivFullHeight'>
                        <img src={image} alt='landing_image' />
                    </Grid>

                    <Grid container direction="row" item xs={6} mt={8}>

                        <Stack direction="column" spacing={6} style={{ width: '100%' }}>
                            <Stack direction="column" spacing={1} alignItems="center">
                                <img src={Logo} alt='DocChecker_Logo' />
                                <h1>DocChecker</h1>
                                <Typography variant="h6">Forgot Password</Typography>
                                {error && <Alert severity="error">
                                    {error?.response?.data?.message || error?.response?.data || error.message}

                                </Alert>}
                                {
                                    data && <Alert severity="success">
                                        OTP has been sent to your Email ID. Please check.

                                    </Alert>
                                }
                            </Stack>
                            {
                                loading ?
                                    <Box display="flex" justifyContent="center" width="100%">
                                        <CircularProgress color='secondary' size={100} />
                                    </Box>
                                    :
                                    <ProvideEmail email={email} setEmail={setEmail} handleSubmitEmail={handleSubmitEmail} />

                            }


                        </Stack>

                    </Grid>

                </Grid>
            </Box>
            {showModal &&
                <BasicModal openModal={openModal}
                    closeModal={closeModal}
                    showModal={showModal}
                    modalTitle={modalTitle}
                    modalActions={modalActions} />
            }

        </div>
    );
};

export default ForgotPassword;
