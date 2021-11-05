import * as React from 'react';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {DateTime} from 'luxon'

import Tooltip from '@mui/material/Tooltip';

import { CancelRounded, CheckCircleRounded, PersonRounded } from '@mui/icons-material';

import { Avatar, Chip, Stack, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';

export default function AttendanceDate(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {is_present} = props.data
  const day = DateTime.fromISO(props.data.created_at).toLocaleString({day: 'numeric'})
  const date = DateTime.fromISO(props.data.created_at).toLocaleString(DateTime.DATE_HUGE)
  
  
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
         
        <Box p={1} onClick={handleClick} display="flex" flexDirection="column" alignItems="center" >
            <Typography variant="body2"> {day}   </Typography>
            {
                is_present ? 
                <Avatar sx={{ width: 22, height: 22, backgroundColor: green[200] }}> <CheckCircleRounded /></Avatar>
                : 
                <Avatar sx={{ width: 22, height: 22, backgroundColor: red[200] }}> <CancelRounded    /></Avatar>
            }
            
        
        </Box>
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
         <Stack >
            <Typography>{date}</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} >
              {
                  is_present ? 
                  <Typography>Present</Typography>
                  : 
                  <Typography>Absent</Typography>
              }
              {
                  is_present ? 
                  <Avatar sx={{ width: 22, height: 22, backgroundColor: green[200] }}> <CheckCircleRounded /></Avatar>
                  : 
                  <Avatar sx={{ width: 22, height: 22, backgroundColor: red[200] }}> <CancelRounded    /></Avatar>
              }
            </Box>

         </Stack>
        </MenuItem>
      </Menu>
    </React.Fragment> 
  );
}
