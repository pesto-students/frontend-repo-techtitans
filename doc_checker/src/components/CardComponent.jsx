import * as React from 'react';

import Card from '@mui/material/Card';
import { CardActionArea} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ROLES, REVIEW_STATUS } from '../Constants';
import { styled } from '@mui/system';


const ProfileImage = styled('img')(({ theme }) => ({
    width: theme.spacing(4),
    height: theme.spacing(4),
    borderRadius: '50%',
  }));
export default function CardCompoent(props) {
    return (
        <Card sx={{ fontSize: '14px', margin: '10px', marginLeft: '0px', borderRadius: '18px', boxSizing: 'border-box', ...props.styling }}>
            <CardHeader
                    avatar={
                        props.img ?
                        <ProfileImage
                        src={props?.img}
                        alt={props?.name}
                      /> :
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="name">
                                {props?.name?.charAt(0)}
                            </Avatar>
                    }
                    action={
                        props.isReviewBox && props.user.role === ROLES.EXPERT  && props.reviewStatus !== REVIEW_STATUS.COMPLETED? 
                        <IconButton aria-label="delete" onClick={() => props.deleteComment(props.note.id)}>
                          <DeleteIcon sx={{color:'#9CA3AF' }}/>
                        </IconButton> :
                        null
                    }

                    title={
                        <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                            {props.name}
                        </Typography>
                    }
                    subheader={
                        <Typography sx={{ color: '#9CA3AF', textAlign: 'left' }}>
                            {props.note?.date || props?.getDate()}
                            
                        </Typography>
                    }
                />
            <CardActionArea
                {...(props.isReviewBox ? { onClick: () => { props.jumpToHighlightArea(props.note.highlightAreas[0]) } } : {})}
                sx={{ textAlign: 'left', padding: '10px' }}>
                
                {props.children}
            </CardActionArea>
            
        </Card>
    );
}