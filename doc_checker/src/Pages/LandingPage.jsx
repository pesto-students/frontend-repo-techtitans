import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import logo from '../images/logo.png';  
import homeImage from '../images/landing_page_img.png';  
import featuresImage from '../images/features.svg';  
import aboutImage from '../images/aboutus.png'; 
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#EFF0FB', // Customize primary color
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  spacing: 8, // Default spacing value
});

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    //background: 'linear-gradient(to bottom, #8E2DE2, #4A00E0)', // Customize gradient colors
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    backgroundColor: '#EFF0FB',
    boxShadow: 'none',
    marginBottom: theme.spacing(4),
  },
  logo: {
    height: '40px', // Adjust the height of the logo as needed
    marginRight: theme.spacing(2),
  },
  logoText: {
    flexGrow: 1,
    fontSize: '48px !important',
    fontWeight: 'bold !important'
  },
  homeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    padding: theme.spacing(4),
    minHeight: '400px',
  },
  homeText: {
    padding: theme.spacing(4),
  },
  homeImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '500px', // Adjust max height as needed
    objectFit: 'cover',
  },
  featuresSection: {
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  featureItem: {
    padding: theme.spacing(2),
  },
  featuresImage: {
    height: 'auto',
    maxHeight: '300px', // Adjust max height as needed
    objectFit: 'cover',
    marginBottom: theme.spacing(2),
  },
  aboutSection: {
    padding: theme.spacing(4),
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  aboutImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '300px', // Adjust max height as needed
    objectFit: 'cover',
    marginBottom: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(2)
  },
  tabs:{
    fontWeight: 'bold !important' , 
    fontSize: '24px !important'
  }
});


function LandingPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const homeRef = useRef()
  const featureRef = useRef()
  const aboutRef = useRef()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <img src={logo} alt="DocChecker Logo" className={classes.logo} />
            <Typography variant="h6" className={classes.logoText}>
              DocChecker
            </Typography>
            <Button 
              color="inherit" 
              className='tabs'
              onClick={() => {
                homeRef.current?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}
              >
                Home
              </Button>
            <Button 
              color="inherit" 
              className='tabs'
              onClick={() => {
                featureRef.current?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}
              >
                Features
            </Button>
            <Button 
              color="inherit" 
              className='tabs'
              onClick={() => {
                aboutRef.current?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}
              >
                About us
              </Button>
          </Toolbar>
        </AppBar>
        <Container className={classes.homeContainer} ref={homeRef}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} >
              <img src={homeImage} alt="home" className={classes.homeImage} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className={classes.homeText}>
                <Typography variant="body1" gutterBottom>
                  Your go-to platform for comprehensive document reviews.
                  Whether you're a student crafting the perfect college application essay, a professional fine-tuning your resume, or a product manager refining your requirements document, we've got you covered.
                </Typography>
                <Box className={classes.buttons}>
                  <Button 
                    variant="contained" 
                    aria-label="Login" 
                    style={{ marginRight: 8, background: '#6FA5ED' , color:'#fff'}}
                    onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button 
                    variant="contained" 
                    aria-label="Sign Up" 
                    style={{ marginRight: 8, background: '#6FA5ED' , color:'#fff'}}
                    onClick={() => navigate("/signup-as")}
                    >
                    Sign Up
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Box className={classes.featuresSection} ref={featureRef}>
          <Typography variant="h2" gutterBottom style={{ fontWeight: 'bold' }}>
            Features
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} className={classes.featureItem}>
              <Typography variant="h6">Expert Reviews</Typography>
              <Typography variant="body1">Expert Reviews: Receive detailed feedback from experienced reviewers who specialize in various document types, ensuring that your work meets the highest standards.</Typography>
            </Grid>

            <Grid item xs={12} md={4} className={classes.featureItem}>
              <img src={featuresImage} alt="Features" className={classes.featuresImage} />
            </Grid>

            <Grid item xs={12} md={4} className={classes.featureItem}>
              <Typography variant="h6">Secure Platform</Typography>
              <Typography variant="body1">Secure Platform: Rest assured that your documents are safe and secure on our platform, with strict privacy measures in place to protect your sensitive information.</Typography>
            </Grid>
            <Grid item xs={12} md={4} className={classes.featureItem}>
              <Typography variant="h6">Customized Recommendations</Typography>
              <Typography variant="body1">Customized Recommendations: Get personalized suggestions for improving your documents, tailored to your unique goals and requirements.</Typography>
            </Grid>
            <Grid item xs={12} md={4} className={classes.featureItem}>
              <Typography variant="h6">Fast Turnaround</Typography>
              <Typography variant="body1">Fast Turnaround: Enjoy quick turnaround times on your document reviews, so you can make necessary revisions and submit your applications or documents with confidence.</Typography>
            </Grid>
            <Grid item xs={12} md={4} className={classes.featureItem}>
              <Typography variant="h6">User-Friendly Interface</Typography>
              <Typography variant="body1">User-Friendly Interface: Navigate our intuitive platform with ease, making it simple to submit documents and track reviews</Typography>
            </Grid>
          </Grid>
        </Box>


        <Container className={classes.aboutSection} ref={aboutRef}>
          <Typography variant="h2" gutterBottom style={{ fontWeight: 'bold' }}>
            About us
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box className={classes.homeText}>
                <Typography variant="body1" gutterBottom>
                At DocChecker, we're passionate about helping individuals achieve their goals through impactful document reviews. Our team of seasoned professionals brings years of experience in various industries, including education, business, and technology. We understand the importance of a well-crafted document in making a lasting impression, and we're dedicated to providing you with the tools and support you need to succeed. Trust us to elevate your documents to the next level.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src={aboutImage} alt="About us" className={classes.aboutImage} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default LandingPage;
