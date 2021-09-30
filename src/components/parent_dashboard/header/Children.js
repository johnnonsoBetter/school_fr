import * as React from 'react';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { PeopleRounded } from '@mui/icons-material';
import { Avatar, Chip, Typography } from '@mui/material';
import { ParentContext } from '../../../context/parent/ParentContext';

export default function Notification() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {children, setStudentId} = React.useContext(ParentContext)
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
       
        <Tooltip title="My Children">
          
          <Chip  label="My children" onClick={handleClick} click icon={ <PeopleRounded />} />
         
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
            
            width: '25ch',
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
              left: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
       
      
        
       
        {
          children.map((child) => {

            return (
              <MenuItem key={child.id}
                onClick={() => {
                  console.log(child.id)
                  setStudentId(child.id)
                }}
              >
         
                <Box width="100%" display="flex" p={1} justifyContent="space-between" alignItems="center" >  
                    <Typography sx={{textTransform: "capitalize"}}> {child.first_name} </Typography>
                    <Avatar  src="/images/nonso.png" />
                </Box>
            
            </MenuItem>
            )
          })
        }
      </Menu>
    </React.Fragment>
  );
}
