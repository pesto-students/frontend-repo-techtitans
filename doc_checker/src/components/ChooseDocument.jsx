import React from 'react'
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DOCUMENT_TYPES } from '../Constants'

function ChooseDocument({ docType, setDocType, documentCategories, clearDetails }) {
    const selectDocumentCategory = (doc) => {
        setDocType(doc)
        clearDetails()
    }


    const displayCategories = () => {
        let buttonChunk = []
        for(let i=0; i<documentCategories.length; i+=2) {
            buttonChunk.push(
                <Stack key={i} mt={5} spacing={3} direction="row">
                    <Button sx={{ width: '15vw', backgroundColor: docType === documentCategories[i] ? '#6FA5ED' : '#E4E6EA', color: docType === documentCategories[i] ? '#FFFFFF' : '#030303' }}
                            variant="contained"
                          onClick={() => (selectDocumentCategory(documentCategories[i]))}
                        >
                            {documentCategories[i]}
                    </Button>
                    { i+1 < documentCategories.length &&
                        <Button sx={{ width: '15vw', backgroundColor: docType === documentCategories[i+1] ? '#6FA5ED' : '#E4E6EA', color: docType === documentCategories[i+1] ? '#FFFFFF' : '#030303' }}
                            variant="contained"
                           onClick={() => (selectDocumentCategory(documentCategories[i+1]))}
                        >
                            {documentCategories[i+1]}
                        </Button>
                    }
                    
                </Stack>
            )
        }
        return buttonChunk
    }

    let buttons = displayCategories()
    return (
        <>
            <Typography variant="h6" mt={5} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Choose the type of document you want to upload
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {buttons.map(chunk => chunk)}
            </Box>
        </>
    )
}

export default ChooseDocument