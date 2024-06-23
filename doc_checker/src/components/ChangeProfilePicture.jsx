import React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';

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

function ChangeProfilePicture({ setSelectedImage, selectedImage, user }) {
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <Box
            component="section"
            sx={{ width: '300px', padding: 5, overflowY: 'auto' }}
        >
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
                    <Button variant="contained" component="span" sx={{ marginTop: '2vh' }}>
                        Change Profile Picture
                    </Button>
                </label>
            </Box>
        </Box>
    );
}

export default ChangeProfilePicture;
