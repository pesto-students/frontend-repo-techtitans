import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import image from '../../images/landing_page_img.png'
import '../SignUpAs/SignUpAsPage.css'
import { Stack, Container, CircularProgress, Button, Typography } from '@mui/material';
import SignUpStepper from '../../components/SignUpStepper/SignUpStepper.Component'
import useAxios from '../../hooks/UseAxios.hook';
import { useNavigate } from 'react-router-dom';
import BasicModal from '../../components/Modal';
import Alert from '@mui/material/Alert';

const ExpertSignUp = () => {
    const [userData, setUserData] = useState({})
    const [profile, setProfileData] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = React.useState('')
    const [modalActions, setModalActions] = React.useState()
    const [industries, setIndustries] = React.useState([])
    const [domains, setDomains] = React.useState([])
    const [selectedDomains, setSelectedDomains] = useState([]);
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const { data, setBody, loading, error, setUrl, setMethod, url } = useAxios({
        url: '/industries',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        autoFetch: true
    });
    const navigate = useNavigate()

    const handleClose = () => {
        setShowModal(false)
    };

    const handlePostData = () => {
        setUrl('/auth/expert/signup')
        setMethod('POST')
        setBody({
            ...userData,
            profile: {
                ...profile,
                domainOfExpertise: selectedDomains,
                industry: selectedIndustries,
            }
        })

    };

    useEffect(() => {
        if (data && Object.keys(data).length && url === '/auth/expert/signup') {
            setShowModal(true)
            setModalTitle("Thank you for Signing up. Our team will get back to you shortly.")
            setModalActions((<>
                <Stack direction="row" sx={{ margin: 'auto' }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/login')}
                    >
                        Done
                    </Button>
                </Stack>
            </>))

        }
        if (data && url === '/industries') {
            setIndustries(data)
            setUrl('/domains')
            setMethod('GET')
        }

        if (data && url === '/domains') {
            setDomains(data)
        }
    }, [data])

    return (
        <div>
            <Box sx={{ height: '92vh', marginTop: "17px" }} >

                <Grid container spacing={2}>
                    <Grid item xs={6} className='parentDivFullHeight'>
                        <img src={image} alt='landing_image' />
                    </Grid>

                    <Grid container direction="row" justifyContent="center" alignItems="flex-start" item xs={6}>

                        <Stack direction="column" spacing={4} style={{ width: '100%', "marginTop": "30px" }}>
                            <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                                <h1 >Expert Sign Up</h1>
                                <p>Enter Login Details to Access DocChecker</p>
                            </Stack>
                            <Stack>
                                {error && <Alert severity="error">{error.message}</Alert>}
                            </Stack>
                            <Stack direction="column" justifyContent="center" alignItems="center">
                                <Container maxWidth="sm">
                                    {
                                        loading ? <CircularProgress color='secondary' size={24} /> :
                                            <SignUpStepper userData={userData} setUserData={setUserData} signUp={handlePostData}
                                                showModal={showModal} modalTitle={modalTitle} modalActions={modalActions}
                                                profile={profile} setProfileData={setProfileData}
                                                selectedDomains={selectedDomains} setSelectedDomains={setSelectedDomains}
                                                selectedIndustries={selectedIndustries} setSelectedIndustries={setSelectedIndustries}
                                                industries={industries} domains={domains}
                                            />
                                    }

                                </Container>
                                <Typography>Already a member?
                                    <Button
                                        variant="text"
                                        onClick={() => navigate('/login')}
                                    >
                                        Login
                                    </Button>

                                </Typography>
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
