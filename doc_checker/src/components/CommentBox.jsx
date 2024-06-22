import * as React from 'react';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CommentBox({message, setMessage, addNote, cancel}) {

  return (
           
            <CardContent>
                <TextField 
                    sx={{ backgroundColor: '#FFFFFF', borderColor: '#CCCCCC', color: "#D3D3D3"}}
                    id="outlined-basic" 
                    label="Comment" 
                    variant="outlined"
                    onChange={(event) => {
                    setMessage(event.target.value)}}
                    fullWidth
                    multiline
                    />
                <CardActions>
                    <Stack spacing={2} direction="row" sx={{margin: 'auto', marginTop: '15px'}}>
                        <Button
                            variant="contained"
                            // sx={{backgroundColor: '#6FA5ED', fontWeight: 'bold', height: '36px', borderRadius: '18px'}}
                            onClick={addNote}
                            >
                                Comment
                            </Button>
                        <Button
                            variant="contained"
                            onClick={cancel}
                            >
                                Cancel
                            </Button>
                    </Stack>
                </CardActions>
                

            </CardContent>
  );
}