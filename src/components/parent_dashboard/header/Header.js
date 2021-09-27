import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Children from './Children';
import Notification from './Notification';
import Profile from './Profile';


const useStyles = makeStyles((theme) => ({
    appBar: {
       backgroundColor: "white",
       color: "#47525E",
       boxShadow: "none"
    }
}))

 


export default function Header(props) {
    const classes = useStyles()


  return (
    <React.Fragment>
      <CssBaseline />
  
        <AppBar style={{boxShadow: "none"}}  >
          <Toolbar className={classes.appBar}>
            <Container >
                
                <Box display="flex" justifyContent="space-between" alignItems="center" >
                  <Children />

                  <Box display="flex" alignItems="center"  >
                    <Notification />
                    <Profile />
                  </Box>
                  
                </Box>
            </Container>
          </Toolbar>
        </AppBar>
        <Toolbar />
   
      
      
    </React.Fragment>
  );
}