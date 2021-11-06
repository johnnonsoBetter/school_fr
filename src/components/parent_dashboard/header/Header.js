import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Children from './Children';
import Notification from './Notification';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import { DashboardCustomizeOutlined } from '@mui/icons-material';



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
                  <Box>
                    <Children />
                  </Box>
                 

                  <Box display="flex" alignItems="center"  >
                     
                     
                     <Link to="/" > <img src="/images/bullhorn.png" /> </Link>
                     <Box ml={2} >
                       <Link to="/dashboard"> <DashboardCustomizeOutlined color="info" /> </Link>
                     </Box>
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