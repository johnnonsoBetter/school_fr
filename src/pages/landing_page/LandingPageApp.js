
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {  PhoneRounded } from '@mui/icons-material';
import Actions from './Actions';
import Message from './Message';
import Aim from './Aim';
import MobileNav from './MobileNav'
import ParentFeatures from './ParentFeatures';
import { Divider } from '@mui/material';
import TeacherFeatures from './TeacherFeatures';
import SchoolFeatures from './SchoolFeatures';
import { HashLink } from 'react-router-hash-link';
import Contact from './Contact';


function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
  
  ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};


const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: "black"
    }
}))

export default function LandingPageApp(props) {
   const [redirectOnClick, setRedirectOnClick] = React.useState(null)


   const goTo = (link) => {
     setRedirectOnClick(link)
   }
    const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}> 
        <AppBar sx={{ backgroundColor: "rgb(233 243 255 / 20%)", backdropFilter: "blur(2px)", zIndex: (theme) => theme.zIndex.drawer + 1 }} >
            <Toolbar>
                <Box display="flex" width="100%" alignItems="center" justifyContent="space-between" >
                    <Link to="/" >
                      <Box ><img src="/images/logo.png" alt="logo" /></Box>

                    </Link>
                    
                        

                    <Box width="100%" display="flex" justifyContent="flex-end" alignItems="center">                     
                            
                        

                        <Box sx={{mr: {md: 4}}}  >
                          <Actions />
                        </Box>

                        <Box sx={{display: {md: 'none'}}} >
                          <MobileNav />
                        </Box>
                        
                        <Box display="flex" sx={ {display:  {xs: 'none', sm: 'none', md: 'flex'}}} >

                        <Box mr={4} >
                            
                            <HashLink  style={{textDecoration: "none"}} smooth to={'/#features'}>
                              <Typography sx={{color: "black"}} variant="h6"> Features </Typography>
                            </HashLink>
                        </Box>

                        <Box mr={4}>
                            
                            <HashLink  style={{textDecoration: "none"}} smooth to={'/#why-us'}>
                              <Typography sx={{color: "black"}} variant="h6"> Why us? </Typography>
                            </HashLink>
                        </Box>

                        <Box >
                          <HashLink  style={{textDecoration: "none"}} smooth to={'/#contact-us'}>
                              <Box display="flex" alignItems="center"  >
                              <Typography sx={{mr: 1}} sx={{color: "black"}} variant="h6"> Contact Us </Typography> 
                              <PhoneRounded sx={{ml: 1}} fontSize="23px" sx={{color: "black"}} />
                              </Box>
                            
                           </HashLink>
                        </Box>



                        </Box>
                        
                        
                        
                        
                    </Box>

                
                </Box>
            </Toolbar>
        </AppBar>
      
      
      </ElevationScroll>
      
      <Toolbar id="back-to-top-anchor" />
      <Container maxWidth="lg">
        <Message />
       
        <Box mt={4} >
          <Divider />
        </Box>

        <Box id="features" >

          <Box id="school-f" >
            <SchoolFeatures />
          </Box>
            

        <Box mt={4} >
          <Divider />
        </Box>

       
        <Box id="parent-f" >
          <ParentFeatures />
        </Box>

        <Box mt={4} >
          <Divider />
        </Box>

        <Box id="teacher-f" >
         <TeacherFeatures />

        </Box>
        
        <Box mt={4} >
          <Divider />
        </Box>



        </Box>

          <Box id="why-us" >
            <Aim />
          </Box>

          <Box id="contact-us" >
            <Contact />
          </Box>
         


       


      </Container>
      <ScrollTop {...props}>
        <Fab sx={{color: "white", backgroundColor: blue[300]}} size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
