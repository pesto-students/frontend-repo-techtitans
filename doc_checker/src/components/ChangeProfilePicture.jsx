import React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    avatar: {
        width: '10vw',
        height: '10vw',
    },
    img: {
        width: '10vw',
        height: '10vw',
        borderRadius: '50%',
        objectFit: 'cover',
    },
}));

function ChangeProfilePicture({ setSelectedImage, selectedImage, user }) {
    const classes = useStyles();

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
                    <Box
                        component="img"
                        src={selectedImage}
                        alt={user?.firstname}
                        className={classes.img}
                    />
                ) : (
                    <Avatar className={classes.avatar}>
                        {user?.firstname?.charAt(0).toUpperCase()}
                    </Avatar>
                )}
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    type="file"
                    onChange={handleImageChange}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span" sx={{marginTop: '2vh'}}>
                        Change Profile Picture
                    </Button>
                </label>
            </Box>
        </Box>
    );
}

export default ChangeProfilePicture;
