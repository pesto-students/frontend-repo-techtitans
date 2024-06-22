import React from 'react'
import { Stack, Button, Container, Typography, TextField } from '@mui/material';

function ProvideEmail({ email, setEmail, handleSubmitEmail }) {
    return (
        <>
            <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                <Typography>
                    Enter your email Address
                </Typography>
                <TextField
                    id="filled-multiline-static"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    sx={{ width: '50%' }}
                    placeholder='example@gmail.com'
                    variant="outlined"
                />
                <Button variant="contained" onClick={handleSubmitEmail}>Submit</Button>
            </Stack>
        </>
    )
}

export default ProvideEmail