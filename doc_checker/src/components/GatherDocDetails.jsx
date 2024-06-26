import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DOCUMENT_TYPES } from '../Constants'

function GatherDocDetails(props) {
    const handleExperience = (e) => {
        const value = e.target.value;
        if (value === '' || (value >= 0 && value <= 50)) {
            props.setYearsOfExperience(value);
        }
    }

    return (
        <Box mt={5}>
            {
                props?.docType !== DOCUMENT_TYPES.PRD.shortHand &&
                <Box component="section" sx={{ display: 'flex', alignItems: 'center' }}>

                    <Typography sx={{ width: '100%' }}>
                        {props?.questionsObj?.q1} <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField fullWidth id="outlined-controlled"
                        value={props.yearsOfExperience}
                        type='number'
                        onChange={e => handleExperience(e)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                height: 40,
                            },
                        }}
                        inputProps={{
                            min: 0,
                            max: 50,
                        }}
                    />
                </Box>
            }
            <Box component="section" sx={{ display: 'flex', alignItems: 'center' }} mt={3}>
                <Typography sx={{ width: '30%' }}>
                    {props?.questionsObj?.q2} <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField fullWidth id="outlined-controlled"
                    value={props.docName}
                    onChange={e => props.setDocName(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            height: 40,
                        },
                    }} />
            </Box>
            <Box component="section" mt={3}>
                <Typography mb={2}>
                    {props?.questionsObj?.q3} <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                    id="filled-multiline-static"
                    value={props.desc}
                    onChange={e => props.setDesc(e.target.value)}
                    fullWidth
                    multiline
                    rows={2}
                    variant="outlined"
                />
            </Box>
            <Box component="section" mt={3}>
                <Typography mb={2}>
                    {props?.questionsObj?.q4} <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                    id="filled-multiline-static"
                    value={props.extraInfo}
                    onChange={e => props.setExtraInfo(e.target.value)}
                    fullWidth
                    multiline
                    rows={2}
                    variant="outlined"
                />
            </Box>
        </Box>
    )
}

export default GatherDocDetails