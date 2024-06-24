import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SignUpAsPage from './Pages/SignUpAs/SignUpAsPage';
import SignUp from './Pages/SignUp/SignUp';
import ExpertSignUp from './Pages/ExpertSignUp/ExpertSignUp';
import Login from './Pages/Login/Login';
import DocumentReview from './Pages/DocumentReview';
import CustomerHomePage from './Pages/CustomerHomePage';
import LandingPage from './Pages/LandingPage';
import UploadDocument from './Pages/UploadDocument';
import ExpertHomePage from './Pages/ExpertHomePage';
import AdminHomePage from './Pages/AdminHomePage';
import InvalidAccess from './Pages/InvalidAccess';
import Logout from './Pages/Logout';
import Navbar from './components/SideBar'; 
import ProtectedRoutes from './components/ProtectedRoutes';
import { styled } from '@mui/system';
import Settings from './Pages/Settings';

const theme = createTheme();

const MainContent = styled('div')(({ theme, shouldShowNavbar }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: shouldShowNavbar ? theme.spacing(8) : 0, // Adjust for the height of the navbar
  marginLeft: shouldShowNavbar ? theme.spacing(3) : 0,
  [theme.breakpoints.down('sm')]: {
    marginTop: shouldShowNavbar ? theme.spacing(7) : 0,
  },
}));

const Layout = ({ children }) => {
  const location = useLocation();
  const noNavbarPaths = ['/', '/login', '/signup-as', '/signup', '/expert/signup', '/logout', '/forgot-password'];
  const shouldShowNavbar = !noNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <MainContent shouldShowNavbar={shouldShowNavbar}>{children}</MainContent>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route exact path="/signup-as" element={<SignUpAsPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/expert/signup" element={<ExpertSignUp />} />
            <Route path="/document-review" element={<ProtectedRoutes Component={<DocumentReview />} allowCustomer={true} allowExpert={true} allowAdmin={false} />} />
            <Route path="/upload-document" element={<ProtectedRoutes Component={<UploadDocument />} allowCustomer={true} allowExpert={false} allowAdmin={false} />} />
            <Route path="/customer-home" element={<ProtectedRoutes Component={<CustomerHomePage />} allowCustomer={true} allowExpert={false} allowAdmin={false} />} />
            <Route path="/expert-home" element={<ProtectedRoutes Component={<ExpertHomePage />} allowCustomer={false} allowExpert={true} allowAdmin={false} />} />
            <Route path="/admin-home" element={<ProtectedRoutes Component={<AdminHomePage />} allowCustomer={false} allowExpert={false} allowAdmin={true} />} />
            <Route path="/settings" element={<ProtectedRoutes Component={<Settings />} allowCustomer={true} allowExpert={true} allowAdmin={true} />} />
            <Route path="/invalid-access" element={<InvalidAccess />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
