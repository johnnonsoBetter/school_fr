import * as React from 'react';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {DateTime} from 'luxon'

import Tooltip from '@mui/material/Tooltip';

import { CancelOutlined, CancelRounded, CheckCircleRounded, PersonRounded } from '@mui/icons-material';

import { Avatar, Button, Chip, IconButton, Stack, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';

export default function DeleteAnnouncement(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {announcements, setAnnoucements, announcement} = props

  console.log(announcements)
  

  
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



 




  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          
       
        <Tooltip title="">
         
       
            <IconButton onClick={handleClick}  sx={{backgroundColor: "white", mt: 2, mr: 2}} >
                <CancelOutlined sx={{color: red[200]}} />
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
       
      
        <MenuItem disableRipple disableTouchRipple >
         <Box >
            <Typography>Delete Announcement !</Typography>

                <Box display="flex" justifyContent="center" width="100%" p={2}> 
                 
                    <img src="/images/close.png" alt="delete" width="32px" /> 
                </Box>
            
            <Box display="flex" justifyContent="space-between" >
                <Button color="success" >Accept </Button>
                <Button color="error" onClick={handleClose} >Cancel </Button>
            </Box>

            

         </Box>
        </MenuItem>
      </Menu>
    </React.Fragment> 
  );
}
