import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import image from '../../images/landing_page_img.png'
import '../SignUpAs/SignUpAsPage.css'
import { Stack, Button, Container } from '@mui/material';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/UseAxios.hook';
import BasicModal from '../../components/Modal';

const SignUp = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalActions, setModalActions] = React.useState()
    const [modalTitle, setModalTitle] = React.useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const { data, error, setBody } = useAxios({
        url: '/auth/signup',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        autoFetch: false
    });

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const navigateToLogin = () => {
        setShowModal(false)
        navigate('/login')
    }

    const handlePostData = () => {
        setBody(userData)     
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "confirmPassword") {
            setPasswordsMatch(userData.password === value ? true : false)
        } else {
            setUserData((prevUserData) => ({ ...prevUserData, ...{ [name]: value } }))
        }
    }

    useEffect(() => {
        if (data && Object.keys(data).length) {
            setModalTitle("Congratulations!!! You have successfully signed up to DocChecker. You will now be redirected to login screen.")
            setModalActions(
                <Stack direction="row" sx={{margin: 'auto'}}>
                    <Button
                        variant="contained"
                        onClick={navigateToLogin}
                        >
                            Done
                    </Button>
                </Stack>
            )
            setShowModal(true)
        }
        
    }, [data]);

    useEffect(() => {
        if (error && Object.keys(error).length) {
           setModalTitle(error?.response?.data?.message || error?.message)
            setModalActions(
                <Stack direction="row" sx={{margin: 'auto'}}>
                    <Button
                        variant="contained"
                        onClick={closeModal}
                        >
                            Close
                    </Button>
                </Stack>
            )
            setShowModal(true)
        }
    },[error])

    return (
        <div>
            <Box sx={{ height: '92vh', marginTop: "17px" }} >

                <Grid container spacing={2}>
                    <Grid item xs={6} className='parentDivFullHeight'>
                        <img src={image} alt='landing_image' />
                    </Grid>

                    <Grid container direction="row" justifyContent="center" alignItems="flex-start" item xs={6}>

                        <Stack direction="column" spacing={10} style={{ width: '100%', "marginTop": "30px" }}>
                            <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                                <h1 >Customer Sign Up</h1>
                                <p>Enter Login Details to Access DocChecker</p>
                            </Stack>
                            <Stack direction="column" justifyContent="center" alignItems="center">
                                <Container maxWidth="sm">
                                    <FormContainer
                                        defaultValues={userData}
                                        onSuccess={handlePostData}
                                    >
                                        <Stack spacing={3} alignItems="center">
                                            <TextFieldElement fullWidth name={'firstname'} label={"Firstname"} className={"fullWidth"} type={'text'} onChange={handleChange} required />
                                            <TextFieldElement fullWidth name={'lastname'} label={"Lastname"} className={"fullWidth"} type={'text'} onChange={handleChange} required />
                                            <TextFieldElement fullWidth name={'emailId'} label={"Email-Id"} className={"fullWidth"} type={'email'} onChange={handleChange} required />
                                            <TextFieldElement fullWidth name={'username'} label={"Username"} className={"fullWidth"} type={'text'} onChange={handleChange} required />
                                            <TextFieldElement fullWidth name={'password'} label={"Password"} className={"fullWidth"} type={'password'} onChange={handleChange} required />
                                            <TextFieldElement fullWidth name={'confirmPassword'} label={"Confirm Password"} className={"fullWidth"} type={'password'} onChange={handleChange} required />
                                            {passwordsMatch && <p>Passwords Match</p>}
                                            <Button variant="contained" fullWidth={true} type={'submit'}>Sign Up</Button>
                                            <p>Already a member? <a href='!#' onClick={(e) => { e.preventDefault(); navigate('/login')}}>Login</a></p>
                                        </Stack>
                                    </FormContainer>
                                </Container>
                            </Stack>
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

export default SignUp;
