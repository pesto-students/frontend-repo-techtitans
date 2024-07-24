import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import BasicTable from "../components/TableComponent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import BasicModal from "../components/Modal";
import { CircularProgress, Grid } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/UseAxios.hook";
import { DOCUMENT_TYPES, GENERIC_ERROR, REVIEW_STATUS } from "../Constants";
import { formatDate } from "../utils";
import { styled } from "@mui/material/styles";
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';

const CustLabel = styled(Typography)({
  flexBasis: "10%",
  flexGrow: 1,
  textAlign: "left",
  fontWeight: "bold",
  fontSize: "16px",
});

const Item = styled(Typography)({
  flexBasis: "50%",
  flexGrow: 1,
  textAlign: "left",
  fontSize: "16px",
});

const columns = [
  { colName: 'User Name', alignment: 'left' },
  { colName: 'Document Name', alignment: 'left' },
  { colName: 'Type Of Document', alignment: 'center' },
  { colName: 'Status', alignment: 'center' },
  { colName: 'Created Date', alignment: 'left' },
  { colName: '', alignment: 'center' }
];

function HomePage() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [modalContent, setModalContent] = React.useState();
  const [isIframe, setIsIframe] = React.useState(false);
  const { data, error, loading } = useAxios({
    url: "/user/reviews",
    autoFetch: true,
  });

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      let sortedRows = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRows(sortedRows);
    }
  }, [data]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent();
    setIsIframe(false);
  };

  const showDocumentDescription = (row) => {
    setModalTitle(row.description);
    setIsIframe(true);
    setModalContent(
      <Grid
        container
        xs={12}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          {row?.docType !== DOCUMENT_TYPES.PRD.shortHand && (
            <Stack direction="row" spacing={2}>
              <CustLabel>Experience: </CustLabel>
              <Item>{row.relevantExp}</Item>
            </Stack>
          )}
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} justifyContent="flex-start">
            <CustLabel>Reason: </CustLabel>
            <Item>{row.reasonForReview}</Item>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <iframe
            title={row.attachmentName}
            src={row.attachment}
            width="100%"
            height="700px"
            style={{ border: "none" }}
          />
        </Grid>
      </Grid>
    );
    openModal();
  };

  const loadPdfwithReview = (docId) => {
    navigate("/document-review", { state: { docId } });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows?.filter((row) =>
    row?.attachmentName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const populateRows = (page, rowsPerPage) => {
    return filteredRows?.length > 0 ? (
      filteredRows
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <TableRow key={row.docId}>
            <TableCell>
              {row.userDetails?.firstname + " " + row.userDetails?.lastname}
            </TableCell>
            <TableCell>
              <Link
                component="button"
                underline="none"
                onClick={() => showDocumentDescription(row)}
              >
                {row?.attachmentName}
              </Link>
            </TableCell>
            <TableCell align="center">
              <Chip label={row.docType === "Product Requirement Document" ? 'PRD' : row.docType} size="small" variant="outlined" /></TableCell>
            <TableCell align="center">
              {row.reviewStatus === REVIEW_STATUS.COMPLETED
                ? <Chip label="Reviewed" color="success" />
                : <Chip label="Pending" color="primary" />}
            </TableCell>
            <TableCell>{formatDate(row.createdAt)}</TableCell>
            <TableCell align="center">
              <Button
                variant="contained"
                size="small"
                onClick={() => loadPdfwithReview(row.docId)}
              >
                {row.reviewStatus === REVIEW_STATUS.COMPLETED
                  ? "View Feedback"
                  : "Review"}
              </Button>
            </TableCell>
          </TableRow>
        ))
    ) : (
      <TableRow>
        <TableCell colSpan={7}>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            {
              error ?
                <Alert severity="error">
                  {error?.response?.data?.message || error?.message || GENERIC_ERROR}
                </Alert> :
                <Alert severity="info">
                  No data to display.
                </Alert>
            }
          </Box>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <Typography variant="h4" ml={5} mt={2} mb={2} sx={{ fontWeight: "bold" }}>
        Dashboard
      </Typography>
      <Box m={5}>
        {loading ? (
          <Box display="flex" justifyContent="center" width="100%">
            <CircularProgress color="secondary" size={100} />
          </Box>
        ) : (
          <>
            <Box
              component="section"
              p={3}
              sx={{ border: "1px solid rgb(224, 224, 224)" }}
            >
              <Stack direction="row" justifyContent="space-between">
                <TextField
                  label="Search"
                  id="outlined-start-adornment"
                  size="small"
                  sx={{ width: "30ch" }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 0 24 24"
                          width="24px"
                          fill="#1976d2"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                      </InputAdornment>
                    ),
                    placeholder: 'Search By Document Name'
                  }}
                />
              </Stack>
            </Box>
            <BasicTable
              rows={filteredRows}
              columns={columns}
              populateRows={populateRows}
            />
          </>
        )}
      </Box>
      {showModal && (
        <BasicModal
          openModal={openModal}
          closeModal={closeModal}
          showModal={showModal}
          modalContent={modalContent}
          modalTitle={modalTitle}
          isIframe={isIframe}
          modalActions={
            <>
              <Stack direction="row" sx={{ margin: "auto" }}>
                <Button variant="contained" onClick={closeModal}>
                  Done
                </Button>
              </Stack>
            </>
          }
        />
      )}
    </>
  );
}

export default HomePage;
