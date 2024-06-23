import React, { useRef } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import logo from '../images/logo.png';  
import homeImage from '../images/landing_page_img.png';  
import featuresImage from '../images/features.svg';  
import aboutImage from '../images/aboutus.png'; 
import { useNavigate } from "react-router-dom";

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

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // Ensure the root container takes up the full viewport height
});

const CustomAppBar = styled(AppBar)({
  backgroundColor: '#EFF0FB',
  boxShadow: 'none',
  marginBottom: theme.spacing(4),
});

const Logo = styled('img')({
  height: '40px', // Adjust the height of the logo as needed
  marginRight: theme.spacing(2),
});

const LogoText = styled(Typography)({
  flexGrow: 1,
  fontSize: '32px !important', // Decreased font size
  fontWeight: 'bold !important',
});

const HomeContainer = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'left',
  padding: theme.spacing(4),
  minHeight: '100vh', // Ensure home section takes up full viewport height
});

const HomeText = styled(Box)({
  padding: theme.spacing(4),
});

const HomeImage = styled('img')({
  width: '100%',
  height: 'auto',
  maxHeight: '500px', // Adjust max height as needed
  objectFit: 'cover',
});

const FeaturesSection = styled(Box)({
  padding: theme.spacing(4),
  backgroundColor: '#f5f5f5',
  textAlign: 'center',
  minHeight: '100vh', // Ensure features section takes up full viewport height
});

const FeatureItem = styled(Box)({
  padding: theme.spacing(2),
});

const FeaturesImage = styled('img')({
  height: 'auto',
  maxHeight: '300px', // Adjust max height as needed
  objectFit: 'cover',
  marginBottom: theme.spacing(2),
});

const AboutSection = styled(Container)({
  padding: theme.spacing(4),
  backgroundColor: '#fff',
  textAlign: 'center',
  minHeight: '100vh', // Ensure about section takes up full viewport height
});

const AboutImage = styled('img')({
  width: '100%',
  height: 'auto',
  maxHeight: '300px', // Adjust max height as needed
  objectFit: 'cover',
  marginBottom: theme.spacing(2),
});

const Buttons = styled(Box)({
  marginTop: theme.spacing(2),
});

const Tabs = styled(Button)({
  fontWeight: 'bold !important',
  fontSize: '16px !important', // Decreased font size
  marginLeft: theme.spacing(2),
});

function LandingPage() {
  const navigate = useNavigate();
  const homeRef = useRef();
  const featureRef = useRef();
  const aboutRef = useRef();

  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80, // Adjusted for the height of the AppBar
        behavior: 'smooth',
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Root>
        <CustomAppBar position="fixed">
          <Toolbar>
            <Logo src={logo} alt="DocChecker Logo" />
            <LogoText variant="h6">
              DocChecker
            </LogoText>
            <Tabs 
              color="inherit"
              onClick={() => scrollToRef(homeRef)}
            >
              Home
            </Tabs>
            <Tabs 
              color="inherit"
              onClick={() => scrollToRef(featureRef)}
            >
              Features
            </Tabs>
            <Tabs 
              color="inherit"
              onClick={() => scrollToRef(aboutRef)}
            >
              About us
            </Tabs>
          </Toolbar>
        </CustomAppBar>
        <HomeContainer ref={homeRef}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <HomeImage src={homeImage} alt="home" />
            </Grid>
            <Grid item xs={12} md={6}>
              <HomeText>
                <Typography variant="body1" gutterBottom>
                  Your go-to platform for comprehensive document reviews.
                  Whether you're a student crafting the perfect college application essay, a professional fine-tuning your resume, or a product manager refining your requirements document, we've got you covered.
                </Typography>
                <Buttons>
                  <Button 
                    variant="contained" 
                    aria-label="Login" 
                    style={{ marginRight: 8, background: '#6FA5ED', color: '#fff' }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="contained" 
                    aria-label="Sign Up" 
                    style={{ marginRight: 8, background: '#6FA5ED', color: '#fff' }}
                    onClick={() => navigate("/signup-as")}
                  >
                    Sign Up
                  </Button>
                </Buttons>
              </HomeText>
            </Grid>
          </Grid>
        </HomeContainer>
        <FeaturesSection ref={featureRef}>
          <Typography variant="h2" gutterBottom style={{ fontWeight: 'bold' }}>
            Features
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FeatureItem>
                <Typography variant="h6">Expert Reviews</Typography>
                <Typography variant="body1">
                  Expert Reviews: Receive detailed feedback from experienced reviewers who specialize in various document types, ensuring that your work meets the highest standards.
                </Typography>
              </FeatureItem>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeaturesImage src={featuresImage} alt="Features" />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureItem>
                <Typography variant="h6">Secure Platform</Typography>
                <Typography variant="body1">
                  Secure Platform: Rest assured that your documents are safe and secure on our platform, with strict privacy measures in place to protect your sensitive information.
                </Typography>
              </FeatureItem>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureItem>
                <Typography variant="h6">Customized Recommendations</Typography>
                <Typography variant="body1">
                  Customized Recommendations: Get personalized suggestions for improving your documents, tailored to your unique goals and requirements.
                </Typography>
              </FeatureItem>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureItem>
                <Typography variant="h6">Fast Turnaround</Typography>
                <Typography variant="body1">
                  Fast Turnaround: Enjoy quick turnaround times on your document reviews, so you can make necessary revisions and submit your applications or documents with confidence.
                </Typography>
              </FeatureItem>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureItem>
                <Typography variant="h6">User-Friendly Interface</Typography>
                <Typography variant="body1">
                  User-Friendly Interface: Navigate our intuitive platform with ease, making it simple to submit documents and track reviews.
                </Typography>
              </FeatureItem>
            </Grid>
          </Grid>
        </FeaturesSection>
        <AboutSection ref={aboutRef}>
          <Typography variant="h2" gutterBottom style={{ fontWeight: 'bold' }}>
            About us
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <HomeText>
                <Typography variant="body1" gutterBottom>
                  At DocChecker, we're passionate about helping individuals achieve their goals through impactful document reviews. Our team of seasoned professionals brings years of experience in various industries, including education, business, and technology. We understand the importance of a well-crafted document in making a lasting impression, and we're dedicated to providing you with the tools and support you need to succeed. Trust us to elevate your documents to the next level.
                </Typography>
              </HomeText>
            </Grid>
            <Grid item xs={12} md={6}>
              <AboutImage src={aboutImage} alt="About us" />
            </Grid>
          </Grid>
        </AboutSection>
      </Root>
    </ThemeProvider>
  );
}

export default LandingPage;
