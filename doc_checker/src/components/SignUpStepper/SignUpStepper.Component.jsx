import React, { useEffect, useState } from 'react';
import { Stack, Button, Stepper, Step, StepLabel, Typography, Box, MenuItem, Select, InputLabel, FormControl, Chip, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormContainer, TextFieldElement, PasswordElement, PasswordRepeatElement } from 'react-hook-form-mui'
import useAxios from '../../hooks/UseAxios.hook'
import Alert from '@mui/material/Alert';
import { GENERIC_ERROR } from '../../Constants';

function SignUpStepper({
    userData,
    setUserData,
    signUp,
    profile,
    setProfileData,
    selectedDomains,
    setSelectedDomains,
    domains
}) {
    const fileInputRef = React.useRef(null);
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Login info', 'Personal Info'];
    const [validationErrors, setValidationErrors] = useState({});
    const { data, error, loading, setBody, setHeaders } = useAxios({
        url: '/file/upload',
        method: 'POST',
        autoFetch: false
    });
    const [sizeError, setSizeError] = useState(false)
    const [typeError, setTypeError] = useState(false)

    useEffect(() => {
        if (data && Object.keys(data).length) {
            setProfileData((prevUserData) => ({
                ...prevUserData,
                ...{ resume: data?.url },
            }))
        }
    }
        // eslint-disable-next-line
        , [data])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name !== "confirmPassword") {
            setUserData((prevUserData) => ({
                ...prevUserData,
                ...{ [name]: value },
            }));
        }
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const maxSizeInBytes = 4 * 1024 * 1024;
        if (file.type !== 'application/pdf') {
            setTypeError(true);
            setSizeError(false)
        } else {
            setTypeError(false)
            if (file.size < maxSizeInBytes) {
                setSizeError(false)
                setProfileData((prevUserData) => ({
                    ...prevUserData,
                    ...{ docName: file.name },
                }))
                const form = new FormData();
                form.append('file', file);
                setHeaders({ 'Content-Type': 'multipart/form-data' });
                setBody(form);
            } else {
                setSizeError(true)
            }
        }


    }

    const handleProfileChange = (e) => {
        let { name, value } = e.target;

        if (name === "yearsOfExperience") {
            if (value < 0 || value > 50) {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "Years of experience must be between 0 and 50",
                }));
            } else {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: null,
                }));
            }
        }

        setProfileData((prevUserData) => ({
            ...prevUserData,
            ...{ [name]: value },
        }))
    }

    const handleDomainChange = (event) => {
        setSelectedDomains(event.target.value);
        handleProfileChange(event);
    };

    const validateForm = () => {
        if (profile.yearsOfExperience && profile.domainOfExpertise
         && profile.resume && !validationErrors.yearsOfExperience) {
            return false
        }
        else return true
    };

    const displayAlert = () => {
        if (error) {
            return (<Alert severity="error">{error.message || GENERIC_ERROR }</Alert>)
        } else if (profile?.docName) {
            return (<Alert severity="success">{profile?.docName}</Alert>)
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
                                <TextFieldElement fullWidth label={"First Name"} className={"fullWidth"} type={'text'} name={"firstname"} onChange={handleChange} required />
                                <TextFieldElement fullWidth label={"Last Name"} className={"fullWidth"} type={'text'} name={"lastname"} onChange={handleChange} required />
                                <TextFieldElement fullWidth label={"Email Id"} className={"fullWidth"} type={'email'} name={"emailId"} onChange={handleChange} required />
                                <TextFieldElement fullWidth label={"Username"} className={"fullWidth"} type={'text'} name={"username"} onChange={handleChange} required />
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
                                <Button variant='contained' fullWidth type={'submit'}>Next </Button>
                            </Stack>
                        </FormContainer>}

                    {activeStep === 1 &&
                        <FormContainer
                            defaultValues={{ ...userData, ...profile }}
                            onSuccess={signUp}
                        >
                            <Stack spacing={3} alignItems="center">
                                <div style={{ 'width': '100%' }}>
                                    <label id="profile-summary">Profile Summary</label>
                                    <textarea
                                        id="profile-summary"
                                        name="profileSummary"
                                        rows="6"
                                        defaultValue={profile.profileSummary}
                                        style={{ 'width': '100%' }} onChange={handleProfileChange}></textarea>
                                </div>
                                <TextFieldElement fullWidth label={"Linked In Url"} id={"fullWidth"} type={'text'} name={"linkedInUrl"} onChange={handleProfileChange} placeholder='https://linkedin.com/....' />
                                <TextFieldElement
                                    fullWidth label={"Years of Experience"}
                                    id={"fullWidth"} type={'number'}
                                    name={"yearsOfExperience"}
                                    onChange={handleProfileChange}
                                    inputProps={{ min: 0, max: 50 }} required
                                    error={!!validationErrors.yearsOfExperience}
                                    helperText={<span style={{ color: "red" }}>{validationErrors.yearsOfExperience}</span>} />

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

                                <Stack direction="row" spacing={5} alignItems="center" justifyContent="flex-start" style={{ 'width': '100%' }}>
                                    <label id="resume">Resume <span style={{ color: 'red' }}>*</span></label>
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
                                    {sizeError && <Alert severity="error">File size exceeds 4 MB</Alert>}
                                    {typeError && <Alert severity="error">Invalid file type. Only PDF files are accepted.</Alert>}

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

