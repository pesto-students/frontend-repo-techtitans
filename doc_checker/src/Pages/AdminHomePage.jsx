import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography';
import BasicTable from '../components/TableComponent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import BasicModal from '../components/Modal';
import { CircularProgress } from '@mui/material';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import useAxios from '../hooks/UseAxios.hook'
import { ACTIVATION_STATUS, GENERIC_ERROR } from '../Constants'
import AdminRejectionModal from '../components/AdminRejectionModal';


const columns = ['Expert Name', 'Profile Summary', `Linkedin URL`, 'Resume', 'Action', '']

function HomePage() {
    const [sortedData, setSortedData] = React.useState([])
    const [rows, setRows] = React.useState([])
    const [searchQuery, setSearchQuery] = React.useState('');
    const [showModal, setShowModal] = React.useState(false)
    const [modalTitle, setModalTitle] = React.useState('')
    const [modalContent, setModalContent] = React.useState()
    const [modalActions, setModalActions] = React.useState()
    const [allExpertsTab, setAllExpertsTab] = React.useState(true)
    const [approvedExpertsTab, setApprovedExpertsTab] = React.useState(false)
    const [pendingExpertsTab, setPendingExpertsTab] = React.useState(false)
    const [isIframe, setIsIframe] = React.useState(false)
    const [rejectionModal, setRejectionModal] = React.useState(false)
    const [rejectionReason, setRejectionReason] = React.useState("")
    const [rejectedUser, setRejectedUser] = React.useState({})
    const { data, error, loading, setUrl, setMethod, setBody, url } = useAxios({
        url: '/users',
        method: 'GET',
        autoFetch: true
    });
    const openRejectionModal = () => {
        setRejectionModal(true)
    }

    const closeRejectionModal = () => {
        setRejectionModal(false)
        setRejectionReason("")
    }

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setIsIframe(false)
        setShowModal(false)
    }


    useEffect(() => {
        if (url === '/users' && data && Object.keys(data).length > 0) {
            let sortedRows = data?.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            setRows([...sortedRows])
            setSortedData([...sortedRows])
        }
    }, [data, url])




    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        filteredRows(event.target.value)
    };

    const filteredRows = (searchParam) => {
        const filteredData = sortedData?.filter((row) => row.fullname.toLowerCase().includes(searchParam.toLowerCase()))
        setRows(filteredData)
    }

    const filterApprovedExperts = () => {
        let filteredData = sortedData?.filter(row => row.activationStatus?.status === ACTIVATION_STATUS.APPROVED)
        setAllExpertsTab(false)
        setApprovedExpertsTab(true)
        setPendingExpertsTab(false)
        setRows([...filteredData])
    }

    const filterPendingExperts = () => {
        let filteredData = sortedData?.filter(row => row.activationStatus?.status === ACTIVATION_STATUS.PENDING)
        setAllExpertsTab(false)
        setApprovedExpertsTab(false)
        setPendingExpertsTab(true)
        setRows([...filteredData])
    }

    const showAllExpert = () => {
        setAllExpertsTab(true)
        setApprovedExpertsTab(false)
        setPendingExpertsTab(false)
        setRows([...sortedData])
    }


    const displayProfileSummary = (row) => {
        setModalContent(<>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1">
                    <b>Experience:</b> {row.profile?.yearsOfExperience}
                </Typography>
            </Box>
            {
                row.profile?.linkedInUrl &&
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="subtitle1">
                        <b>LinkedIn URL:</b> <a href={row.profile?.linkedInUrl} target="_blank" rel="noopener noreferrer">{row.profile?.linkedInUrl}</a>
                    </Typography>
                </Box>
            }

            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1">
                    <b>Summary:</b> {row.profile?.profileSummary}
                </Typography>
            </Box>
        </>)
        setModalActions(<>
            <Stack direction="row" sx={{ margin: 'auto' }}>
                <Button
                    variant="contained"
                    onClick={closeModal}
                >
                    Done
                </Button>
            </Stack>
        </>)
        openModal()
    }

    const openLinkedIn = (linkedInUrl) => {
        window.open(linkedInUrl, '_blank');
    };

    const openResume = (resume) => {
        setIsIframe(true)
        setModalContent(<>
            <iframe
                title='resume'
                src={resume}
                width="100%"
                height="700px"
                style={{ border: 'none' }}
            />
        </>)
        setModalActions(<>
            <Stack direction="row" sx={{ margin: 'auto' }}>
                <Button
                    variant="contained"
                    onClick={closeModal}
                >
                    Done
                </Button>
            </Stack>
        </>)
        openModal()
    }

    const closeConfirmationModal = () => {
        setUrl('/users')
        setMethod('GET')
        setBody()


        setModalActions()
        setModalContent()
        setModalTitle()

        setAllExpertsTab(true)
        setApprovedExpertsTab(false)
        setPendingExpertsTab(false)

        closeModal()
        closeRejectionModal()
    }



    useEffect(() => {

        if (url.includes('/user/')) {
            if (loading) {
                setModalContent(<CircularProgress color='secondary' size={100} />)
            }
            if (error) {
                setModalContent(<Alert severity="error">{error?.message || GENERIC_ERROR}</Alert>)
                setModalActions(<Stack direction="row" sx={{ margin: 'auto' }}>
                    <Button
                        variant="contained"
                        onClick={closeConfirmationModal}
                    >
                        Done
                    </Button>
                </Stack>)
            } else if (data?.message) {
                setModalContent(<Alert severity="success">{data?.message}</Alert>)
                setModalActions(<Stack direction="row" sx={{ margin: 'auto' }}>
                    <Button
                        variant="contained"
                        onClick={closeConfirmationModal}
                    >
                        Done
                    </Button>
                </Stack>)
            }
            setModalTitle()

        }
        // eslint-disable-next-line
    }, [loading, error, data, url])

    const confirmExpertStatus = (row, status) => {
        closeRejectionModal()
        setUrl(`/user/${row.username}`)
        setMethod('PUT')

        if (status === "Approve") {
            setBody({
                "userId": row.profile?._id,
                "status": "approved",
            })
        } else {
            setBody({
                "userId": row.profile?._id,
                "status": "rejected",
                "message": rejectionReason
            })
            openModal()
        }
    }

    const decideExpertStatus = (row, status) => {
        if (status === "Approve") {
            setModalTitle(`Are you sure you want to approve ${row.fullname} as an Expert?`)
            setModalActions(<>
                <Stack spacing={2} direction="row" sx={{ margin: 'auto' }}>
                    <Button
                        variant="contained"
                        onClick={() => confirmExpertStatus(row, status)}
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
            </>)
            openModal()
        }
        if (status === "Reject") {

            setRejectedUser({
                row,
                status,

            })
            openRejectionModal()
        }

    }

    const populateRows = (page, rowsPerPage) => {
        return (
            rows?.length > 0 ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow
                    key={row.profile?._id}
                    sx={{ height: 80 }}
                >
                    <TableCell >
                        {row.fullname}
                    </TableCell>
                    <TableCell >
                        <Button variant='text' onClick={() => displayProfileSummary(row)}>
                            View Details
                        </Button>
                    </TableCell>
                    {
                        row.profile?.linkedInUrl ?
                            <TableCell >
                                <Button onClick={() => openLinkedIn(row.profile?.linkedInUrl)}>{row.username}</Button>
                            </TableCell> : <TableCell>NIL</TableCell>
                    }
                    <TableCell >
                        <Button onClick={() => openResume(row.profile?.resume)}>{row.username + '_resume'}</Button>
                    </TableCell>
                    {
                        row.activationStatus?.status === ACTIVATION_STATUS.PENDING ?
                            <>
                                <TableCell >
                                    <Button
                                        variant="contained"
                                        onClick={() => decideExpertStatus(row, "Approve")}
                                    >
                                        Approve
                                    </Button>
                                </TableCell>
                                <TableCell >
                                    <Button
                                        variant="contained"
                                        onClick={() => decideExpertStatus(row, "Reject")}
                                    >
                                        Reject
                                    </Button>
                                </TableCell>
                            </> :
                            <>
                                <TableCell sx={{ textTransform: 'capitalize' }}>
                                    {row.activationStatus?.status}
                                </TableCell>
                                <TableCell >

                                </TableCell>
                            </>
                    }
                </TableRow>
            )) :
                <TableRow>
                    <TableCell colSpan={7} >
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            {
                                error ?
                                    <Alert severity="error">
                                        {error?.response?.data || GENERIC_ERROR}
                                    </Alert> :
                                    <Alert severity="info">
                                        No data to display.
                                    </Alert>
                            }

                        </Box>
                    </TableCell>
                </TableRow>
        )
    }

    return (
        <>
            <Box>
                <Typography variant="h4" ml={5} mt={2} mb={2} sx={{ fontWeight: 'bold' }}>
                    Home
                </Typography>
                <Box m={5} >
                    <Box component="section" sx={{ border: '1px solid rgb(224, 224, 224)' }} p={3}>
                        <Stack spacing={3} direction="row" >
                            <Button
                                variant="contained"
                                onClick={showAllExpert}
                                sx={{ bgcolor: !allExpertsTab ? 'grey.500' : 'primary.main' }}
                            >
                                All Experts
                            </Button>
                            <Button
                                variant="contained"
                                onClick={filterApprovedExperts}
                                sx={{ bgcolor: !approvedExpertsTab ? 'grey.500' : 'primary.main' }}
                            >
                                Approved Expert
                            </Button>
                            <Button
                                variant="contained"
                                onClick={filterPendingExperts}
                                sx={{ bgcolor: !pendingExpertsTab ? 'grey.500' : 'primary.main' }}
                            >
                                Pending Expert
                            </Button>
                        </Stack>
                    </Box>
                    <Box component="section" p={3} sx={{ border: '1px solid rgb(224, 224, 224)' }} >
                        <Stack direction="row" justifyContent="space-between">
                            <TextField
                                label="Search"
                                id="outlined-start-adornment"
                                size='small'
                                sx={{ width: '25ch' }}
                                value={searchQuery}
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#1976d2"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                                    </InputAdornment>,
                                }}
                            />
                        </Stack>
                    </Box>
                    {
                        loading && url === '/users' ?
                            <Box display="flex" justifyContent="center" width="100%">
                                <CircularProgress color='secondary' size={100} />
                            </Box>
                            :
                            <BasicTable rows={rows} columns={columns} populateRows={populateRows} />
                    }
                </Box>
            </Box>
            {showModal &&
                <BasicModal openModal={openModal}
                    closeModal={closeModal}
                    showModal={showModal}
                    modalContent={modalContent}
                    modalTitle={modalTitle}
                    modalActions={modalActions}
                    isIframe={isIframe}
                />
            }

            {rejectionModal &&
                <AdminRejectionModal openModal={openRejectionModal}
                    closeModal={closeRejectionModal}
                    showModal={rejectionModal}
                    fieldValue={rejectionReason}
                    setter={setRejectionReason}
                    confirmExpertStatus={confirmExpertStatus}
                    rejectedUser={rejectedUser}
                    closeConfirmationModal={closeConfirmationModal}
                />
            }

        </>
    )
}

export default HomePage