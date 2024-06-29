import React, { useState, useEffect } from "react";
import HighlightDocument from "../components/HighlightDocument";
import Typography from "@mui/material/Typography";
import ErrorBoundary from "../components/ErrorBoundary";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../hooks/UseAxios.hook";
import { CircularProgress, Button, Box, Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { ROLES } from "../Constants";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';
// eslint-disable-next-line
import { DisplayNotesSidebarOriginal } from "../components/DisplayNotesSidebarOriginal";

import Divider from "@mui/material/Divider";
function DocumentReview() {
  const navigate = useNavigate()
  const location = useLocation();
  const { docId, expertEmailId } = location.state || {};
  const [pdf, setPdf] = useState("");
  const { data, loading } = useAxios({
    url: `/review/${docId}`,
    autoFetch: true,
  });
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    setPdf(data?.attachment);
  }, [data, docId]);

  const handleContactExpert = () => {
    window.location.href = `mailto:${expertEmailId}?subject=Document Review: ${docId}&body=Hello,`;
  };

  const navigateToHome = () => {
    if (user.role === ROLES.CUSTOMER) {
      navigate('/customer-home');
    }
    if (user.role === ROLES.EXPERT) {
      navigate('/expert-home');
    }
  }

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Tooltip title="Go to Home" arrow>
                <Button
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                  onClick={navigateToHome}
                >
                </Button>
              </Tooltip>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Document Review
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
            >

              {user.role === ROLES.CUSTOMER &&
                data?.reviewStatus === "completed" && (
                  <Button variant="contained" onClick={handleContactExpert}>
                    Contact Expert
                  </Button>
                )}
            </Stack>
          </Grid>
          <Grid item xs={12} style={{ height: "84vh", padding: "0" }}>
            <Stack
              direction="column"
              spacing={2}
              divider={<Divider flexItem />}
              sx={{ height: "100%" }}
            >
              {loading ? (
                <Box display="flex" justifyContent="center" width="100%">
                  <CircularProgress color="secondary" size={200} />
                </Box>
              ) : (
                <ErrorBoundary>
                  {pdf && (
                    <HighlightDocument
                      fileUrl={pdf}
                      highlightData={data}
                      docId={docId}
                    />
                  )}
                </ErrorBoundary>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default DocumentReview;