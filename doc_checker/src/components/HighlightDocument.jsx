import React, { useEffect } from 'react'
import { Viewer, Tooltip, Position } from '@react-pdf-viewer/core';
import {
    highlightPlugin,
    //HighlightArea,
} from '@react-pdf-viewer/highlight';
import ReviewBox from './ReviewBox';
import CardComponent from './CardComponent';
import CommentBox from './CommentBox';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import BasicModal from './Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { ROLES, REVIEW_STATUS } from '../Constants'
import useAxios from '../hooks/UseAxios.hook'

import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HighlightDocument({ fileUrl, highlightData, docId,}) {
    const [message, setMessage] = React.useState('');
    const [notes, setNotes] = React.useState(JSON.parse(localStorage.getItem([docId])) ?? []);
    let noteId = notes[notes.length - 1]?.id || 0;
    const [showModal, setShowModal] = React.useState(false)
    const [modalTitle, setModalTitle] = React.useState('')
    const [modalActions, setModalActions] = React.useState()
    const user = useSelector(state => state.user.user)
    const { data, error, loading, setBody, url, setUrl } = useAxios({
        method: 'PUT',
        autoFetch: false
    });
    const navigate = useNavigate()


    const noteEles = new Map();

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const navigateToHome = () => {
        closeModal()
        navigate('/expert-home')
    }


    useEffect(() => {
        if (url === '/review/submit') {
            if (loading) {
                setModalActions()
                setModalTitle(<CircularProgress color='secondary' size={100} />)
            }
            if (error) {
                console.log(error)
                setModalTitle(<Alert severity="error">{error?.response?.data?.message}</Alert>)
                setModalActions(<Stack direction="row" sx={{ margin: 'auto' }}>
                    <Button
                        variant="contained"
                        onClick={closeModal}
                    >
                        Close
                    </Button>
                </Stack>)
            } else if (data) {
                setModalTitle(`Your review for ${highlightData?.attachmentName} has been submitted successfully!!!`)
                setModalActions(
                    <Stack direction="row" sx={{ margin: 'auto' }}>
                        <Button
                            variant="contained"
                            onClick={navigateToHome}
                        >
                            Done
                        </Button>
                    </Stack>
                )
            }

            openModal()

        }

    }, [loading, error])

    const confirmReviewSubmission = () => {
        localStorage.setItem([docId], JSON.stringify(notes))

        setBody({
            "docId": docId,
            "comments": notes
          })
          setUrl('/review/submit')
    }



    const renderHighlightTarget = (props) => (
        <div
            style={{
                background: '#eee',
                display: 'flex',
                position: 'absolute',
                left: `${props.selectionRegion.left}%`,
                top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                transform: 'translate(0, 8px)',
                zIndex: 1,
            }}
        >
            <Tooltip
                position={Position.TopCenter}
                target={
                    <IconButton aria-label="add comment" onClick={props.toggle} >
                        <                           svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#1976d2"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4zm-2 13.17L18.83 16H4V4h16v13.17zM13 5h-2v4H7v2h4v4h2v-4h4V9h-4z" /></svg>
                    </IconButton>
                }
                content={() => <div style={{ width: '100px' }}>Add a note</div>}
                offset={{ left: 0, top: -8 }}
            />
        </div>
    );

    const getDate = () => {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return today.toLocaleDateString('en-US', options);
    }

    const renderHighlightContent = (props) => {
        const styling = {
            position: 'absolute',
           // left: `${props.selectionRegion.left}%`,
             left: '50%',
            top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
            zIndex: 1,
            width: '25vw'
        }
        const addNote = () => {
            if (message !== '') {
                const note = {
                    id: ++noteId,
                    comment: message,
                    highlightAreas: props.highlightAreas,
                    quote: "abc"
                };
                setNotes(notes.concat([note]));
                localStorage.setItem([docId], JSON.stringify(notes))
               //setIsSubmitReviewClicked(false)
                props.cancel();
            }
        };

        return (
            <CardComponent
                name={highlightData.reviewerUsername} //change to first name and last name
                img={user?.image}
                styling={styling}
                getDate={getDate}
            >
                <CommentBox
                    message={message}
                    setMessage={setMessage}
                    addNote={addNote}
                    cancel={props.cancel}
                />
            </CardComponent>
        );
    };

    const jumpToNote = (note) => {
        if (noteEles.has(note.id)) {
            noteEles.get(note.id).scrollIntoView();
        }
    };


    const renderHighlights = (props) => (
        <div>
            {notes.map((note) => (
                <React.Fragment key={note.id}>
                    {note.highlightAreas
                        .filter((area) => area.pageIndex === props.pageIndex)
                        .map((area, idx) => (
                            <div
                                key={idx}
                                style={Object.assign(
                                    {},
                                    {
                                        background: 'yellow',
                                        opacity: 0.4,
                                    },
                                    props.getCssProperties(area, props.rotation)
                                )}
                                onClick={() => jumpToNote(note)}
                                ref={(ref) => {
                                    noteEles.set(note.id, ref);
                                }}
                            />
                        ))}
                </React.Fragment>
            ))}
        </div>
    );

    const onSubmitReview = () => {
        setModalTitle('Are you sure you want to submit the review?')
        setModalActions(<>
            <Stack spacing={2} direction="row" sx={{ margin: 'auto' }}>
                <Button
                    variant="contained"
                    onClick={confirmReviewSubmission}
                >
                    Confirm
                </Button>
                <Button
                    variant="contained"
                    onClick={closeModal}
                >
                    Cancel
                </Button>
            </Stack>
        </>);
        openModal()
    }

    const deleteComment = (commentId) => {
        let modifiedNotes = notes.filter(note => note.id !== commentId)
        setNotes([...modifiedNotes])
        localStorage.setItem([docId], JSON.stringify(modifiedNotes))
    }



    let highlightPluginInstance = highlightPlugin({})

    if (user.role === ROLES.CUSTOMER) {
        highlightPluginInstance = highlightPlugin({
            renderHighlights,
        });
    }
    if (user.role === ROLES.EXPERT) {
        highlightPluginInstance = highlightPlugin({
            renderHighlightTarget,
            renderHighlightContent,
            renderHighlights,
        });
    }

    const { jumpToHighlightArea } = highlightPluginInstance;


    return (
        <React.Fragment>
            <div
                style={{
                    // border: '1px solid rgba(0, 0, 0, 0.3)',
                    borderTop: '0px',
                    display: 'flex',
                    height: '100%',
                    overflow: 'hidden'
                }}
            >
                <div
                    style={{
                        flex: '1 1 0',
                        overflow: 'auto',
                    }}
                >
                    <Typography variant="h5" ml={7} mt={2} mb={2} sx={{ fontWeight: 'bold' }}>
                        {highlightData?.attachmentName}
                    </Typography>
                    <Viewer fileUrl={fileUrl} plugins={[highlightPluginInstance]} />
                </div>
                <div
                    style={{
                        // borderRight: '1px solid rgba(0, 0, 0, 0.3)',
                        width: '25%',
                        overflow: 'auto',
                    }}
                >
                    
                    {
                        notes.length === 0 ?
                            <h3 style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '30vh' }}>
                                <mark>Pending Review</mark>
                            </h3>
                            :
                            <>
                                <Typography variant="h5" ml={5} mt={2} mb={2} sx={{ fontWeight: 'bold' }} >
                                    Reviews
                                </Typography>

                                {notes.map((note) => {
                                    return (
                                        <CardComponent
                                            key={note.id}
                                            note={note}
                                            name={highlightData.reviewerUsername} //change to first name and last name
                                            jumpToHighlightArea={jumpToHighlightArea}
                                            img={user.role === ROLES.EXPERT ? user?.image : ""}
                                            styling={{ maxWidth: 345 }}
                                            isReviewBox={true}
                                            user={user}
                                            deleteComment={deleteComment}
                                            getDate={getDate}
                                            reviewStatus={highlightData?.reviewStatus}
                                        >
                                            <ReviewBox note={note} />
                                        </CardComponent>

                                    )
                                })}
                            </>
                    }

                </div>

            </div>
            {
                user.role === ROLES.EXPERT ?
                    <>
                        <Button
                            variant="contained"
                            sx={{ height: '36px', width: '40vw', left: '30vw' }}
                            onClick={onSubmitReview}
                            disabled={notes.length === 0 || highlightData?.reviewStatus === REVIEW_STATUS.COMPLETED}
                        >
                            Submit Review
                        </Button>
                        {showModal &&
                            <BasicModal openModal={openModal}
                                closeModal={closeModal}
                                showModal={showModal}
                                confirmReviewSubmission={confirmReviewSubmission}
                                modalTitle={modalTitle}
                                modalActions={modalActions} />
                        }
                    </> :
                    <></>
            }

        </React.Fragment>



    )
}

export default HighlightDocument