import React, { useState, useEffect } from 'react'
import HighlightDocument from '../components/HighlightDocument'
import { Worker } from '@react-pdf-viewer/core';
import Typography from '@mui/material/Typography';
import ErrorBoundary from '../components/ErrorBoundary';
import { useLocation } from 'react-router-dom';
import useAxios from '../hooks/UseAxios.hook'
import { CircularProgress, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { ROLES } from '../Constants'
// eslint-disable-next-line
import { DisplayNotesSidebarOriginal } from '../components/DisplayNotesSidebarOriginal'

function DocumentReview() {
    const location = useLocation();
    const { docId, expertEmailId } = location.state || {};
    const [pdf, setPdf] = useState("")
    const { data, loading } = useAxios({
        url: `/review/${docId}`,
        autoFetch: true
    });
    const user = useSelector(state => state.user.user)

    useEffect(() => {
        setPdf(data?.attachment)
        localStorage.setItem([docId], JSON.stringify(data?.comments))
    }, [data, docId])


    const handleContactExpert = () => {
        window.location.href = `mailto:${expertEmailId}?subject=Document Review: ${docId}&body=Hello,`;
    };


    return (
        <>
            <Box display="flex" justifyContent="space-between" width="100%" alignItems="center" >
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Document Review
                </Typography>
                {user.role === ROLES.CUSTOMER
                    && data?.reviewStatus === "completed"
                    && <Button variant="contained" onClick={handleContactExpert}>Contact Expert</Button>}

            </Box>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                <div
                    style={{
                        height: '650px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                >
                    {
                        loading ?
                            <Box display="flex" justifyContent="center" width="100%">
                                <CircularProgress color='secondary' size={200} />
                            </Box>
                            :
                            <ErrorBoundary>
                                {pdf && <HighlightDocument fileUrl={pdf} highlightData={data} docId={docId}
                                />}
                            </ErrorBoundary>
                    }

                </div>

            </Worker>
        </>
    )
}

export default DocumentReview