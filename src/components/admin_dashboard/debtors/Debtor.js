import { AccessibleForwardRounded, ClassRounded, Edit, NotificationAddRounded, VisibilityOutlined } from '@mui/icons-material'
import { Avatar, Box, Card, Chip, Divider, IconButton, Paper, Stack, Switch, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'

import React from 'react'


export default function Debtor(props){

    const {first_name, last_name, total_debt, id, classroom} = props.debtor 

    return (
        <Box sx={{width: '100%', padding: "5px"}} >
            <Paper elevation={3} sx={{borderRadius: "13px"}} >

           
        <Box sx={{ p: 2, display: 'flex', alignItems: "center" }}>

          <Avatar variant="rounded"  src="/images/nonso.png" />

          <Box display="flex" marginLeft={2} p={1} width="100%" alignItems="center" justifyContent="space-between">
          <Stack spacing={0.7}>
            <Typography sx={{textTransform: "capitalize"}} fontWeight={700}>{first_name} {last_name}</Typography>
            <Box display="flex"  alignItems="center" >
            <ClassRounded sx={{color: grey[500], marginRight: "5px"}} />
            <Typography sx={{textTransform: "capitalize"}} variant="body2" textAlign="center" color="text.secondary">
                {classroom}
            </Typography>
            </Box>
            
          </Stack>

          <IconButton>
           
            <Avatar variant="rounded" sx={{bgcolor: blue[300]}} >  <VisibilityOutlined  /> </Avatar>
          </IconButton>
          

          



          </Box>
          
        </Box>
       
        <Box sx={{p: 2, display: "flex", alignItems: 'center', justifyContent: "space-between", bgcolor: grey[200]}} >
            <Chip label="Total Debt" />
            <Typography> ₦{total_debt}</Typography>
        </Box>
        </Paper>
      </Box>
    )
}