
import React from 'react'
import Tooltip from '@mui/material/Tooltip';

import Logout from '@mui/icons-material/Logout';
import {  BarChartRounded, GppGoodRounded, SmsRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import IconButton from '@mui/material/IconButton';
import { Avatar, Divider, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { blue } from '@mui/material/colors';

const Max = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: 'center',
    color: "rgb(52 183 0 / 93%)"
}));

const Score = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: 'center',
    color: "rgb(183 0 0 / 93%)"
}));



export default function ScoreReportDetail() {
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
       
        <Tooltip title="Report Info">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
           
            <BarChartRounded />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          style: {
            
            width: '33ch',
            borderRadius: "20px"
          },
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
       
       <Box p={1} >
            <Box width="100%" display="flex" p={1} justifyContent="space-between" alignItems="center" >  
                <Typography > Assignment</Typography>
                
            </Box>
            
            <Box p={1} display="flex" justifyContent="center"  > 
                <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} >
                    <Score> 30 </Score>
                    <Max > 40 </Max>
                </Stack>
            </Box>

        
            
            <Box width="100%" display="flex" p={1} justifyContent="space-between" alignItems="center" >  
                <Typography > Excellent</Typography>
                <Avatar sx={{ bgcolor: blue[500] }} > <GppGoodRounded /></Avatar>
            </Box>

            <Box width="100%" display="flex" p={1} justifyContent="space-between" alignItems="center" >  
                <Typography > Mr John Paul</Typography>
                <Avatar  src="/images/nonso.png" />
            </Box>

       </Box>
      
      
         
       

      </Menu>
    </React.Fragment>
  );
}
