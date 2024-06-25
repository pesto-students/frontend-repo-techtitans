import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Stack, Container, CircularProgress, Button, Typography, useMediaQuery } from '@mui/material';
import SignUpStepper from '../../components/SignUpStepper/SignUpStepper.Component';
import useAxios from '../../hooks/UseAxios.hook';
import { useNavigate } from 'react-router-dom';
import BasicModal from '../../components/Modal';
import Alert from '@mui/material/Alert';
import image from '../../images/landing_page_img.png'

const ExpertSignUp = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [profile, setProfileData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalActions, setModalActions] = useState();
    const [industries, setIndustries] = useState([]);
    const [domains, setDomains] = useState([]);
    const [selectedDomains, setSelectedDomains] = useState([]);
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const { data, setBody, loading, error, setUrl, setMethod, url } = useAxios({
        url: '/industries',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        autoFetch: true
    });

    const handleClose = () => {
        setShowModal(false);
    };

    const handlePostData = () => {
        setUrl('/auth/expert/signup');
        setMethod('POST');
        setBody({
            ...userData,
            profile: {
                domainOfExpertise: selectedDomains,
                industry: selectedIndustries,
                linkedInUrl: profile.linkedInUrl,
                profileSummary: profile.profileSummary,
                resume: profile.resume,
                yearsOfExperience: profile.yearsOfExperience
            }
        });
    };

    useEffect(() => {
        if (data && Object.keys(data).length && url === '/auth/expert/signup') {
            setShowModal(true);
            setModalTitle("Thank you for Signing up. Our team will get back to you shortly.");
            setModalActions((
                <Stack direction="row" sx={{ margin: 'auto' }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/login')}
                    >
                        Done
                    </Button>
                </Stack>
            ));

        }
        if (data && url === '/industries') {
            setIndustries(data);
            setUrl('/domains');
            setMethod('GET');
        }

        if (data && url === '/domains') {
            setDomains(data);
        }
        // eslint-disable-next-line
    }, [data]);

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    return (
        <div>
            <Box sx={{ height: '100vh' }} >

                <Grid container spacing={2}>
                    {!isSmallScreen && (
                        <Grid item xs={6} className='parentDivFullHeight'>
                            <img src={image} alt='landing_image' />
                        </Grid>
                    )}
                    <Grid container direction="row" justifyContent="center" alignItems="flex-start" item xs={12} sm={6}>

                        <Stack direction="column" spacing={4} style={{ width: '100%', marginTop: '30px' }}>
                            <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                                <h1>Expert Sign Up</h1>
                                <p>Enter Login Details to Access DocChecker</p>
                            </Stack>
                            <Stack>
                                {error && <Alert severity="error">{error?.response?.data?.message|| error.message}</Alert>}
                            </Stack>
                            <Stack direction="column" justifyContent="center" alignItems="center">

                                {
                                    loading ? <CircularProgress color='secondary' size={100} /> :
                                        <>
                                            <Container maxWidth="sm">
                                                <SignUpStepper
                                                    userData={userData}
                                                    setUserData={setUserData}
                                                    signUp={handlePostData}
                                                    showModal={showModal}
                                                    modalTitle={modalTitle}
                                                    modalActions={modalActions}
                                                    profile={profile}
                                                    setProfileData={setProfileData}
                                                    selectedDomains={selectedDomains}
                                                    setSelectedDomains={setSelectedDomains}
                                                    selectedIndustries={selectedIndustries}
                                                    setSelectedIndustries={setSelectedIndustries}
                                                    industries={industries}
                                                    domains={domains}
                                                />
                                            </Container>
                                            <Typography>Already a member?
                                                <Button
                                                    variant="text"
                                                    onClick={() => navigate('/login')}
                                                >
                                                    Login
                                                </Button>

                                            </Typography>
                                        </>
                                }

                            </Stack>
                        </Stack>
                    </Grid>

                </Grid>
            </Box>
            {showModal &&
                <BasicModal
                    closeModal={handleClose}
                    showModal={showModal}
                    modalTitle={modalTitle}
                    modalActions={modalActions}
                />
            }

        </div>
    );
};

export default ExpertSignUp;
