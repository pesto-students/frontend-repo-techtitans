import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, TextField, Stack } from '@mui/material';

import { ROLES } from '../Constants'


function ChangeProfileSetting({user, setUrl, setBody, setMethod, selectedImage, data}) {
    const [firstName, setFirstName] = useState(user.firstname)
    const [lastName, setLastName] = useState(user.lastname)
    const [userName, setUserName] = useState(user.username)
    const [email, setEmail] = useState(user.emailId)
    const [emailError, setEmailError] = useState(false);

    useEffect(() => {
        setFirstName(user.firstname)
        setLastName(user?.lastname)
        setUserName(user?.username)
        setEmail(user.emailId)
    }, [user])
    

    const handleProfileSettingsUpdate = () => {
        if(user.role === ROLES.CUSTOMER) {
            setUrl('/updateCustomerProfile')
            setBody({
                "firstname": firstName,
                "lastname": lastName,
                "username": userName,
                "emailId": email,
                "image": selectedImage
              })
        }

        if(user.role === ROLES.EXPERT) {
            setUrl('/updateExpertProfile')
            setBody({
                "firstname": firstName,
                "lastname": lastName,
                "username": userName,
                "emailId": email,
                "image": selectedImage,
                "profile": user.profile
              })
        }
        
          setMethod('PUT')
    }

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!emailRegex.test(emailValue));
    };

    return (
        <>
            <Typography variant="h5">
                Profile Settings
            </Typography>
            <Stack spacing={3} mt={3}>
                <TextField
                    label="First Name" required
                    variant="outlined" type={'text'}
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <TextField
                    label="Last Name" required
                    variant="outlined" type={'text'}
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <TextField
                    label="Username" required
                    variant="outlined" type={'text'}
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
                <TextField
                    label="Email ID" required
                    variant="outlined" type="email"
                    value={email} onChange={handleEmailChange}
                    error={emailError}
                    helperText={emailError ? 'Invalid email format' : ''}
                />
                <Box display="inline-block">
                    <Button variant="contained"
                        onClick={handleProfileSettingsUpdate}
                        disabled={!firstName || !lastName || !userName || !email || emailError}>
                        Change Profile Settings
                    </Button>
                </Box>
            </Stack>
        </>
    )
}

export default ChangeProfileSetting