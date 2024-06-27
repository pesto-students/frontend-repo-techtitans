import React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';
import Alert from '@mui/material/Alert';

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

    const handleImageChange = (e) => {
        let file = e.target.files[0]
            if(!file.type.match('image/*')) {
                setTypeError(true)
                setSizeError(false)
            } else {
                setTypeError(false)
                const maxSizeInBytes = 2 * 1024 * 1024 ;
                if (e.target.files[0].size > maxSizeInBytes) {
                  setSizeError(true)
                } else {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        setSelectedImage(event.target.result);
                    };
                    reader.readAsDataURL(e.target.files[0]);
                    setSizeError(false)
                }
            }
    };

    return (
        <Box
            component="section"
            sx={{ width: '300px', padding: 5, overflowY: 'auto' }}
        >
            {sizeError && <Alert severity="error" sx={{mb: 2}}>File size exceeds 2 MB</Alert>}
            {typeError && <Alert severity="error">Invalid file type. Only Images are accepted.</Alert>}
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
        </Box>
    );
}

export default ChangeProfilePicture;
