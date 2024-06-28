import React, { useEffect } from 'react'
import uploadPDFImg from '../images/uploadPDF_img.png'
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import { GENERIC_ERROR } from '../Constants';

function UploadPDF({ setDocument, document,
    setBody, setMethod,
    setUrl, data,
    setHeaders, user,
    loading, error, url,
    setSizeError, sizeError, typeError, setTypeError }) {
    const fileInputRef = React.useRef(null);
    

    useEffect(() => {
        if(data && document?.name) {
            setDocument({ name: document?.name, url: data?.url })
        }
        // eslint-disable-next-line
    }, [data])

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const maxSizeInBytes = 4 * 1024 * 1024 ;
        if (file.type !== 'application/pdf') {
            setTypeError(true)
            setSizeError(false)
        } else {
            setTypeError(false)
            if(file.size < maxSizeInBytes) {
                const form = new FormData();
                if (file) {
                    setSizeError(false)
                    setDocument({ "name": file.name })
                    form.append('file', file)
                    setUrl('/file/upload')
                    setMethod('POST')
                    setHeaders({ 'Content-Type': 'multipart/form-data', authorization: "Bearer " + user.accessToken })
                    setBody(form)
        
                }
            } else {
                setSizeError(true)
            }
        }
       
        
    };

    const displayAlert = () => {
        if(sizeError) {
            return (<Alert severity="error">File size exceeds 4 MB</Alert>)
        } else if(typeError) {
            return(<Alert severity="error">Invalid file type. Only PDF files are accepted.</Alert>)
        } else {
            if (error) {
                if (error.response?.data) {
                    return (<Alert severity="error">{error.response?.data}</Alert>)
                } else {
                    return (<Alert severity="error">{error.message || GENERIC_ERROR}</Alert>)
                }
            } else if (document?.name) {
                return (<Alert severity="success">{document?.name}</Alert>)
            } else {
                return (null)
            }
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