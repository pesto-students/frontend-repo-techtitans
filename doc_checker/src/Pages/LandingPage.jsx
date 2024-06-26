import React, { useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../images/logo.png";
import homeImage from "../images/landing_page_img.png";
import featuresImage from "../images/features.svg";
import aboutImage from "../images/aboutus.png";
import { useNavigate } from "react-router-dom";
import TypingEffect from "../hooks/typingEffect";
import { ROLES } from "../Constants";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EFF0FB",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  spacing: 8,
});

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const CustomAppBar = styled(AppBar)({
  backgroundColor: "#EFF0FB",
  boxShadow: "none",
  marginBottom: theme.spacing(4),
});

const Logo = styled("img")({
  height: "40px",
  marginRight: theme.spacing(2),
});

const LogoText = styled(Typography)({
  flexGrow: 1,
  fontSize: "32px !important",
  fontWeight: "bold !important",
});

const HomeContainer = styled(Grid)({
});

const HomeText = styled(Box)({
  padding: theme.spacing(0, 4, 4, 4),
  textAlign: "center"
});

const FeaturesSection = styled(Box)({
  padding: theme.spacing(4),
  backgroundColor: "#f5f5f5",
  textAlign: "center",
  minHeight: "100vh",
});

const FeatureItem = styled(Box)({
  padding: theme.spacing(2),
});

const FeaturesImage = styled("img")({
  height: "auto",
  maxHeight: "300px",
  objectFit: "cover",
  marginBottom: theme.spacing(2),
});

const AboutSection = styled(Grid)({
  backgroundColor: "#fff",
});


const Buttons = styled(Box)({
  marginTop: theme.spacing(2),
});

const Tabs = styled(Button)({
  fontWeight: "bold !important",
  fontSize: "16px !important",
  marginLeft: theme.spacing(2),
});

