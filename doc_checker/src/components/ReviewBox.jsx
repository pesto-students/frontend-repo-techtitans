import * as React from 'react';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';



export default function ReviewBox({note}) {

  return (
            <CardContent>
                <Typography variant="body2" color="#000000" >
                {note.comment}
                </Typography>
            </CardContent>
  );
}