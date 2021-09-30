
import React, { useContext, useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import {  MoreVertRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import { Paper, Typography } from '@mui/material';
import { FetchContext } from '../../../context/FetchContext';
import { ParentContext } from '../../../context/parent/ParentContext';


export default function BillDetail({id}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {authAxios} = useContext(FetchContext)
  const {student_id} = useContext(ParentContext)
  const open = Boolean(anchorEl);
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {

    authAxios.get( `api/v1/guidance_bills/${id}` , {params: {student_id: student_id}}).then((res) => {

            
      const {data} = res
      console.log(data)
     
      setLoading(false)

  }).catch(err => {
      console.log(err)
      setLoading(false)
      setFailed(true)
  })

  }, [])



  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
       
        <Tooltip title="Bill Info">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
           
            <MoreVertRounded />
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
                    <Typography > Exam Fee</Typography>
                    <Typography > ₦3,600</Typography>
                    
                </Box>
                
            
                <Box p={1} display="flex"  justifyContent="space-around" alignItems="center"  > 
                    <Paper elevation={2} >
                      <Box textAlign="center" p={1} >
                        <Typography>₦2,000</Typography>
                        <Typography>Paid</Typography>

                      </Box>
                      
                    </Paper>

                    <Paper elevation={2} >
                      <Box textAlign="center" p={1} >
                        <Typography>₦1,600</Typography>
                        <Typography>Balance</Typography>

                      </Box>
                      
                    </Paper>
                </Box>

                <Box p={1}>
                  <Typography>Payment History</Typography>
                  <Box width="100%" maxHeight="120px" overflow="auto" >  
                    <Box display="flex" p={1} justifyContent="space-between" >
                      <Typography>May 23 2021</Typography>
                      <Typography>₦4,500</Typography>
                    </Box>

                    <Box display="flex" p={1} justifyContent="space-between" >
                      <Typography>May 23 2021</Typography>
                      <Typography>₦4,500</Typography>
                    </Box>

                    <Box display="flex" p={1} justifyContent="space-between" >
                      <Typography>May 23 2021</Typography>
                      <Typography>₦4,500</Typography>
                    </Box>

                    <Box display="flex" p={1} justifyContent="space-between" >
                      <Typography>May 23 2021</Typography>
                      <Typography>₦4,500</Typography>
                    </Box>

                    <Box display="flex" p={1} justifyContent="space-between" >
                      <Typography>May 23 2021</Typography>
                      <Typography>₦4,500</Typography>
                    </Box>

                    <Box display="flex" p={1} justifyContent="space-between" >
                      <Typography>May 23 2021</Typography>
                      <Typography>₦4,500</Typography>
                    </Box>

                    
                  </Box>
                </Box>
                




       </Box>
      
       
         
       

      </Menu>
    </React.Fragment>
  );
}
