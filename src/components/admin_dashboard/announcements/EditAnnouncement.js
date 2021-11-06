import * as React from 'react';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {DateTime} from 'luxon'

import Tooltip from '@mui/material/Tooltip';

import { CancelOutlined, CancelRounded, CheckCircleRounded, EditRounded, PersonRounded } from '@mui/icons-material';

import { Avatar, Chip, IconButton, Stack, TextField, Typography } from '@mui/material';
import { green, orange, red } from '@mui/material/colors';
import AnnouncementImages from './AnnouncementImages';

export default function EditAnnouncement(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  
  
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
         
       
            <IconButton onClick={handleClick}  sx={{backgroundColor: "white", mr: 2, mt: 2}} >
                    <EditRounded sx={{color: orange[600]}}  />
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
       
      
        <MenuItem  disableRipple disableTouchRipple>
         <Box >
             <form >
             <AnnouncementImages />
             <TextField fullWidth label="Message"/>

             </form>
            
         </Box>
        </MenuItem>
      </Menu>
    </React.Fragment> 
  );
}


