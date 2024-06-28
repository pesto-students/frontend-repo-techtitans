import React, { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Stack, Button, Container, useMediaQuery } from '@mui/material';
import { FormContainer, TextFieldElement, PasswordElement, PasswordRepeatElement } from 'react-hook-form-mui';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/UseAxios.hook';
import BasicModal from '../../components/Modal';
import image from '../../images/landing_page_img.png';
import '../SignUpAs/SignUpAsPage.css';
import { GENERIC_ERROR } from '../../Constants'

const SignUp = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalActions, setModalActions] = useState();
    const [modalTitle, setModalTitle] = useState('');
    const { data, error, setBody } = useAxios({
        url: '/auth/signup',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        autoFetch: false
    });

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const navigateToLogin = useCallback(() => {
        setShowModal(false);
        navigate('/login');
    }, [setShowModal, navigate]);

    const handlePostData = () => {
        setBody(userData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name !== 'confirmPassword') {
            setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
        }
    };

    useEffect(() => {
        if (data && Object.keys(data).length) {
            setModalTitle(
                'Congratulations!!! You have successfully signed up to DocChecker. You will now be redirected to the login screen.'
            );
            setModalActions(
                <Stack direction="row" sx={{ margin: 'auto' }}>
                    <Button variant="contained" onClick={navigateToLogin}>
                        Done
                    </Button>
                </Stack>
            );
            setShowModal(true);
        }
    }, [data, navigateToLogin]);

    useEffect(() => {
        if (error && Object.keys(error).length) {
            setModalTitle(error?.response?.data?.message || error?.message || GENERIC_ERROR);
            setModalActions(
                <Stack direction="row" sx={{ margin: 'auto' }}>
                    <Button variant="contained" onClick={closeModal}>
                        Close
                    </Button>
                </Stack>
            );
            setShowModal(true);
        }
    }, [error]);

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <div>
            <Box sx={{ height: '100vh' }}>
                <Grid container spacing={2}>
                    {/* Image Grid Item (Visible only on larger screens) */}
                    {!isSmallScreen && (
                        <Grid item xs={12} sm={6} className="parentDivFullHeight">
                            <img
                                src={image}
                                alt="landing_image"
                                style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: 'auto' }}
                            />
                        </Grid>
                    )}

                    {/* Form Grid Item */}
                    <Grid container direction="row" justifyContent="center" alignItems="flex-start" item xs={12} sm={6}>
                        <Stack direction="column" spacing={10} style={{ width: '100%', marginTop: '30px' }}>
                            <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                                <h1>Customer Sign Up</h1>
                                <p>Enter Login Details to Access DocChecker</p>
                            </Stack>
                            <Stack direction="column" justifyContent="center" alignItems="center">
                                <Container maxWidth="sm">
                                    <FormContainer defaultValues={userData} onSuccess={handlePostData}>
                                        <Stack spacing={3} alignItems="center">
                                            <TextFieldElement
                                                fullWidth
                                                name={'firstname'}
                                                label={'First Name'}
                                                className={'fullWidth'}
                                                type={'text'}
                                                onChange={handleChange}
                                                required
                                            />
                                            <TextFieldElement
                                                fullWidth
                                                name={'lastname'}
                                                label={'Last Name'}
                                                className={'fullWidth'}
                                                type={'text'}
                                                onChange={handleChange}
                                                required
                                            />
                                            <TextFieldElement
                                                fullWidth
                                                name={'emailId'}
                                                label={'Email Id'}
                                                className={'fullWidth'}
                                                type={'email'}
                                                onChange={handleChange}
                                                required
                                            />
                                            <TextFieldElement
                                                fullWidth
                                                name={'username'}
                                                label={'Username'}
                                                className={'fullWidth'}
                                                type={'text'}
                                                onChange={handleChange}
                                                required
                                            />
                                            <PasswordElement
                                                fullWidth
                                                className="fullWidth"
                                                label={'Password'}
                                                required
                                                name={'password'}
                                                onChange={handleChange}
                                            />
                                            <PasswordRepeatElement
                                                passwordFieldName={'password'}
                                                name={'confirmPassword'}
                                                label={'Confirm Password'}
                                                fullWidth className={'fullWidth'}
                                                onChange={handleChange}
                                                required />

                                            <Button variant="contained" fullWidth type={'submit'}>
                                                Sign Up
                                            </Button>
                                            <p>
                                                Already a member?{' '}
                                                <a href="#!" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
                                                    Login
                                                </a>
                                            </p>
                                        </Stack>
                                    </FormContainer>
                                </Container>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

            {showModal && (
                <BasicModal
                    openModal={openModal}
                    closeModal={closeModal}
                    showModal={showModal}
                    modalTitle={modalTitle}
                    modalActions={modalActions}
                />
            )}
        </div>
    );
};

export default SignUp;
