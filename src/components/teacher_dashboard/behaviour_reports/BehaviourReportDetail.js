
import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import {  GppBadRounded, GppGoodRounded, SmsRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';


import IconButton from '@mui/material/IconButton';
import { Avatar, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';


export default function BehaviourReportDetail({behaviourReport}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {behaviour_type, title, description, student} = behaviourReport 

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
       
        <Tooltip title="Report Info">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
           
            <SmsRounded />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        
        PaperProps={{
          elevation: 0,
          style: {
            
            width: '35ch',
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
       
       <Box p={2} >

            <Box width="100%" display="flex" p={1} justifyContent="space-between" alignItems="center" >  
                <Typography > {title}</Typography>
                    
                    <Avatar sx={{width: 30, height: 30, bgcolor: behaviour_type === "Good" ? green[500] :  red[500] }} > {behaviour_type === "Good" ? <GppGoodRounded /> :  <GppBadRounded /> } </Avatar>
                </Box>
            
                <Box p={1}  > 
                    <Typography variant="body1" sx={{textTransform: "capitalize"}}  >
                        {description}
                        
                    </Typography>
                </Box>

               

            
                <Box width="100%" display="flex" p={1} justifyContent="space-between" alignItems="center" >  
                  <Typography sx={{textTransform: "capitalize"}} > {student}</Typography>
                  <Avatar  src="/images/nonso.png" />
                </Box>
            
       </Box>
      </Menu>
    </React.Fragment>
  );
}
