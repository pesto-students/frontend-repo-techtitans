import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Img from '../images/sample_photo.png';
import { Button, TextField, Stack } from '@mui/material';

function ChangeLoginSetting() {
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [passError, setPassError] = useState(false)

    const handleLoginSettings = () => {
        console.log("Login Settings")
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPass(value);
        setPassError(newPass !== value);
    }

    return (
        <>
            <Typography variant="h5">
                Login Settings
            </Typography>

            <Stack spacing={3} mt={3}>
                <TextField
                    required
                    label="Old Password"
                    variant="outlined" type="password"
                    value={oldPass}
                    onChange={e => setOldPass(e.target.value)}
                />
                <Box display="flex" gap={2}>
                    <TextField
                        required
                        label="New Password"
                        variant="outlined" type="password"
                        fullWidth
                        value={newPass}
                        onChange={e => setNewPass(e.target.value)}
                    />
                    <TextField
                        label="Confirm Password"
                        variant="outlined" type="password"
                        fullWidth
                        error={passError}
                        value={confirmPass}
                        onChange={handlePasswordChange}
                        helperText={passError ? 'Password does not match' : ''}
                    />
                </Box>
                <Box display="inline-block">
                    <Button 
                    variant="contained"
                    onClick={handleLoginSettings}
                    disabled={!oldPass || !newPass || !confirmPass || passError}
                    >
                        Change Password
                    </Button>
                </Box>
            </Stack>
        </>
    )
}

export default ChangeLoginSetting