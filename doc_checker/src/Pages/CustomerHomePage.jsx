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

import Grid from '@mui/material/Unstable_Grid2';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'; //Resume
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined'; //LOR
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'; //Essay
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined'; // PRD
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from "react-router-dom";
import useAxios from '../hooks/UseAxios.hook'
import { DOCUMENT_TYPES, REVIEW_STATUS } from '../Constants'


const columns = ['Id','Document Name',`Type Of Document`, 'Status', '']

function HomePage() {
    const [rows, setRows] = React.useState([])
    const [searchQuery, setSearchQuery] = React.useState('');
    const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false)
    const [modalTitle, setModalTitle] = React.useState('')
    const [allDocsTab, setAllDocsTab] = React.useState(true)
    const [completedTab, setCompleteTab] = React.useState(false)
    const [pendingTab, setPendingTab] = React.useState(false)
    const {data, error, loading,} = useAxios({
      url: '/user/reviews',
      autoFetch: true
    });

    const openModal = () => {
      setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }
    
    

    useEffect(() => {
      setRows(data)
    },[data])

    const showDocumentDescription = (row) => {
      setModalTitle(row.description)
      openModal()
    }

    const loadPdfwithReview = (docId, expertEmailId = null) => {
      navigate('/document-review', { state: { docId , expertEmailId} });
    }

    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      filteredRows()
    };

    const filteredRows = () => {
      const filteredData = data?.filter((row) => row.attachment_name.toLowerCase().includes(searchQuery.toLowerCase()))
      setRows(filteredData)
    }

    const filterCompletedDocs = () => {
        let filteredData = data.filter(row => row.reviewStatus === REVIEW_STATUS.COMPLETED)
        setAllDocsTab(false)
        setCompleteTab(true)
        setPendingTab(false)
        setRows([...filteredData])
    }

    const filterPendingDocs = () => {
        let filteredData = data.filter(row => row.reviewStatus === REVIEW_STATUS.INPROGRESS)
        setAllDocsTab(false)
        setCompleteTab(false)
        setPendingTab(true)
        setRows([...filteredData])
    }

    const showAllDocs = () => {
      setAllDocsTab(true)
      setCompleteTab(false)
      setPendingTab(false)
        setRows([...data])
    }

    const populateRows = (page, rowsPerPage) => {
        return (
          rows?.length > 0 ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow
                  key={row.docId}
                  sx={{  height: 80 }} 
                >
                  <TableCell >
                    {row.docId}
                  </TableCell>
                  <TableCell scope='row'>
                    <Grid container spacing={2}>
                      <Grid xs={2} pt={2}>
                        {row.docType === DOCUMENT_TYPES.RESUME.shortHand && <DescriptionOutlinedIcon fontSize='large'/>}
                        {row.docType === DOCUMENT_TYPES.COL_APP.shortHand && <AssignmentOutlinedIcon fontSize='large' />}
                        {row.docType === DOCUMENT_TYPES.LOR.shortHand && <DraftsOutlinedIcon fontSize='large' />}
                        {row.docType === DOCUMENT_TYPES.PRD.shortHand && <DocumentScannerOutlinedIcon fontSize='large' />}
                      </Grid>
                      <Grid xs={10}>
                        <Grid xs={12} mb={1} sx={{fontWeight: 'bold'}}>
                          <Button sx={{ textTransform: 'none' }} onClick={() => showDocumentDescription(row)}>
                            {row.attachmentName}
                          </Button>
                        </Grid>
                        <Grid xs={12}>{row.reviewStatus === REVIEW_STATUS.COMPLETED ? 'Reviewed by expert' : 'Pending for Review'}</Grid>
                      </Grid>
                    </Grid>  
                  
                  </TableCell>
                  <TableCell >{row.docType}</TableCell>
                  <TableCell >{row.reviewStatus === REVIEW_STATUS.COMPLETED ? 'Completed' : 'In Progress'}</TableCell>
                  <TableCell align='right'>
                    <Button 
                    variant="contained" 
                    sx={{width: '12vw'}}
                    onClick={() => loadPdfwithReview(row.docId, row.expertDetails?.emailId)}
                    >
                      {row.reviewStatus === REVIEW_STATUS.COMPLETED ? 'View Feedback' : 'View Document'}
                    </Button>
                  </TableCell>
                </TableRow>
              )) : 
              <TableRow>
                <TableCell colSpan={7}>
                  <Alert severity="error">{error?.response?.data || "No data to display."}</Alert>
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
            <Box component="section" sx={{border: '1px solid rgb(224, 224, 224)'}} p={3}>
                <Stack spacing={3} direction="row" >
                    <Button
                        variant="contained"
                        onClick={showAllDocs}
                        sx={{ bgcolor: !allDocsTab ? 'grey.500' : 'primary.main' }}
                        >
                            All Docs
                    </Button>
                    <Button
                        variant="contained"
                        onClick={filterCompletedDocs}
                        sx={{ bgcolor: !completedTab ? 'grey.500' : 'primary.main' }}
                        >
                            Completed Docs
                    </Button>
                    <Button
                        variant="contained"
                        onClick={filterPendingDocs}
                        sx={{ bgcolor: !pendingTab ? 'grey.500' : 'primary.main' }}
                        >
                            Pending for Review
                    </Button>
                </Stack>
            </Box>
            <Box component="section" p={3} sx={{border: '1px solid rgb(224, 224, 224)'}} >
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
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#1976d2"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                            </InputAdornment>,
                        }}
                        />
                    <Button
                        variant="contained"
                        onClick={() => navigate("/upload-document")}
                        startIcon={ <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>}
                        >
                           
                            Add New
                    </Button>
                </Stack>
            </Box>
            {
              loading ? <CircularProgress color='secondary' size={100} /> : 
              <BasicTable rows={rows} columns={columns} populateRows={populateRows}/>
            }
        </Box>
      </Box>
      {showModal && 
          <BasicModal openModal={openModal}
          closeModal={closeModal}
          showModal={showModal}
        
          modalTitle={modalTitle}
          modalActions={(<>
            <Stack direction="row" sx={{margin: 'auto'}}>
                <Button
                    variant="contained"
                    onClick={closeModal}
                    >
                        Done
                </Button>
            </Stack>
            </>)} 
          />
      } 
        
    </>
  )
}

export default HomePage