function LandingPage() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const homeRef = useRef();
  const featureRef = useRef();
  const aboutRef = useRef();
  let user = JSON.parse(sessionStorage.getItem('userInfo'))

  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigationClick = (ref) => {
    scrollToRef(ref);
    setDrawerOpen(false);
  };

  const exploreDashboard = () => {
    if (user.role === ROLES.CUSTOMER) {
      navigate('/customer-home');
    }
    if (user.role === ROLES.EXPERT) {
      navigate('/expert-home');
    }
    if (user.role === ROLES.ADMIN) {
      navigate('/admin-home');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Root>
        <CustomAppBar position="fixed">
          <Toolbar>
            <Logo src={logo} alt="DocChecker Logo" />
            <LogoText variant="h6">DocChecker</LogoText>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Tabs color="inherit" onClick={() => scrollToRef(homeRef)}>
                Home
              </Tabs>
              <Tabs color="inherit" onClick={() => scrollToRef(featureRef)}>
                Features
              </Tabs>
              <Tabs color="inherit" onClick={() => scrollToRef(aboutRef)}>
                About us
              </Tabs>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </CustomAppBar>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <Box
            sx={{
              width: 250,
            }}
            role="presentation"
            onClick={handleDrawerToggle}
            onKeyDown={handleDrawerToggle}
          >
            <List>
              <ListItem button onClick={() => handleNavigationClick(homeRef)}>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleNavigationClick(featureRef)}
              >
                <ListItemText primary="Features" />
              </ListItem>
              <ListItem button onClick={() => handleNavigationClick(aboutRef)}>
                <ListItemText primary="About us" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <HomeContainer ref={homeRef}>
          <Grid container spacing={2}>
            {!isSmallScreen && (
              <Grid item xs={6} className="parentDivFullHeight">
                <img src={aboutImage} alt="landing_image" />
              </Grid>
            )}

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="start"
              item
              xs={12}
              md={6}
              mt={25}
            >
              <HomeText>
                <img src={logo} alt="DocChecker_Logo" />
                <Typography variant="h2" mb={2} sx={{ textAlign: "center" }}>
                  DocChecker
                  <TypingEffect
                    texts={[
                      "WHERE YOUR DOCUMENTS ARE NOT JUST REVIEWED BUT TRANSFORMED...!!!",
                    ]}
                    speed={100}
                    pause={500}
                  />
                </Typography>
                <Typography
                  variant="body1"
                  textAlign="left"
                  gutterBottom
                  sx={{ typography: "body1", textAlign: "justify" }}
                >
                  Your go-to platform for comprehensive document reviews.
                  Whether you're a student crafting the perfect college
                  application essay, a professional fine-tuning your resume, or
                  a product manager refining your requirements document, we've
                  got you covered.
                </Typography>
                {
                  user?.accessToken ?
                    <Button
                      variant="contained"
                      aria-label="Explore Dashboard"
                      style={{
                        marginTop: 6,
                        color: "#fff",
                        backgroundColor: "#1976d2",
                      }}
                      onClick={exploreDashboard}
                    >
                      Explore Dashboard
                    </Button> :
                    <Buttons textAlign="center" mt={3}>
                      <Button
                        variant="contained"
                        aria-label="Login"
                        style={{
                          marginRight: 8,
                          color: "#fff",
                          backgroundColor: "#1976d2",
                        }}
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </Button>
                      <Button
                        variant="contained"
                        aria-label="Sign Up"
                        style={{
                          marginRight: 8,
                          color: "#fff",
                          backgroundColor: "#1976d2",
                        }}
                        onClick={() => navigate("/signup-as")}
                      >
                        Sign Up
                      </Button>
                    </Buttons>
                }

              </HomeText>
            </Grid>
          </Grid>
        </HomeContainer>
        <FeaturesSection ref={featureRef}>
          <Typography variant="h2" gutterBottom style={{ fontWeight: "bold" }}>
            Features
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FeatureItem>
                <Typography variant="h6">Expert Reviews</Typography>
                <Typography variant="body1">
                  Receive detailed feedback from experienced
                  reviewers who specialize in various document types, ensuring
                  that your work meets the highest standards.
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
                  Rest assured that your documents are safe and
                  secure on our platform, with strict privacy measures in place
                  to protect your sensitive information.
                </Typography>
              </FeatureItem>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureItem>
                <Typography variant="h6">Customized Recommendations</Typography>
                <Typography variant="body1">
                  Get personalized suggestions for
                  improving your documents, tailored to your unique goals and
                  requirements.
                </Typography>
              </FeatureItem>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureItem>
                <Typography variant="h6">Fast Turnaround</Typography>
                <Typography variant="body1">
                  Enjoy quick turnaround times on your document
                  reviews, so you can make necessary revisions and submit your
                  applications or documents with confidence.
                </Typography>
              </FeatureItem>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureItem>
                <Typography variant="h6">User-Friendly Interface</Typography>
                <Typography variant="body1">
                  Navigate our intuitive platform with
                  ease, making it simple to submit documents and track reviews.
                </Typography>
              </FeatureItem>
            </Grid>
          </Grid>
        </FeaturesSection>
        <AboutSection ref={aboutRef} mt={3}>
          <Grid container spacing={2}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              xs={12}
            >
              <Typography
                variant="h2"
                gutterBottom
                style={{ fontWeight: "bold" }}
              >
                About us
              </Typography>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              item
              xs={12}
              md={6}
            >
              <HomeText>
                <Typography
                  variant="body1"
                  textAlign="left"
                  gutterBottom
                  sx={{ typography: "body1", textAlign: "justify" }}
                >
                  At DocChecker, we're passionate about helping individuals
                  achieve their goals through impactful document reviews. Our
                  team of seasoned professionals brings years of experience in
                  various industries, including education, business, and
                  technology. We understand the importance of a well-crafted
                  document in making a lasting impression, and we're dedicated
                  to providing you with the tools and support you need to
                  succeed. Trust us to elevate your documents to the next level.
                </Typography>
              </HomeText>
            </Grid>


            <Grid item xs={12} md={6} className="parentDivFullHeight">
              <img src={homeImage} alt="About us" />
            </Grid>
          </Grid>
        </AboutSection>
      </Root>
    </ThemeProvider>
  );
}

export default LandingPage;
