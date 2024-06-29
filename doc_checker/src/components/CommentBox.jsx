import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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