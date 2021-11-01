import * as React from 'react';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import IconButton from '@mui/material/IconButton';

import Tooltip from '@mui/material/Tooltip';

import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { GraphicEqRounded, PersonRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';


import { Link, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';
import { Avatar, Button, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles((theme) => ({
  link: {
      textDecoration: 'none',
      color: "black",
      width: "100%"
  }
}))

export default function Actions(props) {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const open = Boolean(anchorEl);
  const classes = useStyles()
  const {goTo} = props
  const history = useHistory()
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          
       
        <Tooltip title="Accounts">
         
          <IconButton onClick={handleClick} >
              <GraphicEqRounded />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
       
      
       

        <MenuItem>
       
            <Button variant="outlined" sx={{width: "100px"}} onClick={() => {
               // window.location.assign('/lsdi')
               window.location.href = `https://parent.confamsch.com.ng/dashboard`;
               //window.location.href = 'parent.localhost:3000'
               
              }}  >  
             
            
            Parent
            </Button>
             
               
          
    
        </MenuItem>

        <MenuItem>
       
            <Button variant="outlined" sx={{width: "100px"}} onClick={() => {
               // window.location.assign('/lsdi')
               window.location.href = `https://teacher.confamsch.com.ng/`;
              // window.location.href = 'teacher.localhost:3000'
               
              }}  >  
             
            
            Teacher
            </Button>
      
        </MenuItem>

        <MenuItem>

            <Button variant="outlined" width="100px" sx={{width: "100px"}} height="100%" p={1} onClick={() => {
               // window.location.assign('/lsdi')
               window.location.href = `https://admin.confamsch.com.ng/`;
               //window.location.href = 'admin.localhost:3000'
               
              }}  >  
             
            
            Admin
       
               
          
         </Button>
        </MenuItem>

        {/* <MenuItem>
        <Box p={1}>
            <Box onClick={props.goTo('parent')} >  
                Parent
            </Box>
             
              
          
         </Box>
        </MenuItem>

        <MenuItem>
        <Box p={1}>
            <Box onClick={props.goTo('parent')} >  
            Parent
            </Box>
             
              
          
         </Box>
        </MenuItem> */}
      </Menu>
    </React.Fragment> 
  );
}
