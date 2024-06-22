import React, { useEffect } from 'react'
import uploadPDFImg from '../images/uploadPDF_img.png'
import Box from '@mui/material/Box';
import { Typography, CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';

function UploadPDF({ setDocument, document,
    setBody, setMethod,
    setUrl, data,
    setHeaders, user,
    loading, error, url }) {
    const fileInputRef = React.useRef(null);


    useEffect(() => {
        setDocument({ ...document, ...data })
    }, [data])

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const form = new FormData();
        if (file) {
            setDocument({ "name": file.name })
            form.append('file', file)
            setUrl('/file/upload')
            setMethod('POST')
            setHeaders({ 'Content-Type': 'multipart/form-data', authorization: "Bearer " + user.accessToken })
            setBody(form)

        }
    };

    const displayAlert = () => {
        if (error) {
            if (error.response?.data) {
                return (<Alert severity="error">{error.response?.data}</Alert>)
            } else {
                return (<Alert severity="error">{error.message}</Alert>)
            }
        } else if (data && document?.name) {
            return (<Alert severity="success">{document?.name}</Alert>)
        } else {
            return (null)
        }
    }
    return (
        <>

            <Box mt={10} mb={5} >
                <Box mb={5} sx={{ display: 'flex', justifyContent: 'center', height: '20vh' }} >
                    {
                        loading && url === '/review' ? <CircularProgress color='secondary' size={100} /> :
                            <>
                                {loading ?
                                    <CircularProgress color='secondary' size={100} />
                                    :
                                    <img
                                        src={uploadPDFImg}
                                        alt={"Upload PDF"}
                                        onClick={handleImageClick}
                                        style={{ cursor: 'pointer' }}
                                    />
                                }
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                />
                            </>

                    }
                </Box>
                {displayAlert()}
            </Box>


        </>
    )
}

export default UploadPDF