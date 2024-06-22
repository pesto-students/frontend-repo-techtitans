import * as React from 'react';
import {  Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export default function AdminRejectionModal({ closeModal, showModal,

    fieldValue, setter,
confirmExpertStatus,
    rejectedUser, closeConfirmationModal }) {
    return (
        <Dialog open={showModal} onClose={closeModal} sx={{ textAlign: 'center' }}  maxWidth="md" >
            <DialogTitle>
            Are you sure you want to reject {rejectedUser?.row.fullname} as an Expert?
            </DialogTitle>
            
            <DialogContent>

                    <TextField fullWidth id="outlined-controlled"
                        variant="standard"
                        value={fieldValue}
                        onChange={(e) => setter(e.target.value)}
                        label="Reason for Rejection"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />

            </DialogContent>
            <DialogActions>
                    <Stack spacing={2} direction="row" sx={{ margin: 'auto' }}>
                        <Button
                            variant="contained"
                            onClick={() => confirmExpertStatus(rejectedUser?.row, rejectedUser?.status)}
                            disabled={rejectedUser?.status === "Reject" && !fieldValue}
                        >
                            Confirm
                        </Button>
                        <Button
                            variant="contained"
                            onClick={closeConfirmationModal}
                        >
                            Cancel
                        </Button>
                    </Stack>
            </DialogActions>
        </Dialog>

    );
}