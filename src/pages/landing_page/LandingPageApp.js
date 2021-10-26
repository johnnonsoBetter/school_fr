
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
import ParentFeatures from './ParentFeatures';
import { Divider } from '@mui/material';
import TeacherFeatures from './TeacherFeatures';
import SchoolFeatures from './SchoolFeatures';


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
                    <Box ><img src="/images/logo.png" alt="logo" /></Box>

                    {/* <IconButton
                        color="success"
                        aria-label="open drawer"
                        edge="start"
                       
                        sx={{ mr: 2, display: { lg: 'none' } }}
                    >
                        <img src="/images/menu.png" width="24px" />
                    </IconButton> */}

                        

                    <Box width="100%" display="flex" justifyContent="flex-end" alignItems="center">                     
                            
                        {/* <Profile /> */}

                        <Box mr={4}  >
                          <Actions />
                        </Box>
                        
                        <Box display="flex" sx={ {display:  {xs: 'none', sm: 'none', md: 'flex'}}} >

                        <Box mr={4} >
                            <Link className={classes.link}  > <Typography variant="h6"> Features </Typography></Link>
                        </Box>

                        <Box mr={4}>
                            <Link className={classes.link} > <Typography variant="h6"> Why Us? </Typography></Link>
                        </Box>

                        <Box >
                            <Link className={classes.link} > 
                            <Box display="flex" alignItems="center"  >
                            <Typography sx={{mr: 1}} variant="h6"> Contact Us </Typography> 
                            <PhoneRounded fontSize="23px" />
                            </Box>
                            
                            </Link>
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

        <SchoolFeatures />

        <Box mt={4} >
          <Divider />
        </Box>
        
        <ParentFeatures />

        <Box mt={4} >
          <Divider />
        </Box>

        <TeacherFeatures />

        <Box mt={4} >
          <Divider />
        </Box>

         <Aim />


       


      </Container>
      <ScrollTop {...props}>
        <Fab sx={{color: "white", backgroundColor: blue[300]}} size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
