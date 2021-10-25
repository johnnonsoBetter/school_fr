import { AccessibleForwardRounded, CheckBoxRounded, ClassRounded, Edit, NotificationAddRounded, VisibilityOutlined } from '@mui/icons-material'
import { Avatar, Box, Card, Chip, Divider, IconButton, Paper, Stack, Switch, Typography } from '@mui/material'
import { blue, green, grey, orange, red } from '@mui/material/colors'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'


export default function Teacher(props){

    const { id, full_name, permitted} = props.teacher 
    
    return (
        <Box sx={{width: '100%', padding: "5px"}} >
            <Paper elevation={3} sx={{borderRadius: "13px"}} >

           
        <Box sx={{ p: 2, display: 'flex', alignItems: "center" }}>

          <Avatar variant="rounded"  src="/images/nonso.png" />

          <Box display="flex" marginLeft={2} p={1} width="100%" alignItems="center" justifyContent="space-between">
          <Stack spacing={0.7}>
            <Typography sx={{textTransform: "capitalize"}} fontWeight={700}>{full_name}</Typography>
            <Box display="flex"  alignItems="center" >
            
            </Box>
            
          </Stack>

         

          </Box>
          
        </Box>
       
        <Box sx={{p: 2, display: "flex", alignItems: 'center', justifyContent: "space-between"}} >
            
            <Chip variant="outlined" label={permitted ? "Active" : "Not Active"} sx={{fontWeight: "bolder"}} />
            <Link to={`teachers/${2}/`} >
             <Avatar variant="rounded" sx={{ width: 28, height: 28, bgcolor: "white"}}  >  <VisibilityOutlined sx={{color: grey[500]}}  /> </Avatar>

          </Link>
           
        </Box>
        </Paper>
      </Box>
    )
} 