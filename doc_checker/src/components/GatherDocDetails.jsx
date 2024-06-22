import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function GatherDocDetails(props) {
    return (
        <Box mt={5}>
            <Box component="section" sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ width: '100%' }}>
                    {props?.questionsObj?.q1} <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField fullWidth id="outlined-controlled"
                    value={props.yearsOfExperience}
                    type='number'
                    onChange={(e) => props.setYearsOfExperience(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            height: 40,
                        },
                    }}
                    />
            </Box>
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