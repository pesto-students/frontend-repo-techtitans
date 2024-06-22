import React, { useEffect, useState } from 'react';
import { Stack, Button, Stepper, Step, StepLabel, Typography, Box, MenuItem, Select, InputLabel, FormControl, Chip, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'

import useAxios from '../../hooks/UseAxios.hook'
import Alert from '@mui/material/Alert';



function SignUpStepper({ userData, setUserData, signUp,
    profile, setProfileData, selectedDomains,
    selectedIndustries, setSelectedDomains,
    setSelectedIndustries,
    domains, industries }) {
    const fileInputRef = React.useRef(null);
    const [activeStep, setActiveStep] = useState(0);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [docName, setDocName] = React.useState("")
    const steps = ['Login info', 'Personel Info'];

    const { data, error, loading, setBody, setHeaders } = useAxios({
        url: '/file/upload',
        method: 'POST',
        autoFetch: false
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const isPasswordMatch = (val) => {
        return userData.password === val;
    }

    useEffect(() => {
        setProfileData((prevUserData) => ({
            ...prevUserData,
            ...{ resume: data?.url },
        }))
    }, [data])

    const handleDomainChange = (event) => {
        setSelectedDomains(event.target.value);
        handleProfileChange(event);
    };

    const handleIndustryChange = (event) => {
        setSelectedIndustries(event.target.value);
        handleProfileChange(event);
    };

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === "confirmPassword") {
            setPasswordsMatch(isPasswordMatch(value))
        } else {
            if (name === "yearsOfExperience") {
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    ...{ "yearsOfExperience": parseInt(value) },
                }));
            }
            setUserData((prevUserData) => ({
                ...prevUserData,
                ...{ [name]: value },
            }));
        }


    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        setDocName(file.name)
        const form = new FormData();
        form.append('file', file)
        setHeaders({ 'Content-Type': 'multipart/form-data' })
        setBody(form)
    }

    const handleProfileChange = (e) => {
        let { name, value } = e.target;

        setProfileData((prevUserData) => ({
            ...prevUserData,
            ...{ [name]: value },
        }))
    }

    const validateForm = () => {
        if (profile.yearsOfExperience && profile.domainOfExpertise
            && profile.industry && profile.resume) {
            return false
        }
        else return true
    };

    const displayAlert = () => {
        if (error) {
            return (<Alert severity="error">{error.message}</Alert>)
        } else if (data && docName) {
            return (<Alert severity="success">{docName}</Alert>)
        } else {
            return (null)
        }
    }

    return (
        <div>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};

                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {activeStep === steps.length ? (
                <React.Fragment>
                    <div>
                        <p>Finish</p>
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                    {activeStep === 0 &&
                        <FormContainer
                            defaultValues={userData}
                            onSuccess={handleNext}
                        >
                            <Stack spacing={3} alignItems="center">
                                <TextFieldElement fullWidth label={"Firstname"} className={"fullWidth"} type={'text'} name={"firstname"} onChange={handleChange} required />
                                <TextFieldElement fullWidth label={"Lastname"} className={"fullWidth"} type={'text'} name={"lastname"} onChange={handleChange} required />
                                <TextFieldElement fullWidth label={"Email-Id"} className={"fullWidth"} type={'email'} name={"emailId"} onChange={handleChange} required />
                                <TextFieldElement fullWidth label={"Username"} className={"fullWidth"} type={'text'} name={"username"} onChange={handleChange} required />
                                <TextFieldElement fullWidth label={"Password"} className={"fullWidth"} type={'password'} name={"password"} onChange={handleChange} required />
                                <TextFieldElement fullWidth label={"Confirm Password"} id={"fullWidth"} type={'password'} name={"confirmPassword"} onChange={handleChange} required />
                                {passwordsMatch && <p>Passwords Match</p>}
                                <Button variant='contained' fullWidth type={'submit'}>Next </Button>
                                {/* <Button variant="contained" fullWidth={true}>Sign Up</Button> */}
                            </Stack>
                        </FormContainer>}

                    {activeStep === 1 &&
                        <FormContainer
                            defaultValues={userData}
                            onSuccess={signUp}
                        >
                            <Stack spacing={3} alignItems="center">
                                <div style={{ 'width': '100%' }}>
                                    <label id="profile-summary">Profile Summary</label>
                                    <textarea id="profile-summary" name="profileSummary" rows="6" style={{ 'width': '100%' }} onChange={handleProfileChange}></textarea>
                                </div>
                                <TextFieldElement fullWidth label={"Linked In Url"} id={"fullWidth"} type={'text'} name={"linkedInUrl"} onChange={handleProfileChange} placeholder='https://linkedin.com/....' />
                                <TextFieldElement fullWidth label={"Years of Experience"} id={"fullWidth"} type={'number'} name={"yearsOfExperience"} onChange={handleProfileChange} required />
                                <FormControl required fullWidth>
                                    <InputLabel id="domain-label">Domain</InputLabel>
                                    <Select
                                        labelId="domain-label"
                                        id="domainOfExpertise"
                                        name="domainOfExpertise"
                                        label="Domain"
                                        multiple
                                        value={selectedDomains}
                                        onChange={handleDomainChange}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        required
                                    >
                                        {domains?.map((domain) => (
                                            <MenuItem key={domain} value={domain}>
                                                {domain}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl required fullWidth>
                                    <InputLabel id="industry-label">Industry</InputLabel>
                                    <Select
                                        labelId="industry-label"
                                        id="industry"
                                        name="industry"
                                        label="Industry"
                                        multiple
                                        value={selectedIndustries}
                                        onChange={handleIndustryChange}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {industries?.map((industry) => (
                                            <MenuItem key={industry} value={industry}>
                                                {industry}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Stack direction="row" spacing={5} alignItems="center" justifyContent="flex-start" style={{ 'width': '100%' }}>
                                    <label id="profile-summary">Resume</label>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        {loading ? <CircularProgress color='secondary' size={24} /> : 'Upload file'}

                                    </Button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        accept="application/pdf"
                                        name="resume"
                                        onChange={handleFileUpload}
                                    />

                                    {displayAlert()}

                                </Stack>
                                <Button
                                    variant="contained"
                                    fullWidth={true}
                                    type={'submit'}
                                    disabled={validateForm()}
                                >
                                    Sign Up
                                </Button>
                            </Stack>
                        </FormContainer>}

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        {activeStep !== 0 && <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>}

                        <Box sx={{ flex: '1 1 auto' }} />
                    </Box>
                </React.Fragment>
            )}


        </div>
    )
};

export default SignUpStepper;