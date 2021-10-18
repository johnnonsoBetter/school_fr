import { AccessibleForwardRounded, ClassRounded, Edit, NotificationAddRounded, VisibilityOutlined } from '@mui/icons-material'
import { Avatar, Box, Card, Chip, Divider, IconButton, Paper, Stack, Switch, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import AmountFormatter from '../../utilities/AmountFormatter'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'


export default function Debtor(props){

    const { total_debt, id, classroom, full_name} = props.debtor 
    const {pathname} = useLocation()

    return (
        <Box sx={{width: '100%', padding: "5px"}} >
            <Paper elevation={3} sx={{borderRadius: "13px"}} >

           
        <Box sx={{ p: 2, display: 'flex', alignItems: "center" }}>

          <Avatar variant="rounded"  src="/images/nonso.png" />

          <Box display="flex" marginLeft={2} p={1} width="100%" alignItems="center" justifyContent="space-between">
          <Stack spacing={0.7}>
            <Typography sx={{textTransform: "capitalize"}} fontWeight={700}>{full_name}</Typography>
            <Box display="flex"  alignItems="center" >
            <ClassRounded sx={{color: grey[500], marginRight: "5px"}} />
            <Typography sx={{textTransform: "capitalize"}} variant="body2" textAlign="center" color="text.secondary">
                {classroom}
            </Typography>
            </Box>
            
          </Stack>

          <Link to={`${pathname}/${id}/bills?`} >
          <Avatar variant="rounded" sx={{bgcolor: blue[300]}} >  <VisibilityOutlined  /> </Avatar>

          </Link>

          

          



          </Box>
          
        </Box>
       
        <Box sx={{p: 2, display: "flex", alignItems: 'center', justifyContent: "space-between", bgcolor: grey[200]}} >
            
            <Chip label="Total Debt" />
            <Typography> ₦{AmountFormatter(total_debt).amount()}</Typography>
        </Box>
        </Paper>
      </Box>
    )
} 