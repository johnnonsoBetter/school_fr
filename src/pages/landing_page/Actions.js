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
          
       
        <Tooltip title="Account">
         
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
         <Box >
            <Box onClick={() => {
               // window.location.assign('/lsdi')
               window.location.href = `http://parent.${window.location.host}/dashboard`;
               
              }}  >  
             
            
            Parent
            </Box>
             
               
          
         </Box>
        </MenuItem>

        <MenuItem>
         <Box>
            <Box onClick={() => {
               // window.location.assign('/lsdi')
               window.location.href = `http://teacher.${window.location.host}/`;
               
              }}  >  
             
            
            Teacher
            </Box>
             
               
          
         </Box>
        </MenuItem>

        <MenuItem>
         <Box >
            <Box onClick={() => {
               // window.location.assign('/lsdi')
               window.location.href = `http://admin.${window.location.host}/`;
               
              }}  >  
             
            
            Admin
            </Box>
             
               
          
         </Box>
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
