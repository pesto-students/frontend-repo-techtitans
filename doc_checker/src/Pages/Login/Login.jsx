import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import image from '../../images/landing_page_img.png';
import Logo from '../../images/logo.png';
import '../SignUpAs/SignUpAsPage.css';
import { Stack, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FormContainer, TextFieldElement, PasswordElement } from 'react-hook-form-mui';
import useAxios from '../../hooks/UseAxios.hook';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slicer';
import BasicModal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';
import { GENERIC_ERROR, ROLES, EXPERT, ADMIN, CUSTOMER } from '../../Constants';
import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';

const Login = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalActions] = React.useState();
    const [modalTitle] = React.useState('');
    const { setMethod, setBody, data, error, loading } = useAxios({
        url: '/auth/login',
        headers: { 'Content-Type': 'application/json' },
        autoFetch: false,
    });

    const dispatch = useDispatch();

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handlePostData = () => {
        setMethod('POST');
        setBody({ username: userName, password: password });
    };

    const submitCustomer = () => {
        setMethod('POST');
        setBody({ username: CUSTOMER.userName, password: CUSTOMER.password });
    }

    const submitExpert = () => {
        setMethod('POST');
        setBody({ username: EXPERT.userName , password: EXPERT.password });
    }

    const submitAdmin = () => {
        setMethod('POST');
        setBody({ username: ADMIN.userName, password: ADMIN.password });
    }

    useEffect(() => {
        if (data && Object.keys(data).length) {
            sessionStorage.setItem('userInfo', JSON.stringify(data));
            dispatch(setUser(data));
            if (data.role === ROLES.CUSTOMER) {
                navigate('/customer-home');
            }
            if (data.role === ROLES.EXPERT) {
                navigate('/expert-home');
            }
            if (data.role === ROLES.ADMIN) {
                navigate('/admin-home');
            }
        }
    }, [data, dispatch, navigate]);

    return (
        <div>
            <Box>
                <Grid container spacing={2}>
                    {!isSmallScreen && (
                        <Grid item xs={6} className='parentDivFullHeight'>
                            <img src={image} alt='landing_image' />
                        </Grid>
                    )}

                    <Grid container direction="row" justifyContent="center" alignItems="center" item xs={12} md={6}>
                        <Stack direction="column" spacing={6} style={{ width: '100%' }}>
                            <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                                <img src={Logo} alt='DocChecker_Logo' />
                                <h1>DocChecker</h1>
                                <p>Login</p>
                                {error && (
                                    <Alert severity="error">
                                        {error?.response?.data === 'UNAUTHORIZED'
                                            ? 'Incorrect Username/Password. Please try again.'
                                            : error?.response?.data || GENERIC_ERROR}
                                    </Alert>
                                )}
                            </Stack>
                            {
                                loading ?
                                    <Box display="flex" justifyContent="center" width="100%">
                                        <CircularProgress color='secondary' size={100} />
                                    </Box>
                                    :
                                    <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                                        <Container maxWidth="sm">
                                            <FormContainer
                                                defaultValues={{ username: userName, password: password }}
                                                onSuccess={handlePostData}
                                            >
                                                <Stack spacing={3}>
                                                    <TextFieldElement
                                                        required
                                                        fullWidth
                                                        label="Username"
                                                        className="fullWidth"
                                                        type="text"
                                                        name="username"
                                                        onChange={(e) => setUserName(e.target.value)}
                                                    />
                                                    <PasswordElement
                                                        fullWidth
                                                        className="fullWidth"
                                                        label={'Password'}
                                                        required
                                                        name={'password'}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <Button variant="contained" type="submit">
                                                        Log In
                                                    </Button>

                                                    <Button variant="contained" onClick={submitCustomer}>
                                                        Demo Customer
                                                    </Button>
                                                    <Button variant="contained" onClick={submitExpert}>
                                                        Demo Expert
                                                    </Button>
                                                    <Button variant="contained" onClick={submitAdmin}>
                                                        Demo Admin
                                                    </Button>
                                                </Stack>
                                            </FormContainer>
                                        </Container>
                                        <Typography>
                                            Not a member?
                                            <Button variant="text" onClick={() => navigate('/signup-as')}>
                                                Sign up
                                            </Button>
                                        </Typography>
                                    </Stack>
                            }
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

export default Login;
