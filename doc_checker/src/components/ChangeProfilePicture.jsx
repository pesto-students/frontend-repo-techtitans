import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';
import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';
import useAxios from '../hooks/UseAxios.hook'
import { GENERIC_ERROR } from '../Constants';

const StyledAvatar = styled(Avatar)({
    width: '10vw',
    height: '10vw',
});

const StyledImage = styled('img')({
    width: '10vw',
    height: '10vw',
    borderRadius: '50%',
    objectFit: 'cover',
});

function ChangeProfilePicture({ setSelectedImage, selectedImage, user, sizeError, setSizeError, typeError, setTypeError }) {
    const { data, error, loading, setUrl, setBody, setHeaders, setMethod } = useAxios({
        autoFetch: false
    });

    useEffect(() => {
        if (data && Object.keys(data).length) {
            setSelectedImage(data?.url);
        }
        // eslint-disable-next-line
    }, [data])

    const handleImageChange = (e) => {
        let file = e.target.files[0]
        if (!file.type.match('image/*')) {
            setTypeError(true)
            setSizeError(false)
        } else {
            setTypeError(false)
            const maxSizeInBytes = 2 * 1024 * 1024;
            if (e.target.files[0].size > maxSizeInBytes) {
                setSizeError(true)
            } else {
                const form = new FormData();
                form.append('file', file);
                setUrl('/file/upload')
                setHeaders({ 'Content-Type': 'multipart/form-data' });
                setBody(form);
                setMethod('POST')
            }
        }
    };

    return (
        <Box
            component="section"
            sx={{ width: '300px', padding: 5, overflowY: 'auto' }}
        >
            {sizeError && <Alert severity="error" sx={{ mb: 2 }}>File size exceeds 2 MB</Alert>}
            {typeError && <Alert severity="error">Invalid file type. Only Images are accepted.</Alert>}
            {error && <Alert severity="error">{GENERIC_ERROR}</Alert>}
            {
                loading ?
                    <Box display="flex" justifyContent="center" width="100%" >
                        <CircularProgress color='secondary' size={100} />
                    </Box>
                    :

                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        height="100%"
                    >
                        {selectedImage ? (
                            <StyledImage
                                src={selectedImage}
                                alt={user?.firstname}
                            />
                        ) : (
                            <StyledAvatar>
                                {user?.firstname?.charAt(0).toUpperCase()}
                            </StyledAvatar>
                        )}
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            type="file"
                            onChange={handleImageChange}
                        />

                        <label htmlFor="contained-button-file">
                            <Button variant="text" component="span" sx={{ marginTop: '2vh' }}>
                                Change Profile Picture
                            </Button>
                        </label>
                        <Button variant="text" component="span" sx={{ marginTop: '2vh' }} onClick={() => setSelectedImage("")}>
                            Remove Profile Picture
                        </Button>
                    </Box>
            }
        </Box>
    );
}

export default ChangeProfilePicture;
