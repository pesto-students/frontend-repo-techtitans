import { Box, Typography } from '@mui/material'
import React from 'react'
import img from '../images/submit_pdf.png'

function SubmitPDF() {
  return (
    <>
        <Box mt={10} mb={10} sx={{ display: 'flex', justifyContent: 'center'}}>
            <img src={img}/>
        </Box>
        <Typography variant='h6' sx={{textAlign: 'center'}}>
            Thank you for submitting your document!
        </Typography>
        <Typography sx={{textAlign: 'center'}}>
            We are currently processing your submission and will notify you of the review outcome soon.
        </Typography>
    </>
  )
}

export default SubmitPDF