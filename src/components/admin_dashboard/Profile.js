import * as React from 'react';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import IconButton from '@mui/material/IconButton';

import Tooltip from '@mui/material/Tooltip';

import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { PersonRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';


import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';
import { Avatar, Chip } from '@mui/material';

export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [loading, setLoading] = React.useState(false)
  const {logUserOut, authState, setAuthState} = React.useContext(AuthContext)
  const {authAxios} = React.useContext(FetchContext)
  const history = useHistory()
  const {first_name} = JSON.parse(authState.userInfo)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  const logout = () => {

    setLoading(true)
    authAxios.delete('api/v1/auth/sign_out').then((res) => {

            logUserOut()
            history.push('/login')
      
    }).catch(err => {
      const {status} = err.response 
      if (status === 401){
          setAuthState({})
      }
        setLoading(false)
        
    })



  }



  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          
       
        <Tooltip title="Account">
         
          <Chip avatar={<Avatar  />} sx={{textTransform: "capitalize"}} label={first_name} clickable onClick={handleClick}  />
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
          <LoadingButton loading={loading} onClick={logout} sx={{color: "inherit"}} startIcon={<Logout fontSize="small" />} > Logout</LoadingButton>
        </MenuItem>
      </Menu>
    </React.Fragment> 
  );
}
